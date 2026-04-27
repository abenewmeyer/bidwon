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
  const interval = searchParams.get('interval'); 

  if (!planName || !interval) {
    return NextResponse.json({ error: "Missing plan or interval" }, { status: 400 });
  }

  try {
    const products = await stripe.products.list({ limit: 10 });
    const product = products.data.find(p => p.name.toLowerCase().includes(planName.toLowerCase()));

    if (!product) {
      throw new Error(`Product ${planName} not found in Stripe.`);
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
    });

    const price = prices.data.find(p => p.recurring?.interval === interval);

    if (!price) {
      throw new Error(`Price for ${planName} (${interval}) not found.`);
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
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
