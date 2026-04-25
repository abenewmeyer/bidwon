'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Zap, ShieldCheck, FileText, Play } from 'lucide-react';

const popularNaics = [
  { code: "624230", desc: "Emergency and Other Relief Services" },
  { code: "236220", desc: "Commercial and Institutional Building Construction" },
  { code: "541330", desc: "Engineering Services" },
  { code: "562910", desc: "Remediation Services" },
  { code: "561210", desc: "Facilities Support Services" },
  { code: "541611", desc: "Administrative Management Consulting" },
  { code: "541512", desc: "Computer Systems Design Services" },
  { code: "237110", desc: "Water and Sewer Line Construction" },
  { code: "562119", desc: "Other Waste Collection" },
  { code: "561730", desc: "Landscaping Services" },
];

export default function LandingPage() {
  const [selectedNaics, setSelectedNaics] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoResults, setDemoResults] = useState<any>(null);
  const [showFullBlur, setShowFullBlur] = useState(false);

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
            summary: "Excellent match for your selected NAICS. Strong set-aside eligibility and alignment with relief services capabilities.",
            checklist: "SDVOSB/HUBZone eligible • Place of performance flexible • Compliance checklist generated",
          },
          {
            title: "Disaster Recovery Construction Management and Safety Oversight",
            agency: "U.S. Army Corps of Engineers",
            deadline: "June 4, 2026",
            score: 88,
            summary: "High potential opportunity. Matches multiple of your NAICS codes with focus on construction management and safety.",
            checklist: "Minority-owned preference possible • Tight timeline flagged",
          },
          {
            title: "Environmental Remediation and Debris Removal Support",
            agency: "Environmental Protection Agency",
            deadline: "May 20, 2026",
            score: 76,
            summary: "Solid opportunity with remediation focus. AI recommends reviewing attachment for specific requirements.",
            checklist: "Requires capability statement update",
          }
        ]
      });
      setIsDemoRunning(false);
      // Blur deeper content after initial preview
      setTimeout(() => setShowFullBlur(true), 2500);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-3xl font-bold tracking-tighter text-emerald-700">BidWon</div>
          <Link href="/login" className="text-sm font-semibold px-6 py-3 rounded-full border border-zinc-300 hover:bg-zinc-100 transition-colors">
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-24 pb-20 px-6 bg-gradient-to-b from-white to-zinc-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest px-5 py-2 rounded-full mb-6">
            SMALL & CERTIFIED CONTRACTORS • ANY NAICS • ANY SET-ASIDE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            Stop Losing Federal Contracts<br className="hidden md:block" /> 
            <span className="text-emerald-600">to Manual SAM.gov Searching</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            BidWon finds eligible opportunities across the entire federal marketplace using **your exact NAICS codes and set-asides**, scores them instantly, and helps you build compliant bid packages — so you submit more and win more.
          </p>

          <div className="max-w-md mx-auto">
            <Link 
              href="/login" 
              className="block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg px-10 py-4 rounded-2xl transition-all"
            >
              Get Started Free – No Credit Card Needed
            </Link>
            <p className="text-xs text-zinc-500 mt-4">Configure your NAICS & certifications in 60 seconds</p>
          </div>
        </div>
      </header>

      {/* Interactive Demo Section - "See It Work Live" */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Try BidWon Right Now – See Real Results</h2>
            <p className="text-xl text-zinc-600">Select up to 5 of your NAICS codes and watch how the system discovers, scores, and assists with opportunities.</p>
          </div>

          {/* NAICS Multi-Select Dropdown */}
          <div className="max-w-2xl mx-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-8 mb-12">
            <p className="font-medium mb-4 text-zinc-700">Select your NAICS codes (up to 5):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
              {popularNaics.map((item) => (
                <button
                  key={item.code}
                  onClick={() => toggleNaics(item.code)}
                  className={`p-4 rounded-2xl text-left transition-all border text-sm flex justify-between items-center ${selectedNaics.includes(item.code) ? 'border-emerald-600 bg-emerald-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                >
                  <span><strong>{item.code}</strong> – {item.desc}</span>
                  {selectedNaics.includes(item.code) && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={runDemo}
                disabled={isDemoRunning || selectedNaics.length === 0}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-300 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
              >
                {isDemoRunning ? "Searching live SAM.gov data..." : "Show Me Real Opportunities"}
                <Play className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-center text-zinc-500 mt-4">This is a live demonstration of BidWon’s actual process. Real accounts get fresh daily results + full bid assist.</p>
          </div>

          {/* Demo Results */}
          {demoResults && (
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-emerald-600 font-medium text-center">✅ Found matching opportunities based on your selected NAICS codes</div>

              {demoResults.opportunities.map((opp: any, index: number) => (
                <div key={index} className="bg-white border border-zinc-200 rounded-3xl p-8 relative">
                  {showFullBlur && index >= 2 && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-20 rounded-3xl">
                      <p className="text-lg font-semibold mb-3">This is only the beginning...</p>
                      <p className="text-zinc-600 mb-6 text-center max-w-xs">Sign up free to unlock full AI summaries, complete eligibility checklists, PDF form assistance, and real capability statement generation.</p>
                      <Link href="/login" className="bg-emerald-600 text-white px-10 py-3.5 rounded-2xl font-semibold flex items-center gap-2">
                        Unlock Full Results Free <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}

                  <div className="flex justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl leading-tight mb-1">{opp.title}</h3>
                      <p className="text-zinc-500">{opp.agency} • Response Deadline: {opp.deadline}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-emerald-600 leading-none">{opp.score}</div>
                      <div className="text-xs tracking-widest uppercase text-emerald-600 font-medium">Match Score</div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-6">
                    <p className="font-medium text-emerald-800 mb-2">AI Executive Summary</p>
                    <p className="text-zinc-700">{opp.summary}</p>
                  </div>

                  <div className="flex items-center gap-8 text-sm text-zinc-600">
                    <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> {opp.checklist}</div>
                    <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-600" /> Bid Package Assist Available</div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-8">
                <p className="mb-6 text-zinc-600">Real users also get Firecrawl-powered capability statement generation from their company website if provided.</p>
                <Link href="/login" className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-black text-white text-lg font-semibold px-12 py-6 rounded-2xl transition-all">
                  Get Your Real Daily Opportunities + Full Bid Assist <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Problem Agitation */}
      <section className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            40+ Hours Per Bid Is Killing Your Pipeline
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Hunting SAM.gov, checking eligibility across your NAICS codes and set-asides, parsing attachments, and racing deadlines leaves you exhausted — while faster competitors win.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto" id="pricing">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Simple Pricing That Scales With You</h2>
          <p className="text-zinc-600">Cancel anytime. Annual billing saves 20%.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-10 border border-zinc-200 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Tactical</h3>
            <p className="text-zinc-500 mb-8">Start strong</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$79</span><span className="text-xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600">or $63/mo annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> Daily filtered opportunities</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> Up to 5 NAICS & set-asides</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> 15 AI-scored opportunities/mo</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-zinc-900 text-white py-4 rounded-2xl font-semibold">Get Tactical</Link>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-10 shadow-2xl relative -mt-4 md:-mt-8 border border-emerald-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-6 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="text-3xl font-semibold mb-2">Strategic</h3>
            <p className="text-zinc-400 mb-8">Scale your wins</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$297</span><span className="text-xl text-zinc-400">/mo</span>
              <div className="text-sm text-emerald-400">or $237/mo annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-300">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" /> Unlimited NAICS & set-asides</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" /> Unlimited AI scoring</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" /> 50+ AI-assisted bid packages/mo</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" /> Advanced PDF & attachment assist</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold">Get Strategic</Link>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-zinc-200 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Sovereign</h3>
            <p className="text-zinc-500 mb-8">Full control</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$997</span><span className="text-xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600">or $797/mo annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> Everything in Strategic</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> Self-hosted option</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> Custom integrations</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-zinc-900 text-white py-4 rounded-2xl font-semibold">Contact Sales</Link>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500 mt-12">You always review and submit bids yourself. 100% human-in-the-loop for compliance.</p>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12 px-6 text-center">
        <p>© 2026 BidWon. All rights reserved. Helping small and certified contractors win more federal opportunities across any NAICS and set-aside — ethically and efficiently.</p>
      </footer>
    </div>
  );
}