"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ChevronRight, CheckCircle2, Search, ExternalLink, Loader2, Globe } from "lucide-react";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('/api/demo-opportunities', {
        method: 'POST',
        body: JSON.stringify({ url }),
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
      features: ["Daily matched opportunities from SAM.gov", "Up to 5 NAICS codes tracked", "15 high-fit opportunities scored monthly", "Up to 5 fully compliant AI-drafted bids/month"],
      popular: false,
    },
    {
      name: "Strategic",
      monthlyPrice: "$497",
      annualPrice: "$4,970",
      description: "Scale bid volume and increase win probability.",
      features: ["Advanced opportunity matching across 25 NAICS codes", "100 scored, high-probability opportunities monthly", "Up to 25 fully compliant AI-drafted bids/month", "Private knowledge vault trained on your past wins"],
      popular: true,
    },
    {
      name: "Sovereign",
      monthlyPrice: "$2,497",
      annualPrice: "$24,970",
      description: "Operate a fully automated, high-volume contract pipeline.",
      features: ["Unlimited AI-drafted compliant bids", "Real-time agency opportunity dashboard", "Multi-user team access (10 seats)", "Priority processing with latest-gen AI models"],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">BidWon</div>
        <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">Client Login</Link>
      </nav>

      <section className="px-6 py-24 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center px-3 py-1 text-sm text-indigo-300 bg-indigo-500/10 rounded-full mb-6">
            Live SAM.gov Data • Updated Daily
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Win More Government Contracts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Without Manual Search</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Enter your company URL. BidWon will analyze your capabilities and instantly show you 5 active federal contracts you could win today.
          </p>

          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="yourcompany.com" 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-md font-semibold flex items-center justify-center">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Analyze & Scan'}
            </button>
          </form>
          <p className="text-xs text-slate-500">Takes less than 2 minutes • 14-day risk-free access</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[300px]">
          <div className="text-sm text-slate-400 mb-4 font-bold flex justify-between">
            {results ? 'Scan Results' : 'System Ready'}
            {results?.capabilities && <span className="text-indigo-400">Tags: {results.capabilities.join(', ')}</span>}
          </div>
          <div className="space-y-3">
            {results?.matches?.map((opp: any) => (
              <div key={opp.opportunity_id} className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center group">
                <div>
                  <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{opp.title}</div>
                  <div className="text-xs text-slate-500">{opp.agency} • NAICS: {opp.naics_code}</div>
                </div>
                <a href={`https://sam.gov/opp/${opp.opportunity_id}/view`} target="_blank" className="text-slate-500 hover:text-white transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
            {!results && !loading && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-600">
                <Search className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-sm italic">Enter a URL to see real matching contracts</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase tracking-widest mb-4">Straight Line Acquisition</h2>
          <h2 className="text-4xl font-bold mb-4">Select Your Deployment Tier</h2>
          <p className="text-slate-400 max-w-2xl mx-auto italic">
            "If our AI-scored opportunities don't match your proficiency or our generated drafts don't meet 100% technical compliance, we will personally audit your Vector Vault for free."
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-900 rounded-full p-1 border border-slate-800">
            <button onClick={() => setIsAnnual(false)} className={`px-6 py-2 rounded-full transition-all ${!isAnnual ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>Monthly</button>
            <button onClick={() => setIsAnnual(true)} className={`px-6 py-2 rounded-full transition-all ${isAnnual ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>Annually</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-2xl border transition-all ${tier.popular ? "border-indigo-500 bg-slate-900/80 shadow-2xl scale-105" : "border-slate-800 bg-slate-900"}`}>
              <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
              <p className="text-slate-400 mb-4 h-12">{tier.description}</p>
              <div className="text-4xl font-bold mb-6">{isAnnual ? tier.annualPrice : tier.monthlyPrice}<span className="text-sm font-normal text-slate-500 ml-2">{isAnnual ? '/year' : '/month'}</span></div>
              <Link href={`/api/checkout?plan=${tier.name}&interval=${isAnnual ? "year" : "month"}`} className="block bg-indigo-500 hover:bg-indigo-400 text-center py-3 rounded-md font-semibold transition-all">Start Winning Contracts</Link>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}