import { Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const tiers = [
    {
      name: 'Tactical',
      price: '$14,900',
      interval: '/year',
      description: 'Daily SAM.gov sync (5 NAICS), 15 Scored Opps, 5 AI Bids/mo.',
      href: process.env.NEXT_PUBLIC_STRIPE_TACTICAL_URL || '#',
      features: ['Daily SAM.gov sync', 'Up to 5 NAICS codes', '15 Scored Opportunities', '5 AI-Drafted Bids/month'],
      popular: false,
    },
    {
      name: 'Strategic',
      price: '$49,700',
      interval: '/year',
      description: '25 NAICS codes, 100 Scored Opps, 25 AI Bids/mo + Vector Vault.',
      href: process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_URL || '#',
      features: ['Advanced SAM.gov sync', 'Up to 25 NAICS codes', '100 Scored Opportunities', '25 AI-Drafted Bids/month', 'Private Vector Vault'],
      popular: true,
    },
    {
      name: 'Sovereign (Enterprise)',
      price: '$249,700',
      interval: '/year',
      description: 'Unlimited Bids, Agency Dashboard, Priority Llama-3-70B processing.',
      href: process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_URL || '#',
      features: ['Unlimited AI-Drafted Bids', 'Agency Dashboard (10 Sub-users)', 'Full API Access', 'Priority Llama 3-70B Processing'],
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex lg:flex-1">
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">BidWon.</span>
        </div>
        <div className="flex flex-1 justify-end space-x-4">
          <Link href="/dashboard" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors">
            Client Login
          </Link>
        </div>
      </nav>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-400/30 mb-8 bg-indigo-400/10">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
              SAM.gov Sync is Live
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 leading-tight">
              Stop Guessing. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Start Winning Govt Contracts.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
              BidWon connects directly to SAM.gov, vector-scores active opportunities against your core competencies, and drafts compliant, highly-technical bids using advanced AI architectures. 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#pricing" className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-all">
                View Pricing
              </a>
              <Link href="/dashboard" className="text-sm font-semibold leading-6 text-white group flex items-center">
                View Live Demo <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="py-24 sm:py-32 bg-slate-900/50 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Straight Line Acquisition</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Select your deployment tier</p>
          </div>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className={`rounded-3xl p-8 ring-1 transition-all ${tier.popular ? 'bg-slate-800/80 ring-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10' : 'bg-slate-900/50 ring-slate-700 hover:ring-slate-500'}`}>
                <h3 className="text-lg font-semibold leading-8 text-white flex justify-between items-center">
                  {tier.name}
                  {tier.popular && <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-300 ring-1 ring-inset ring-indigo-500/50">Most Popular</span>}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                  <span className="text-sm font-semibold leading-6 text-slate-400">{tier.interval}</span>
                </p>
                <a href={tier.href} className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 transition-colors ${tier.popular ? 'bg-indigo-500 text-white hover:bg-indigo-400' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                  Secure Access
                </a>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Zap className="h-5 w-5 flex-none text-indigo-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}