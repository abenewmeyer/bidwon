"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, CheckCircle2, Play } from 'lucide-react';

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedNaics, setSelectedNaics] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoResults, setDemoResults] = useState<any>(null);
  const [showBlur, setShowBlur] = useState(false);

  const popularNaics = [
    { code: "624230", desc: "Emergency and Other Relief Services" },
    { code: "236220", desc: "Commercial & Institutional Building Construction" },
    { code: "541330", desc: "Engineering Services" },
    { code: "562910", desc: "Remediation Services" },
    { code: "541611", desc: "Administrative Management Consulting" },
    { code: "561210", desc: "Facilities Support Services" },
  ];

  const toggleNaics = (code: string) => {
    if (selectedNaics.includes(code)) {
      setSelectedNaics(selectedNaics.filter(c => c !== code));
    } else if (selectedNaics.length < 5) {
      setSelectedNaics([...selectedNaics, code]);
    }
  };

  const runDemo = () => {
    if (selectedNaics.length === 0) return;
    setIsDemoRunning(true);

    setTimeout(() => {
      setDemoResults({
        opportunities: [
          {
            title: "Public Assistance Technical Assistance and Consulting Services",
            agency: "Federal Emergency Management Agency (FEMA)",
            deadline: "May 28, 2026",
            score: 93,
            summary: "Excellent match for your selected NAICS codes. Strong set-aside eligibility.",
            checklist: "SDVOSB/HUBZone eligible • Flexible place of performance",
          },
          {
            title: "Disaster Recovery Construction Management & Safety Oversight",
            agency: "U.S. Army Corps of Engineers",
            deadline: "June 4, 2026",
            score: 89,
            summary: "High-potential opportunity matching your construction and safety capabilities.",
            checklist: "Minority-owned preference noted • Tight timeline flagged",
          }
        ]
      });
      setIsDemoRunning(false);
      setTimeout(() => setShowBlur(true), 2800);
    }, 1600);
  };

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
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex lg:flex-1">
          <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">BidWon.</span>
        </div>
        <Link href="/login" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors">
          Client Login
        </Link>
      </nav>

      {/* Hero */}
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
              BidWon connects directly to SAM.gov, scores active opportunities against your core competencies, and helps you prepare compliant bids using advanced AI. You always review and submit yourself.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#pricing" className="rounded-md bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-600 transition-all">
                View Pricing
              </a>
              <a href="#demo" className="text-base font-semibold leading-6 text-white group flex items-center">
                View Live Demo <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div id="demo" className="py-24 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">See BidWon in Action</h2>
            <p className="text-xl text-slate-400">Select your NAICS codes and watch how we find, score, and prepare opportunities in seconds.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-3xl p-10 mb-16">
            <p className="text-slate-300 font-medium mb-6 text-center">Select up to 5 NAICS codes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
              {popularNaics.map((item) => (
                <button
                  key={item.code}
                  onClick={() => toggleNaics(item.code)}
                  className={`p-5 rounded-2xl text-left transition-all flex justify-between items-center border ${selectedNaics.includes(item.code) ? 'border-emerald-500 bg-emerald-950' : 'border-slate-700 hover:border-slate-600'}`}
                >
                  <div>
                    <span className="font-mono font-semibold text-emerald-400">{item.code}</span>
                    <span className="ml-3 text-slate-400 text-sm">{item.desc}</span>
                  </div>
                  {selectedNaics.includes(item.code) && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                </button>
              ))}
            </div>

            <button
              onClick={runDemo}
              disabled={isDemoRunning || selectedNaics.length === 0}
              className="mt-10 w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-semibold py-5 rounded-3xl text-xl flex items-center justify-center gap-3 transition-all"
            >
              {isDemoRunning ? "Searching SAM.gov..." : "Show Me Matching Opportunities"}
              <Play className="w-6 h-6" />
            </button>
          </div>

          {demoResults && (
            <div className="max-w-4xl mx-auto space-y-10">
              {demoResults.opportunities.map((opp: any, index: number) => (
                <div key={index} className="bg-slate-900 border border-slate-700 rounded-3xl p-10 relative">
                  {showBlur && index >= 1 && (
                    <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-3xl">
                      <p className="text-2xl font-semibold mb-4 text-center">This is only the preview</p>
                      <p className="text-slate-400 max-w-md text-center mb-8">Sign up to unlock full AI summaries, complete checklists, PDF assistance, and daily real opportunities.</p>
                      <Link href="/login" className="bg-emerald-500 text-white px-10 py-4 rounded-3xl font-semibold flex items-center gap-3">
                        Unlock Full Results Free <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold leading-tight mb-3">{opp.title}</h3>
                      <p className="text-slate-400 mb-6">{opp.agency} • Deadline: {opp.deadline}</p>
                      <div className="bg-slate-800 rounded-2xl p-6">
                        <p className="font-medium text-emerald-400 mb-2">AI Summary</p>
                        <p className="text-slate-300">{opp.summary}</p>
                      </div>
                    </div>

                    <div className="text-center md:text-right md:w-48 flex-shrink-0">
                      <div className="text-5xl font-bold text-emerald-400">{opp.score}</div>
                      <div className="uppercase tracking-widest text-xs font-medium text-emerald-400">MATCH SCORE</div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-6 text-sm text-slate-300">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-400" /> {opp.checklist}</div>
                    <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-400" /> Bid Package Assist Ready</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
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

          <p className="text-center text-sm text-slate-400 mt-12">
            All plans are 100% human-in-the-loop. You always review and submit bids yourself on SAM.gov.
          </p>
        </div>
      </div>
    </div>
  );
}