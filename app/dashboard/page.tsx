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
            title: "Public Assistance Technical Assistance Services - Multiple Regions",
            agency: "Federal Emergency Management Agency (FEMA)",
            deadline: "May 28, 2026",
            score: 93,
            summary: "Excellent match for your NAICS selection. Strong set-aside eligibility and alignment with relief services.",
            checklist: "SDVOSB/HUBZone eligible • Flexible performance location",
          },
          {
            title: "Disaster Recovery Construction Management & Safety Oversight",
            agency: "U.S. Army Corps of Engineers",
            deadline: "June 4, 2026",
            score: 89,
            summary: "High-potential opportunity matching your construction and safety capabilities.",
            checklist: "Minority-owned preference noted • Timeline flagged for action",
          }
        ]
      });
      setIsDemoRunning(false);
      setTimeout(() => setShowBlur(true), 2500);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="text-4xl font-bold tracking-tighter text-emerald-700">BidWon</div>
          <Link 
            href="/login" 
            className="px-8 py-3.5 text-sm font-semibold border border-zinc-300 rounded-2xl hover:bg-zinc-100 transition-colors"
          >
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-28 pb-24 px-6 bg-gradient-to-br from-white via-zinc-50 to-emerald-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-emerald-100 text-emerald-700 text-sm font-semibold px-6 py-2 rounded-3xl mb-8">
            FOR SMALL & CERTIFIED CONTRACTORS • SDVOSB • 8(a) • MINORITY-OWNED
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
            Stop missing winnable federal contracts.<br />
            <span className="text-emerald-600">Start winning more — faster.</span>
          </h1>

          <p className="text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            BidWon scans SAM.gov daily using <span className="font-semibold">your exact NAICS codes and set-asides</span>, scores opportunities for fit, and helps you build compliant bid packages. You review every draft and submit yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-semibold px-12 py-6 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-200"
            >
              Get Started Free – No Card Needed
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-sm text-zinc-500 mt-6">Setup in 60 seconds • Trusted by certified contractors winning real contracts</p>
        </div>
      </header>

      {/* Interactive Demo */}
      <section className="py-24 px-6 bg-white border-t border-b">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">See BidWon Work — Right Now</h2>
            <p className="text-2xl text-zinc-600 max-w-2xl mx-auto">Select your NAICS codes and watch how we find, score, and prepare real opportunities in seconds.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-zinc-50 border border-zinc-100 rounded-3xl p-10 mb-16">
            <p className="text-zinc-700 font-medium mb-6 text-center">Select up to 5 NAICS codes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
              {popularNaics.map((item) => (
                <button
                  key={item.code}
                  onClick={() => toggleNaics(item.code)}
                  className={`p-5 rounded-2xl text-left transition-all flex justify-between items-center border text-sm ${selectedNaics.includes(item.code) 
                    ? 'border-emerald-600 bg-emerald-50 shadow-sm' 
                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-white'}`}
                >
                  <div>
                    <span className="font-mono font-semibold text-emerald-700">{item.code}</span>
                    <span className="ml-3 text-zinc-600">{item.desc}</span>
                  </div>
                  {selectedNaics.includes(item.code) && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                </button>
              ))}
            </div>

            <button
              onClick={runDemo}
              disabled={isDemoRunning || selectedNaics.length === 0}
              className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-5 rounded-3xl text-xl flex items-center justify-center gap-3 transition-all"
            >
              {isDemoRunning ? "Searching SAM.gov live..." : "Show Me Matching Opportunities"}
              <Play className="w-6 h-6" />
            </button>
            <p className="text-xs text-center text-zinc-500 mt-4">Live simulation • Real accounts get fresh daily results + full bid assist</p>
          </div>

          {demoResults && (
            <div className="max-w-4xl mx-auto space-y-12">
              {demoResults.opportunities.map((opp: any, index: number) => (
                <div key={index} className="bg-white border border-zinc-100 shadow-sm rounded-3xl p-10 relative overflow-hidden">
                  {showBlur && index >= 1 && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
                      <p className="text-2xl font-semibold mb-4 text-center">This is only a preview</p>
                      <p className="text-zinc-600 max-w-md text-center mb-8">Sign up free to unlock full AI summaries, complete checklists, PDF assistance, and daily real opportunities.</p>
                      <Link href="/login" className="bg-emerald-600 text-white px-10 py-4 rounded-3xl font-semibold flex items-center gap-3">
                        Unlock Full Results Free <ArrowRight className="w-5 h-5" />
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

                  <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-600">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> {opp.checklist}</div>
                    <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-600" /> Full Bid Package Assist Ready</div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-8">
                <Link href="/login" className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-black text-white text-xl font-semibold px-16 py-7 rounded-3xl transition-all">
                  Get Real Daily Opportunities + Full AI Bid Assist
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pain Agitation */}
      <section className="py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-20 h-20 text-red-400 mx-auto mb-8" />
          <h2 className="text-5xl font-bold tracking-tight mb-8">Manual SAM.gov searching is killing your pipeline</h2>
          <p className="text-2xl text-zinc-400 leading-relaxed">
            40+ hours per opportunity hunting notices, checking eligibility, parsing attachments, and racing deadlines — while incumbents win again.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto bg-white" id="pricing">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Simple pricing that scales with you</h2>
          <p className="text-xl text-zinc-600">Cancel anytime. Annual plans save 20%.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tactical */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-100 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Tactical</h3>
            <p className="text-zinc-500 mb-8">For getting started</p>
            <div className="mb-12">
              <span className="text-7xl font-bold">$79</span>
              <span className="text-2xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600">or $63/mo billed annually</div>
            </div>
            <ul className="space-y-6 mb-12 text-lg text-zinc-600">
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" /> Up to 5 NAICS codes</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" /> 15 AI-scored opportunities/mo</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" /> 5 AI-assisted bid packages/mo</li>
            </ul>
            <Link href="/login" className="block w-full py-5 text-center border-2 border-zinc-900 rounded-3xl font-semibold hover:bg-zinc-900 hover:text-white transition">Get Tactical</Link>
          </div>

          {/* Strategic - Most Popular */}
          <div className="bg-zinc-900 text-white rounded-3xl p-10 relative scale-[1.02] shadow-2xl border border-emerald-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 px-8 py-1 rounded-full text-sm font-bold">MOST POPULAR</div>
            <h3 className="text-3xl font-semibold mb-2">Strategic</h3>
            <p className="text-zinc-400 mb-8">For growing contractors</p>
            <div className="mb-12">
              <span className="text-7xl font-bold">$297</span>
              <span className="text-2xl text-zinc-400">/mo</span>
              <div className="text-sm text-emerald-400">or $237/mo billed annually</div>
            </div>
            <ul className="space-y-6 mb-12 text-lg text-zinc-300">
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" /> Unlimited NAICS & set-asides</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" /> Unlimited AI scoring</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" /> 50 AI-assisted bid packages/mo</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" /> Advanced attachment & PDF assist</li>
            </ul>
            <Link href="/login" className="block w-full py-5 text-center bg-emerald-600 rounded-3xl font-semibold hover:bg-emerald-700 transition">Get Strategic</Link>
          </div>

          {/* Sovereign */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-100 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Sovereign</h3>
            <p className="text-zinc-500 mb-8">For teams & scale</p>
            <div className="mb-12">
              <span className="text-7xl font-bold">$997</span>
              <span className="text-2xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600">or $797/mo billed annually</div>
            </div>
            <ul className="space-y-6 mb-12 text-lg text-zinc-600">
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" /> Unlimited everything</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" /> Self-hosted / white-label option</li>
              <li className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" /> Custom integrations & support</li>
            </ul>
            <Link href="/login" className="block w-full py-5 text-center border-2 border-zinc-900 rounded-3xl font-semibold hover:bg-zinc-900 hover:text-white transition">Contact Sales</Link>
          </div>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-12">100% human-in-the-loop. You always review and submit bids yourself on SAM.gov.</p>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-16 px-6 text-center">
        <p>© 2026 BidWon. All rights reserved. Helping small & certified contractors win more federal opportunities — compliantly and efficiently.</p>
      </footer>
    </div>
  );
}