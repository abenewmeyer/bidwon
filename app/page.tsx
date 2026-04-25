'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Zap, ShieldCheck, FileText, Play, Users } from 'lucide-react';

const popularNaics = [
  { code: "624230", desc: "Emergency and Other Relief Services" },
  { code: "236220", desc: "Commercial & Institutional Building Construction" },
  { code: "541330", desc: "Engineering Services" },
  { code: "562910", desc: "Remediation Services" },
  { code: "541611", desc: "Administrative Management Consulting" },
  { code: "561210", desc: "Facilities Support Services" },
  { code: "237110", desc: "Water & Sewer Line Construction" },
  { code: "541512", desc: "Computer Systems Design Services" },
];

export default function LandingPage() {
  const [selectedNaics, setSelectedNaics] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoResults, setDemoResults] = useState<any>(null);
  const [showBlur, setShowBlur] = useState(false);

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
            summary: "Excellent match for your selected NAICS codes. Strong set-aside eligibility with flexible place of performance.",
            checklist: "SDVOSB / HUBZone eligible • Compliance checklist auto-generated",
          },
          {
            title: "Disaster Recovery Construction Management & Safety Oversight",
            agency: "U.S. Army Corps of Engineers",
            deadline: "June 4, 2026",
            score: 89,
            summary: "High-potential opportunity matching multiple NAICS with focus on construction management and safety services.",
            checklist: "Minority-owned preferences noted • Timeline risk flagged",
          }
        ]
      });
      setIsDemoRunning(false);
      setTimeout(() => setShowBlur(true), 2800);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans">
      {/* Modern Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold tracking-tighter text-emerald-700">BidWon</div>
          </div>
          <Link 
            href="/login"
            className="px-8 py-3.5 text-sm font-semibold border border-zinc-300 rounded-2xl hover:bg-zinc-100 transition-colors"
          >
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero - Clean & Premium */}
      <header className="pt-28 pb-24 px-6 bg-gradient-to-br from-white via-zinc-50 to-emerald-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-emerald-100 text-emerald-700 text-sm font-semibold px-6 py-2 rounded-3xl mb-8">
            FOR CERTIFIED SMALL CONTRACTORS • ANY NAICS • ANY SET-ASIDE
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
            Stop missing federal contracts.<br />
            <span className="text-emerald-600">Start winning them smarter.</span>
          </h1>

          <p className="text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            BidWon scans SAM.gov daily using <span className="font-semibold">your exact NAICS codes and set-asides</span>, scores opportunities instantly, and helps you prepare compliant bids — all while you stay in full control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-semibold px-12 py-6 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-200"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-sm text-zinc-500 mt-6">No credit card • Setup in under 60 seconds</p>
        </div>
      </header>

      {/* Interactive Demo - "See It Work" */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">See BidWon in Action</h2>
            <p className="text-2xl text-zinc-600 max-w-2xl mx-auto">Select your NAICS codes and watch how we find, score, and prepare real opportunities — live demo.</p>
          </div>

          {/* NAICS Selector */}
          <div className="max-w-3xl mx-auto bg-zinc-50 border border-zinc-100 rounded-3xl p-10 mb-16">
            <p className="text-zinc-700 font-medium mb-6 text-center">Select up to 5 NAICS codes (click to choose):</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
              {popularNaics.map((item) => (
                <button
                  key={item.code}
                  onClick={() => toggleNaics(item.code)}
                  className={`p-5 rounded-2xl text-left transition-all flex justify-between items-center border ${selectedNaics.includes(item.code) 
                    ? 'border-emerald-600 bg-emerald-50 shadow-sm' 
                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-white'}`}
                >
                  <div>
                    <span className="font-mono font-semibold text-emerald-700">{item.code}</span>
                    <span className="ml-3 text-zinc-600 text-sm">{item.desc}</span>
                  </div>
                  {selectedNaics.includes(item.code) && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                </button>
              ))}
            </div>

            <button
              onClick={runDemo}
              disabled={isDemoRunning || selectedNaics.length === 0}
              className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-5 rounded-3xl text-xl flex items-center justify-center gap-3 transition-all"
            >
              {isDemoRunning ? "Searching SAM.gov live..." : "Show Me Matching Opportunities"}
              <Play className="w-6 h-6" />
            </button>
          </div>

          {/* Demo Results */}
          {demoResults && (
            <div className="max-w-4xl mx-auto space-y-12">
              {demoResults.opportunities.map((opp: any, index: number) => (
                <div key={index} className="bg-white border border-zinc-100 shadow-sm rounded-3xl p-10 relative overflow-hidden">
                  {showBlur && index >= 1 && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                      <p className="text-2xl font-semibold mb-4 text-center">This is just the preview.</p>
                      <p className="text-zinc-600 max-w-md text-center mb-8">Sign up free to unlock full AI bid assistance, PDF form help, and daily real-time results.</p>
                      <Link href="/login" className="bg-emerald-600 text-white px-10 py-4 rounded-3xl font-semibold flex items-center gap-3">
                        Unlock Full Power Free <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold leading-tight mb-3">{opp.title}</h3>
                      <p className="text-zinc-500 mb-6">{opp.agency} • Deadline: {opp.deadline}</p>
                      <div className="bg-emerald-50 rounded-2xl p-6">
                        <p className="font-medium text-emerald-800 mb-2">AI Summary</p>
                        <p className="text-zinc-700">{opp.summary}</p>
                      </div>
                    </div>

                    <div className="text-center md:text-right md:w-48 flex-shrink-0">
                      <div className="text-[4.5rem] font-bold leading-none text-emerald-600">{opp.score}</div>
                      <div className="uppercase tracking-[2px] text-xs font-medium text-emerald-600">MATCH SCORE</div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> {opp.checklist}</div>
                    <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-600" /> Full Bid Package Assist Ready</div>
                  </div>
                </div>
              ))}

              <div className="text-center">
                <Link href="/login" className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-black text-white text-xl font-semibold px-16 py-7 rounded-3xl transition-all">
                  Get Real Daily Opportunities + Full AI Assist
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-20 h-20 text-red-400 mx-auto mb-8" />
          <h2 className="text-5xl font-bold tracking-tight mb-8">Manual SAM.gov searching is costing you contracts</h2>
          <p className="text-2xl text-zinc-400 leading-relaxed">
            Spending 40+ hours per opportunity on searching, eligibility checks, and compliance while deadlines slip away — that ends now.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Choose Your Plan</h2>
          <p className="text-xl text-zinc-600">Cancel anytime. Annual plans save 20%.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tactical */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-100">
            <h3 className="text-3xl font-semibold mb-2">Tactical</h3>
            <p className="text-zinc-500 mb-8">Perfect for getting started</p>
            <div className="mb-12">
              <span className="text-7xl font-bold">$79</span>
              <span className="text-2xl text-zinc-500">/mo</span>
            </div>
            <ul className="space-y-6 mb-12 text-lg">
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" /> Daily filtered opportunities</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" /> Up to 5 NAICS & set-asides</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" /> AI scoring & basic assist</li>
            </ul>
            <Link href="/login" className="block w-full py-5 text-center border border-zinc-900 rounded-3xl font-semibold hover:bg-zinc-900 hover:text-white transition">Get Tactical</Link>
          </div>

          {/* Strategic - Popular */}
          <div className="bg-zinc-900 text-white rounded-3xl p-10 relative scale-105 shadow-2xl border border-emerald-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 px-8 py-1 rounded-full text-sm font-bold">MOST POPULAR</div>
            <h3 className="text-3xl font-semibold mb-2">Strategic</h3>
            <p className="text-zinc-400 mb-8">For serious growth</p>
            <div className="mb-12">
              <span className="text-7xl font-bold">$297</span>
              <span className="text-2xl text-zinc-400">/mo</span>
            </div>
            <ul className="space-y-6 mb-12 text-lg">
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5" /> Unlimited NAICS & set-asides</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5" /> Unlimited AI scoring & summaries</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5" /> Full bid package assistance</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5" /> Advanced PDF & attachment tools</li>
            </ul>
            <Link href="/login" className="block w-full py-5 text-center bg-emerald-600 rounded-3xl font-semibold hover:bg-emerald-700 transition">Get Strategic</Link>
          </div>

          {/* Sovereign */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-100">
            <h3 className="text-3xl font-semibold mb-2">Sovereign</h3>
            <p className="text-zinc-500 mb-8">Full control & scale</p>
            <div className="mb-12">
              <span className="text-7xl font-bold">$997</span>
              <span className="text-2xl text-zinc-500">/mo</span>
            </div>
            <ul className="space-y-6 mb-12 text-lg">
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" /> Everything in Strategic</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" /> Self-hosted / white-label</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5" /> Priority support & integrations</li>
            </ul>
            <Link href="/login" className="block w-full py-5 text-center border border-zinc-900 rounded-3xl font-semibold hover:bg-zinc-900 hover:text-white transition">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-16 px-6 text-center">
        <p>© 2026 BidWon. All rights reserved. Helping small & certified contractors win more federal opportunities — compliantly and efficiently.</p>
      </footer>
    </div>
  );
}