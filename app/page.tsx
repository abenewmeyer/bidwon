import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Zap, ShieldCheck, FileText } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold tracking-tighter text-emerald-700">BidWon</div>
          </div>
          <Link 
            href="/login" 
            className="text-sm font-semibold px-6 py-3 rounded-full border border-zinc-300 hover:bg-zinc-100 transition-colors"
          >
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20 pb-16 px-6 bg-gradient-to-b from-white to-zinc-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-widest px-5 py-2 rounded-full mb-6">
            FOR SMALL & CERTIFIED CONTRACTORS • ANY NAICS • ANY SET-ASIDE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            Stop Wasting Hours on SAM.gov.<br />
            <span className="text-emerald-600">Start Winning More Federal Contracts.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            BidWon automatically discovers eligible opportunities across all federal contracting, scores them against **your NAICS codes and certifications**, and helps you build compliant bid packages — so you bid smarter and faster.
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-white p-2 rounded-2xl shadow-2xl border border-zinc-200 flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Your primary NAICS (e.g. 541330, 236220...)" 
                className="flex-1 px-6 py-4 rounded-xl border border-zinc-300 focus:border-emerald-600 focus:ring-0 text-base placeholder:text-zinc-400"
              />
              <Link 
                href="/login" 
                className="bg-emerald-600 hover:bg-emerald-700 transition-all text-white font-semibold text-lg px-10 py-4 rounded-xl flex items-center justify-center gap-3 group"
              >
                Get Started Free 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">No credit card required • Configure your NAICS & set-asides in seconds</p>
          </div>

          <p className="mt-10 text-sm text-zinc-500 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Scanning live opportunities across construction, IT, professional services, engineering & more
          </p>
        </div>
      </header>

      {/* Problem Agitation */}
      <section className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Clock className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Manual SAM.gov Searching Is Costing You Contracts & Margins
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            You’re burning 40+ hours per opportunity hunting notices, checking eligibility across multiple NAICS codes and set-asides, parsing thick attachments, and racing deadlines — while better-resourced incumbents win again.
          </p>
          <p className="mt-8 text-zinc-500">In federal contracting, speed and precision win. If you’re not moving faster, you’re leaving money on the table.</p>
        </div>
      </section>

      {/* Solution Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Your Personalized Edge Across the Entire Federal Market</h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Official SAM.gov data + AI that learns **your** NAICS codes, set-asides, and capabilities — no vertical lock-in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Daily Intelligent Discovery</h3>
            <p className="text-zinc-600">Pulls fresh opportunities filtered by **your exact NAICS codes**, set-asides (SDVOSB, 8(a), HUBZone, small business, etc.), keywords, and location. Never miss another relevant solicitation.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">AI Eligibility Scoring</h3>
            <p className="text-zinc-600">Instant match score + checklist tailored to your certifications and past performance. Clear summaries and risk flags help you focus only on high-potential bids.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">AI-Assisted Bid Packages</h3>
            <p className="text-zinc-600">Generates tailored capability statements, compliance responses, and assists with PDF forms using clean attachment parsing. You review every detail and submit yourself — fully compliant.</p>
          </div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="bg-emerald-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Test It Risk-Free on Your Next Opportunities</h2>
          <p className="text-2xl text-emerald-800 mb-10">
            Get your first AI-scored opportunities and a full bid assist package for free.<br />If it doesn’t save you 15–20+ hours across your NAICS codes, it’s on us.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-semibold px-12 py-6 rounded-2xl transition-all"
          >
            Start Winning More Contracts Today <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-xs text-zinc-500 mt-8">You always stay in full control. AI assists — you review and submit on SAM.gov.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto" id="pricing">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Pricing That Grows With Your Pipeline</h2>
          <p className="text-zinc-600">Cancel anytime. Annual billing saves 20%.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tactical */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-200 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Tactical</h3>
            <p className="text-zinc-500 mb-8">Perfect for getting started</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$79</span>
              <span className="text-xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600 font-medium">or $63/mo billed annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Daily opportunities filtered by your NAICS</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Up to 5 NAICS & set-asides</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> 15 AI-scored opportunities/mo</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Basic bid assist</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-zinc-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition">Start Tactical</Link>
          </div>

          {/* Strategic — Most Popular */}
          <div className="bg-zinc-900 text-white rounded-3xl p-10 shadow-2xl relative -mt-4 md:-mt-8 border border-emerald-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-6 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="text-3xl font-semibold mb-2">Strategic</h3>
            <p className="text-zinc-400 mb-8">For growing contractors</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$297</span>
              <span className="text-xl text-zinc-400">/mo</span>
              <div className="text-sm text-emerald-400 font-medium">or $237/mo billed annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-300">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Unlimited NAICS, keywords & set-asides</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Unlimited AI scoring & summaries</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> 50+ AI-assisted bid packages/mo</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Advanced PDF & attachment assist</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Priority alerts</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition">Start Strategic Plan</Link>
          </div>

          {/* Sovereign */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-200 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Sovereign</h3>
            <p className="text-zinc-500 mb-8">Enterprise control</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$997</span>
              <span className="text-xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600 font-medium">or $797/mo billed annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Everything in Strategic</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Unlimited generations</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Self-hosted / white-label</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Custom integrations & support</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-zinc-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition">Contact Sales</Link>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-12">100% human-in-the-loop. You always review drafts and submit bids yourself. Built for compliance across any NAICS.</p>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12 px-6 text-center">
        <p>© 2026 BidWon. All rights reserved. Helping small and certified contractors win more federal opportunities — across all NAICS codes and set-asides — ethically and efficiently.</p>
      </footer>
    </div>
  );
}