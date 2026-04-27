"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Search, ExternalLink, Loader2, Database } from "lucide-react";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [queries, setQueries] = useState(["", "", ""]);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (index: number, value: string) => {
    const newQueries = [...queries];
    newQueries[index] = value;
    setQueries(newQueries);
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (queries.every(q => !q)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/demo-opportunities", {
        method: "POST",
        body: JSON.stringify({ queries }),
        headers: { "Content-Type": "application/json" }
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
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          BidWon
        </div>
        <Link href="/login" className="text-sm text-slate-300 hover:text-white">
          Client Login
        </Link>
      </nav>

      <section className="px-6 py-24 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center px-3 py-1 text-sm text-indigo-300 bg-indigo-500/10 rounded-full mb-6">
            Live SAM.gov Data • Updated Daily
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Win More Government Contracts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Without Manual Search
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8">
            BidWon isolates active SAM.gov opportunities and drafts highly compliant bids anchored strictly to your past performance. Upon activation, your historic data is securely ingested into a private Vector Vault to dictate all future bid logic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/api/checkout?plan=Strategic&interval=year"
              className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-md font-semibold text-center transition-colors"
            >
              Initialize System
            </Link>

            <Link
              href="#how"
              className="flex items-center justify-center text-white hover:text-indigo-300 transition-colors"
            >
              Review Architecture
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Immediate provisioning upon payment verification.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[380px] flex flex-col shadow-2xl">
          <div className="text-sm text-slate-400 mb-4 font-semibold uppercase tracking-wider flex items-center">
            <Database className="h-4 w-4 mr-2" /> Live Opportunity Matcher
          </div>
          
          <form onSubmit={handleScan} className="mb-4">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  <input 
                    type="text" 
                    placeholder={`NAICS ${i + 1}`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none text-center"
                    value={queries[i]}
                    onChange={(e) => handleQueryChange(i, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Execute Search Parameter'}
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
                No active opportunities found for these parameters.
              </div>
            )}

            {!results && !loading && (
              <div className="flex flex-col items-center justify-center py-8 text-slate-600">
                <p className="text-sm italic">Input up to 3 NAICS codes to query the live database.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6">
          Architected for organizations scaling federal revenue pipelines
        </p>
        <div className="flex justify-center gap-10 text-slate-500 text-sm mb-10 flex-wrap font-mono uppercase tracking-widest">
          <span>IT Services</span>
          <span>Defense</span>
          <span>Healthcare</span>
          <span>Logistics</span>
          <span>Engineering</span>
        </div>
        <div className="max-w-3xl mx-auto text-lg text-slate-300 italic border-l-4 border-indigo-500 pl-6 text-left">
          “BidWon replaced over 20 hours per week of manual opportunity search and
          increased our bid submissions by more than 4x within the first month. The vector-matching is unparalleled.”
        </div>
      </section>

      <section id="how" className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Core Architecture</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold mb-2 text-xl">1. Sovereign Ingestion</div>
            <p className="text-slate-400">
              Upload past performance and capabilities. Data is isolated in your private Vector Vault to dictate bid generation logic.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold mb-2 text-xl">2. Automated Match</div>
            <p className="text-slate-400">
              System continuously evaluates nightly SAM.gov data drops against your vault to isolate high-probability targets.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold mb-2 text-xl">3. Generation</div>
            <p className="text-slate-400">
              Engine drafts highly technical, compliant submission responses utilizing your precise corporate methodology and tone.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-slate-900 border-t border-slate-800 text-center">
        <h2 className="text-4xl font-bold mb-12">System Differentiation</h2>
        <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
          <div className="p-6">
            <h3 className="font-semibold mb-2 text-xl">Manual Search</h3>
            <p className="text-slate-400">Labor-intensive, prone to human error, and limits overall pipeline velocity.</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-2 text-xl">Generic LLM Outputs</h3>
            <p className="text-slate-400">Lacks federal compliance structures and produces generalized, non-actionable proposals.</p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-indigo-500/30 rounded-2xl">
            <h3 className="font-semibold mb-2 text-indigo-400 text-xl">BidWon RAG Vault</h3>
            <p className="text-slate-300">
              Sovereign data matching ensuring 100% technical continuity between your past wins and future submissions.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Select Your Deployment Tier</h2>
          <p className="text-slate-400">
            Immediate provisioning. Secure your competitive advantage.
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
                <span className="text-sm font-normal text-slate-500 ml-1">{isAnnual ? "/year" : "/mo"}</span>
              </div>

              <Link
                href={`/api/checkout?plan=${tier.name}&interval=${isAnnual ? "year" : "month"}`}
                className={`block text-center py-3 rounded-md font-semibold transition-colors ${tier.popular ? "bg-indigo-500 hover:bg-indigo-400 text-white" : "bg-slate-800 hover:bg-slate-700 text-white"}`}
              >
                Execute Deployment
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
      </section>
    </div>
  );
}
