
import { NextResponse, type NextRequest } from 'next/server';
import {
  AnalyzeUrlContentInputSchema,
  type AnalyzeUrlContentOutput
} from '@/ai/flows/analyze-url-content.schemas';
import { analyzeUrlContent } from '@/ai/flows/analyze-url-content';
import { initializeApp, getApps, cert, type App as FirebaseAdminApp } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getGenkitInstance } from '@/ai/genkit';

// Firebase Admin Initialization
let firebaseAdminApp: FirebaseAdminApp | undefined;
const moduleRoutePathForLogging = "/api/analyze-url/route.ts";

try {
  if (getApps().length === 0) {
    const serviceAccountJsonString = process.env.FIREBASE_ADMIN_SDK_JSON;
    if (serviceAccountJsonString && serviceAccountJsonString.trim() !== "" && serviceAccountJsonString !== "{}") {
      let serviceAccountCredentials;
      try {
        serviceAccountCredentials = JSON.parse(serviceAccountJsonString);
        if (!serviceAccountCredentials || !serviceAccountCredentials.private_key) {
          console.error(`[API_CRITICAL_ERROR] Parsed FIREBASE_ADMIN_SDK_JSON is missing essential properties (e.g., private_key) in ${moduleRoutePathForLogging}.`);
          serviceAccountCredentials = null;
        }
      } catch (jsonParseError: any) {
        console.error(`[API_CRITICAL_ERROR] Failed to parse FIREBASE_ADMIN_SDK_JSON in ${moduleRoutePathForLogging}:`, (jsonParseError as Error).message);
        serviceAccountCredentials = null;
      }

      if (serviceAccountCredentials) {
        try {
          firebaseAdminApp = initializeApp({
            credential: cert(serviceAccountCredentials),
          });
          console.log(`[API_INFO] Firebase Admin SDK initialized successfully in ${moduleRoutePathForLogging}.`);
        } catch (initError: any) {
          console.error(`[API_CRITICAL_ERROR] Firebase Admin SDK initializeApp failed in ${moduleRoutePathForLogging}:`, (initError as Error).message);
        }
      }
    } else {
      console.warn(`[API_WARN] FIREBASE_ADMIN_SDK_JSON is not set, is an empty string, or is '{}' for ${moduleRoutePathForLogging}. Firebase Admin SDK initialization skipped.`);
    }
  } else {
    firebaseAdminApp = getApps()[0];
  }
} catch (e: any) {
  console.error(`[API_CRITICAL_ERROR] Outer Firebase Admin SDK initialization block failed in ${moduleRoutePathForLogging}:`, (e as Error).message, (e as Error).stack);
}

async function getDecodedTokenFromRequest(request: NextRequest): Promise<DecodedIdToken | null> {
  if (!firebaseAdminApp) {
    console.warn(`[API_WARN] Firebase Admin not initialized in getDecodedTokenFromRequest (${moduleRoutePathForLogging}). Cannot authenticate user.`);
    return null;
  }
  const authorization = request.headers.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    try {
      const decodedToken: DecodedIdToken = await getAuth(firebaseAdminApp).verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.warn(`[API_WARN] Error verifying Firebase ID token in ${moduleRoutePathForLogging}:`, error);
      return null;
    }
  }
  return null;
}

