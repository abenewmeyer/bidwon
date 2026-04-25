"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Tactical',
      monthlyPrice: '$149',
      annualPrice: '$1,490',
      description: 'Daily SAM.gov sync (5 NAICS), 15 Scored Opps, 5 AI Bids/mo.',
      monthlyHref: process.env.NEXT_PUBLIC_STRIPE_TACTICAL_MONTHLY_URL || '#',
      annualHref: process.env.NEXT_PUBLIC_STRIPE_TACTICAL_ANNUAL_URL || '#',
      features: [
        'Daily SAM.gov sync',
        'Up to 5 NAICS codes',
        '15 Scored Opportunities per month',
        '5 AI-Drafted Bids per month'
      ],
      popular: false,
    },
    {
      name: 'Strategic',
      monthlyPrice: '$497',
      annualPrice: '$4,970',
      description: '25 NAICS codes, 100 Scored Opps, 25 AI Bids/mo + Vector Vault.',
      monthlyHref: process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_MONTHLY_URL || '#',
      annualHref: process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_ANNUAL_URL || '#',
      features: [
        'Advanced SAM.gov sync',
        'Up to 25 NAICS codes',
        '100 Scored Opportunities per month',
        '25 AI-Drafted Bids per month',
        'Private Vector Vault'
      ],
      popular: true,
    },
    {
      name: 'Sovereign (Enterprise)',
      monthlyPrice: '$2,497',
      annualPrice: '$24,970',
      description: 'Unlimited Bids, Agency Dashboard, Priority AI Model Processing.',
      monthlyHref: process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_MONTHLY_URL || '#',
      annualHref: process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_ANNUAL_URL || '#',
      features: [
        'Unlimited AI-Drafted Bids',
        'Agency Dashboard (10 Sub-users)',
        'Full API Access',
        'Priority AI Model Processing'
      ],
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex lg:flex-1">
          <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">BidWon.</span>
        </div>
        <Link href="/login" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors">
          Client Login
        </Link>
      </nav>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-400/30 mb-8 bg-emerald-400/10">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              SAM.gov Sync is Live
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8 leading-tight">
              Stop Guessing.<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Start Winning Govt Contracts.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
              BidWon connects directly to SAM.gov, scores active opportunities against your core competencies, and helps you prepare compliant bids using advanced AI. You review and submit yourself.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#pricing" className="rounded-md bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-600 transition-all">
                View Pricing
              </a>
              <Link href="#pricing" className="text-base font-semibold leading-6 text-white group flex items-center">
                View Live Demo <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="py-24 sm:py-32 bg-slate-900/50 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">Straight Line Acquisition</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Select your deployment tier</p>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-sm font-semibold leading-5 ring-1 ring-inset ring-slate-700 bg-slate-900">
              <button 
                onClick={() => setIsAnnual(false)} 
                className={`rounded-full px-6 py-2.5 transition-all ${!isAnnual ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)} 
                className={`rounded-full px-6 py-2.5 transition-all ${isAnnual ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Annually <span className="text-xs opacity-75">(Save 20%)</span>
              </button>
            </div>
          </div>

          <div className="isolate mx-auto mt-12 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`rounded-3xl p-8 ring-1 transition-all ${tier.popular 
                  ? 'bg-slate-800 ring-emerald-500 shadow-2xl shadow-emerald-500/30 scale-105 z-10' 
                  : 'bg-slate-900/70 ring-slate-700 hover:ring-slate-600'}`}
              >
                <h3 className="text-2xl font-semibold text-white flex items-center justify-between">
                  {tier.name}
                  {tier.popular && <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">Most Popular</span>}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{tier.description}</p>

                <p className="mt-8 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </p>

                <a 
                  href={isAnnual ? tier.annualHref : tier.monthlyHref} 
                  className={`mt-8 block w-full rounded-2xl py-4 text-center text-base font-semibold transition-all ${tier.popular 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
                >
                  Secure Access
                </a>

                <ul className="mt-10 space-y-4 text-sm text-slate-300">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex gap-x-3">
                      <Zap className="h-5 w-5 flex-none text-emerald-400 mt-0.5" />
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