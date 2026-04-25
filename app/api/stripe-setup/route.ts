import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// This line forces Vercel to skip static generation and makes the build pass
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const products = [
  {
    name: 'Tactical',
    description: 'Daily SAM.gov sync (5 NAICS), 15 Scored Opps, 5 AI Bids/mo.',
    prices: [
      { amount: 14900, interval: 'month' },
      { amount: 149000, interval: 'year' }
    ]
  },
  {
    name: 'Strategic',
    description: '25 NAICS codes, 100 Scored Opps, 25 AI Bids/mo + Vector Vault.',
    prices: [
      { amount: 49700, interval: 'month' },
      { amount: 497000, interval: 'year' }
    ]
  },
  {
    name: 'Sovereign (Enterprise/Agency)',
    description: 'Unlimited Bids, Agency Dashboard (10 Sub-users), API Access, Priority Llama-3-70B processing.',
    prices: [
      { amount: 249700, interval: 'month' },
      { amount: 2497000, interval: 'year' }
    ]
  }
];

export async function GET() {
  // Guard clause to check if the key exists before running
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ 
      success: false, 
      error: "STRIPE_SECRET_KEY is missing in Vercel Environment Variables." 
    }, { status: 500 });
  }

  try {
    const results = [];

    for (const prod of products) {
      const product = await stripe.products.create({
        name: prod.name,
        description: prod.description,
      });

      const priceResults = [];
      
      for (const p of prod.prices) {
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: p.amount,
          currency: 'usd',
          recurring: { interval: p.interval as 'month' | 'year' },
        });
        
        priceResults.push({ 
          interval: p.interval, 
          priceId: price.id 
        });
      }
      
      results.push({ 
        productName: prod.name, 
        productId: product.id, 
        prices: priceResults 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Stripe products created successfully.",
      data: results 
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}