async function storeAnalysisInFirestore(userId: string | null, analysisData: AnalyzeUrlContentOutput) {
  if (!firebaseAdminApp) {
    console.warn(`[API_WARN] Firebase Admin SDK is not initialized in ${moduleRoutePathForLogging}. Cannot store analysis in Firestore.`);
    return;
  }
  // This check is now primary in the caller (POST handler)
  if (!userId) {
    console.log(`[API_INFO] User ID not available for analysis of URL ${analysisData.url}, skipping Firestore storage in ${moduleRoutePathForLogging}.`);
    return;
  }

  try {
    const db = getFirestore(firebaseAdminApp);
    const analysisDocRef = db.collection('urlAnalyses').doc();

    const dataToStore = {
      userId: userId,
      ...analysisData, // Spreads all fields from analysisData, including 'url'
      analyzedAt: Timestamp.now(),
    };

    await analysisDocRef.set(dataToStore);
    console.log(`[API_INFO] Analysis stored in Firestore with ID: ${analysisDocRef.id}, for user: ${userId}, URL: ${analysisData.url} in ${moduleRoutePathForLogging}`);
  } catch (error) {
    console.error(`[API_ERROR] Error storing analysis in Firestore for URL ${analysisData.url}, User: ${userId} in ${moduleRoutePathForLogging}:`, error);
    // Not re-throwing here to avoid crashing the main response if only storage fails
  }
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let decodedToken: DecodedIdToken | null = null;
  let uid: string | null = null;
  let body: any = null;
  const endpointIdentifier = `${moduleRoutePathForLogging} (${request.method})`;

  try {
    if (!firebaseAdminApp) {
      console.error(`[API_CRITICAL_ERROR] ${endpointIdentifier}: Firebase Admin SDK is not available. Ensure FIREBASE_ADMIN_SDK_JSON is set and valid.`);
      return new Response(JSON.stringify({ 
        message: "Server configuration error: Core services not initialized.",
        errorDetails: "Firebase Admin SDK failed to initialize or is unavailable." 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = getGenkitInstance();
    if (!ai) {
      console.error(`[API_CRITICAL_ERROR] ${endpointIdentifier}: Genkit AI service is not initialized. Check server logs for Genkit setup issues (e.g., API key).`);
      return new Response(JSON.stringify({ message: "Server configuration error: AI service not available." }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    body = await request.json();
    decodedToken = await getDecodedTokenFromRequest(request);
    uid = decodedToken?.uid || null;

    const isAdminUser = decodedToken?.admin === true;

    if (isAdminUser) {
      console.log(`[API_INFO] ${endpointIdentifier}: Admin user ${uid} performing URL analysis.`);
    } else if (uid) {
      console.log(`[API_INFO] ${endpointIdentifier}: Authenticated user ${uid} performing URL analysis.`);
    } else {
      console.log(`[API_INFO] ${endpointIdentifier}: Unauthenticated visitor performing URL analysis.`);
    }

    const parsedInput = AnalyzeUrlContentInputSchema.safeParse(body);

    if (!parsedInput.success) {
      console.warn(`[API_WARN] ${endpointIdentifier} User: ${uid || 'anonymous'}: Invalid input for URL analysis. Errors:`, parsedInput.error.format());
      const errorResponse = { message: 'Invalid input. Please provide a valid URL.', errors: parsedInput.error.format(), isAuthenticatedUser: !!uid };
      return new Response(JSON.stringify(errorResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { url } = parsedInput.data;
    console.log(`[API_INFO] ${endpointIdentifier} User: ${uid || 'anonymous'}: Starting analysis for URL: ${url}`);

    const analysisResult = await analyzeUrlContent({ url });

    if (analysisResult.error) {
      console.warn(`[API_WARN] ${endpointIdentifier} User: ${uid || 'anonymous'}: Analysis flow failed for URL ${url}. Error: ${analysisResult.error}`);
      let statusCode = 500;
      let clientErrorMessage = "AI analysis process failed."; // This can be a general message
      const flowErrorMessage = String(analysisResult.error);

      if (flowErrorMessage.includes("Failed to fetch URL") || flowErrorMessage.includes("Network error or invalid URL") || flowErrorMessage.includes("timed out")) {
        statusCode = 400;
        clientErrorMessage = "The provided URL could not be fetched or is invalid. Please check the URL and try again.";
      } else if (flowErrorMessage.includes("AI analysis failed") || flowErrorMessage.includes("AI processing error") || flowErrorMessage.includes("AI service is not properly configured")) {
        statusCode = 502;
        clientErrorMessage = "There was an issue with the AI analysis service. Please try again later.";
      }

      const errorResponsePayload = {
        ...analysisResult, // Contains the url and error field from the flow
        messageForClient: clientErrorMessage, // Optional: if you want a different message for client than analysisResult.error
        isAuthenticatedUser: !!uid,
      };
      return new Response(JSON.stringify(errorResponsePayload), {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`[API_INFO] ${endpointIdentifier} User: ${uid || 'anonymous'}: Analysis successful for URL: ${url}. SEO Title: ${analysisResult.seoTitle}`);

    if (uid && firebaseAdminApp && !analysisResult.error) {
      await storeAnalysisInFirestore(uid, analysisResult);
    } else if (uid && !analysisResult.error && !firebaseAdminApp) {
      console.warn(`[API_WARN] ${endpointIdentifier} User: ${uid}: Analysis for URL ${analysisResult.url} was successful, but Firebase Admin SDK is not available for storage.`);
    } else if (!uid && !analysisResult.error) {
      console.log(`[API_INFO] ${endpointIdentifier} User: unauthenticated: Analysis successful for URL ${analysisResult.url}. Skipping Firestore storage.`);
    }

    const responsePayload = {
      ...analysisResult,
      isAuthenticatedUser: !!uid,
    };

    return new Response(JSON.stringify(responsePayload), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error: any) {
    const logUserId = uid || (decodedToken?.uid || 'unknown_or_pre_auth_error');
    const logReqBodyPreview = body ? (typeof body === 'string' ? body.substring(0, 200) : JSON.stringify(body).substring(0, 200)) + '...' : 'Body not parsed or empty';

    console.error(`[API_CRITICAL_ERROR] ${endpointIdentifier} for user ${logUserId}. Request Body (preview): ${logReqBodyPreview}`);
    console.error(`[API_ERROR_RAW_OBJECT] ${endpointIdentifier}:`, error);

    const errorMessageString = error instanceof Error ? error.message : String(error);
    const errorStackString = error instanceof Error ? error.stack : 'No stack available.';
    const errorNameString = error instanceof Error ? error.name : 'UnknownErrorType';

    console.error(`[API_ERROR_DETAILS] ${endpointIdentifier}: Name: ${errorNameString}, Message: ${errorMessageString}`);
    if (errorStackString) console.error(`[API_ERROR_STACK] ${endpointIdentifier}:`, errorStackString);

    let errorCauseString = 'N/A';
    if ((error as any).cause) {
      try {
          errorCauseString = JSON.stringify((error as any).cause);
      } catch (jsonError) {
          errorCauseString = String((error as any).cause);
      }
      console.error(`[API_ERROR_CAUSE] ${endpointIdentifier}:`, errorCauseString);
    }
    
    let genkitDetailsString = '';
    if ((error as any).details && typeof (error as any).details === 'object') {
      try {
        genkitDetailsString = JSON.stringify((error as any).details);
        console.error(`[API_ERROR_GENKIT_DETAILS] ${endpointIdentifier}:`, genkitDetailsString);
      } catch (jsonError) {
        genkitDetailsString = 'Genkit details could not be stringified.';
        console.error(`[API_ERROR_GENKIT_DETAILS_SERIALIZATION_FAILED] ${endpointIdentifier}:`, (error as any).details);
      }
    } else if ((error as any).details) {
      genkitDetailsString = String((error as any).details);
      console.error(`[API_ERROR_GENKIT_DETAILS_STRING] ${endpointIdentifier}:`, genkitDetailsString);
    }

    return new Response(JSON.stringify({
      message: "An internal server error occurred. Please check server logs for details.",
      errorDetails: "A server-side error was logged."
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
