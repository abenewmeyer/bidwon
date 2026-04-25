import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

async function createProducts() {
  for (const prod of products) {
    const product = await stripe.products.create({
      name: prod.name,
      description: prod.description,
    });

    for (const p of prod.prices) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: p.amount,
        currency: 'usd',
        recurring: { interval: p.interval },
      });
      console.log(`${prod.name} (${p.interval}): ${price.id}`);
    }
  }
}

createProducts();