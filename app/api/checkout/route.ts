import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe key missing" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
  });

  const { searchParams } = new URL(req.url);
  const planName = searchParams.get('plan');
  const interval = searchParams.get('interval'); // "month" or "year"

  if (!planName || !interval) {
    return NextResponse.json({ error: "Missing plan or interval" }, { status: 400 });
  }

  // Map "annual" → "year" and "monthly" → "month" in case the
  // landing page passes either convention
  const stripeInterval = interval === 'annual' ? 'year' : interval === 'monthly' ? 'month' : interval;

  try {
    // Pull all active products (up to 100) to safely bypass duplicates
    // created by running stripe-setup more than once
    const products = await stripe.products.list({ limit: 100, active: true });

    const matchedProducts = products.data.filter(p =>
      p.name.toLowerCase().includes(planName.toLowerCase())
    );

    if (matchedProducts.length === 0) {
      return NextResponse.json({
        error: `Product "${planName}" not found in Stripe. Visit /api/stripe-setup to create it.`
      }, { status: 400 });
    }

    // Walk every matching product until we find the correct price interval
    // This handles duplicates gracefully — first valid price wins
    let targetPriceId: string | null = null;

    for (const prod of matchedProducts) {
      const prices = await stripe.prices.list({ product: prod.id, active: true });
      const match = prices.data.find(p => p.recurring?.interval === stripeInterval);
      if (match) {
        targetPriceId = match.id;
        break;
      }
    }

    if (!targetPriceId) {
      return NextResponse.json({
        error: `No active ${stripeInterval}ly price found for "${planName}". Check your Stripe Dashboard → Products.`
      }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: targetPriceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `https://bidwon.vercel.app/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://bidwon.vercel.app/#pricing`,
      billing_address_collection: 'required',
    });

    return NextResponse.redirect(session.url as string, 303);

  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}