"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Search, ExternalLink, Loader2 } from "lucide-react";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    try {
      const res = await fetch('/api/demo-opportunities', {
        method: 'POST',
        body: JSON.stringify({ query: searchQuery }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tiers = [
    {
      name: "Tactical",
      monthlyPrice: "$149",
      annualPrice: "$1,490",
      description: "Consistently identify and act on qualified opportunities.",
      features: [
        "Daily matched opportunities from SAM.gov",
        "Up to 5 NAICS codes tracked",
        "15 high-fit opportunities scored monthly",
        "Up to 5 fully compliant AI-drafted bids/month",
      ],
      popular: false,
    },
    {
      name: "Strategic",
      monthlyPrice: "$497",
      annualPrice: "$4,970",
      description: "Scale bid volume and increase win probability.",
      features: [
        "Advanced opportunity matching across 25 NAICS codes",
        "100 scored, high-probability opportunities monthly",
        "Up to 25 fully compliant AI-drafted bids/month",
        "Private knowledge vault trained on your past wins",
      ],
      popular: true,
    },
    {
      name: "Sovereign",
      monthlyPrice: "$2,497",
      annualPrice: "$24,970",
      description: "Operate a fully automated, high-volume contract pipeline.",
      features: [
        "Unlimited AI-drafted compliant bids",
        "Real-time agency opportunity dashboard",
        "Multi-user team access (10 seats)",
        "Priority processing with highest-speed AI models",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* NAV */}
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          BidWon
        </div>
        <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">
          Client Login
        </Link>
      </nav>

      {/* HERO */}
      <section className="px-6 py-24 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <div className="inline-flex items-center px-3 py-1 text-sm text-indigo-300 bg-indigo-500/10 rounded-full mb-6">
            Live SAM.gov Data • Updated Daily
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Win More Government Contracts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Without Manual Search or Proposal Writing
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8">
            BidWon automatically finds, qualifies, and drafts compliant bids for active
            SAM.gov opportunities based on your capabilities—so you can increase
            submission volume and win rate without increasing workload.
          </p>

          {/* PRIMARY CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/api/checkout?plan=Strategic&interval=year"
              className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-md font-semibold text-center transition-colors"
            >
              Start Winning Contracts
            </Link>

            <Link
              href="#how"
              className="flex items-center justify-center text-white hover:text-indigo-300 transition-colors"
            >
              See How It Works
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Takes less than 2 minutes • No setup required • 14-day risk-free access
          </p>
        </div>

        {/* RIGHT VISUAL - LIVE SCANNER */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[380px] flex flex-col">
          <div className="text-sm text-slate-400 mb-4 font-semibold uppercase tracking-wider">
            Live Opportunity Matcher
          </div>
          
          <form onSubmit={handleScan} className="flex gap-2 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Enter NAICS Code or Keyword..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-400 px-5 rounded-lg font-semibold flex items-center justify-center transition-colors">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Search'}
            </button>
          </form>

          <div className="flex-grow space-y-3">
            {results?.matches?.map((opp: any) => (
              <div key={opp.opportunity_id} className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center group">
                <div className="pr-4">
                  <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{opp.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{opp.agency} • NAICS: {opp.naics_code}</div>
                </div>
                <a href={`https://sam.gov/opp/${opp.opportunity_id}/view`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white shrink-0 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
            
            {results?.matches?.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-sm italic">
                No active opportunities found for this query in the current sync.
              </div>
            )}

            {!results && !loading && (
              <div className="flex flex-col items-center justify-center py-10 text-slate-600">
                <p className="text-sm italic">Enter a NAICS code (e.g. 541511) to see live data.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-6 py-16 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6">
          Trusted by contractors scaling federal revenue pipelines
        </p>
        <div className="flex justify-center gap-10 text-slate-500 text-sm mb-10 flex-wrap">
          <span>IT Services</span>
          <span>Defense</span>
          <span>Healthcare</span>
          <span>Logistics</span>
          <span>Engineering</span>
        </div>
        <div className="max-w-3xl mx-auto text-lg text-slate-300 italic">
          “BidWon replaced over 20 hours per week of manual opportunity search and
          increased our bid submissions by more than 4x within the first month.”
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold mb-2 text-xl">1. Connect</div>
            <p className="text-slate-400">
              Input your NAICS codes and core capabilities in minutes.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold mb-2 text-xl">2. Analyze</div>
            <p className="text-slate-400">
              BidWon scans and scores live SAM.gov opportunities for best fit.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold mb-2 text-xl">3. Execute</div>
            <p className="text-slate-400">
              Instantly generate compliant, submission-ready proposals.
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="px-6 py-24 bg-slate-900 border-t border-slate-800 text-center">
        <h2 className="text-4xl font-bold mb-12">Why BidWon</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
          <div className="p-6">
            <h3 className="font-semibold mb-2 text-xl">Manual Search</h3>
            <p className="text-slate-400">Time-consuming and highly inconsistent.</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-2 text-xl">Generic AI Tools</h3>
            <p className="text-slate-400">Lack compliance structures and targeted vector context.</p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-indigo-500/30 rounded-2xl">
            <h3 className="font-semibold mb-2 text-indigo-400 text-xl">BidWon</h3>
            <p className="text-slate-300">
              Fully automated, compliant, opportunity-to-bid system operating natively on live federal data.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Select Your Deployment Tier</h2>
          <p className="text-slate-400">
            One successful contract can cover years of BidWon.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-900 rounded-full p-1 border border-slate-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full transition-all ${!isAnnual ? "bg-indigo-500 shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full transition-all ${isAnnual ? "bg-indigo-500 shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              Annually
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 rounded-2xl border transition-all ${
                tier.popular
                  ? "border-indigo-500 bg-slate-900/80 scale-105 shadow-2xl"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
              <p className="text-slate-400 mb-4 h-12">{tier.description}</p>
              <div className="text-4xl font-bold mb-6 flex items-baseline">
                {isAnnual ? tier.annualPrice : tier.monthlyPrice}
                <span className="text-sm font-normal text-slate-500 ml-1">{isAnnual ? '/year' : '/mo'}</span>
              </div>

              <Link
                href={`/api/checkout?plan=${tier.name}&interval=${isAnnual ? "year" : "month"}`}
                className={`block text-center py-3 rounded-md font-semibold transition-colors ${tier.popular ? "bg-indigo-500 hover:bg-indigo-400 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"}`}
              >
                Start Winning Contracts
              </Link>

              <ul className="mt-8 space-y-4 text-sm text-slate-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10">
          14-day risk-free access. Cancel anytime.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center border-t border-slate-800 bg-slate-900/30">
        <h2 className="text-4xl font-bold mb-8">
          Start Winning More Contracts Today
        </h2>
        <Link
          href="/api/checkout?plan=Strategic&interval=year"
          className="bg-indigo-500 hover:bg-indigo-400 px-8 py-4 rounded-md font-semibold inline-flex transition-colors"
        >
          Get Matched Opportunities Now
        </Link>
      </section>

    </div>
  );
}