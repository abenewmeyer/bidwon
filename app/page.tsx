import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Zap, ShieldCheck, FileText, Users } from 'lucide-react';

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
            BidWon finds eligible opportunities across the entire federal marketplace using your exact NAICS codes and set-asides, scores them instantly, and helps you build compliant bid packages — so you submit more, faster, and smarter.
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-white p-2 rounded-2xl shadow-2xl border border-zinc-200 flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Primary NAICS (e.g. 541330, 236220...)" 
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
            <p className="text-xs text-zinc-500 mt-4">No credit card • Set up your NAICS & certifications in 60 seconds</p>
          </div>

          <p className="mt-10 text-sm text-zinc-500 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Live opportunities across construction, IT, professional services, engineering, environmental, and more
          </p>
        </div>
      </header>

      {/* Problem Agitation */}
      <section className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            40+ Hours Per Bid Is Killing Your Pipeline
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Hunting SAM.gov, checking eligibility across multiple NAICS and set-asides, parsing attachments, and racing deadlines leaves you exhausted — while incumbents and faster competitors take the wins.
          </p>
          <p className="mt-8 text-zinc-500">Federal contracting rewards speed and precision. Manual processes cost you contracts and margins every single week.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 max-w-6xl mx-auto bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">From Overwhelmed to Opportunity-Rich in Minutes</h2>
          <p className="text-xl text-zinc-600">Simple, powerful workflow designed for busy contractors</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">Configure Once</h3>
            <p className="text-zinc-600 text-sm">Enter your NAICS codes, set-asides (SDVOSB, 8(a), HUBZone, etc.), and keywords</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Daily Smart Sync</h3>
            <p className="text-zinc-600 text-sm">Official SAM.gov API pulls only matching opportunities while you sleep</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">AI Scores & Summarizes</h3>
            <p className="text-zinc-600 text-sm">Instant eligibility score, checklist, executive summary, and risk flags</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">4</div>
            <h3 className="font-semibold mb-2">Build & Submit</h3>
            <p className="text-zinc-600 text-sm">AI assists with capability statements, responses, and PDF forms — you review and submit on SAM.gov</p>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Your Unfair Advantage Across Every Federal Opportunity</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
            <Zap className="w-12 h-12 text-emerald-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Intelligent Daily Discovery</h3>
            <p className="text-zinc-600">Fresh opportunities filtered precisely by your NAICS codes, set-asides, keywords, and location — no more manual searching.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
            <ShieldCheck className="w-12 h-12 text-emerald-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">AI Eligibility Intelligence</h3>
            <p className="text-zinc-600">Instant match scoring, compliance checklists, and risk flags tailored to your certifications and capabilities.</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100">
            <FileText className="w-12 h-12 text-emerald-600 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">AI-Assisted Bid Packages</h3>
            <p className="text-zinc-600">Generates tailored statements, responses, and PDF assistance. Full human review — you stay compliant and in control.</p>
          </div>
        </div>
      </section>

      {/* Risk Reversal + Social Proof Placeholder */}
      <section className="bg-emerald-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Risk-Free Proof on Your Next Opportunities</h2>
          <p className="text-2xl text-emerald-800 mb-10">
            Get your first batch of AI-scored opportunities and a complete bid assist package for free.<br />If it doesn’t save you 15–20+ hours, it’s on us.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-semibold px-12 py-6 rounded-2xl transition-all"
          >
            Start Winning More Contracts Today <ArrowRight className="w-6 h-6" />
          </Link>

          {/* Testimonials Placeholder — easy to expand later */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-zinc-600">"Finally stopped missing set-aside opportunities. The scoring alone is worth 10x the price."</p>
              <p className="mt-4 text-sm font-medium">— SDVOSB Owner, Construction Services</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-zinc-600">"Saved me dozens of hours on the last solicitation. The PDF assist is a game changer."</p>
              <p className="mt-4 text-sm font-medium">— Minority-Owned IT Services Contractor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 max-w-6xl mx-auto" id="pricing">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, Scalable Pricing</h2>
          <p className="text-zinc-600">Cancel anytime. Annual plans save 20%.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Tactical */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-200 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Tactical</h3>
            <p className="text-zinc-500 mb-8">Start strong</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$79</span>
              <span className="text-xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600 font-medium">or $63/mo annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Daily filtered opportunities</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Up to 5 NAICS & set-asides</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> 15 AI-scored opportunities/mo</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Basic bid assistance</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-zinc-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition">Get Tactical</Link>
          </div>

          {/* Strategic — Most Popular */}
          <div className="bg-zinc-900 text-white rounded-3xl p-10 shadow-2xl relative -mt-4 md:-mt-8 border border-emerald-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-6 py-1 rounded-full">MOST POPULAR</div>
            <h3 className="text-3xl font-semibold mb-2">Strategic</h3>
            <p className="text-zinc-400 mb-8">Scale your wins</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$297</span>
              <span className="text-xl text-zinc-400">/mo</span>
              <div className="text-sm text-emerald-400 font-medium">or $237/mo annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-300">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Unlimited NAICS & set-asides</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Unlimited AI scoring & summaries</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> 50+ AI-assisted bid packages/mo</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Advanced attachment & PDF assist</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" /> Priority alerts</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition">Get Strategic</Link>
          </div>

          {/* Sovereign */}
          <div className="bg-white rounded-3xl p-10 border border-zinc-200 shadow-sm">
            <h3 className="text-3xl font-semibold mb-2">Sovereign</h3>
            <p className="text-zinc-500 mb-8">Full control</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">$997</span>
              <span className="text-xl text-zinc-500">/mo</span>
              <div className="text-sm text-emerald-600 font-medium">or $797/mo annually</div>
            </div>
            <ul className="space-y-5 mb-12 text-zinc-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Everything in Strategic</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Unlimited generations</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Self-hosted / white-label</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" /> Custom support & integrations</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-zinc-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition">Contact Sales</Link>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-12">You always review and submit bids yourself. 100% human-in-the-loop for full compliance.</p>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-12 px-6 text-center">
        <p>© 2026 BidWon. All rights reserved. Built to help small and certified contractors win more federal opportunities across any NAICS and set-aside — efficiently and compliantly.</p>
      </footer>
    </div>
  );
}