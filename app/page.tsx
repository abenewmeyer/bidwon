import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldAlert, Zap, FileText, Target } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-blue-900">BidWon</div>
        <div className="space-x-4">
          <Link href="/login" className="text-slate-600 hover:text-blue-900 font-medium">
            Log In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-20 max-w-5xl mx-auto text-center">
        <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">
          Federal Contracting is a numbers game. Play with an unfair advantage.
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900">
          Stop Writing Government Bids. <br className="hidden md:block" />
          <span className="text-blue-600">Start Winning Them.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          BidWon ingests daily SAM.gov opportunities, analyzes decades of historical winning contracts, and drafts fully compliant, ready-to-submit proposals in seconds.
        </p>
        
        {/* Micro-Commitment Lead Capture */}
        <div className="bg-white p-2 rounded-lg shadow-xl border border-slate-200 max-w-2xl mx-auto flex flex-col md:flex-row gap-2">
          <input 
            type="text" 
            placeholder="Enter your primary NAICS code..." 
            className="flex-1 px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
          />
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-all flex items-center justify-center gap-2">
            Start Winning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-sm text-slate-500 mt-4 font-medium">
          Processing live opportunities across IT, Defense, Construction, and Consulting.
        </p>
      </header>

      {/* The Wedge (Problem/Agitation) */}
      <section className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">The Old Way of Bidding is Bleeding You Dry.</h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            You are spending 40+ hours dissecting solicitations, agonizing over compliance matrices, and manually writing proposals from scratch. By the time you submit, your margins are already eaten by administrative overhead. If you aren't bidding at scale, you are leaving millions on the table for incumbents who do.
          </p>
        </div>
      </section>

      {/* The Pitch (Solution Features) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">The Ultimate Proposal Architecture.</h2>
          <p className="text-lg text-slate-600">Built for lean operators who demand scale and precision.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <Zap className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Nightly SAM.gov Sync</h3>
            <p className="text-slate-600">We pull the latest active opportunities directly into your dashboard while you sleep. Filter by your exact NAICS codes. Never miss a solicitation.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <FileText className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">RAG-Powered Context</h3>
            <p className="text-slate-600">BidWon doesn't just guess. It actively references the structure, tone, and compliance language of actual, historically awarded contracts in your industry.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <Target className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Straight-Line Generation</h3>
            <p className="text-slate-600">Go from an active 50-page solicitation to a fully structured, formatted, and compliant Markdown proposal in under 60 seconds.</p>
          </div>
        </div>
      </section>

      {/* Risk Reversal & Comparison Visual */}
      <section className="bg-blue-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Generate your first complete bid for free.</h2>
          <p className="text-xl text-blue-800 mb-10 max-w-2xl mx-auto">
            If our automated output doesn't save you 20 hours of manual labor on your very next proposal, you pay nothing.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-red-100 w-full md:w-1/2 opacity-75">
              <p className="text-red-600 font-bold mb-2">The Old Way</p>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6 mb-2"></div>
              <p className="text-slate-400 text-sm mt-4">40+ hours. High overhead.</p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-blue-400" />
            <div className="bg-white p-6 rounded-lg shadow-xl border border-blue-200 w-full md:w-1/2">
              <p className="text-blue-600 font-bold mb-2">The BidWon Way</p>
              <div className="h-4 bg-blue-100 rounded w-full mb-2"></div>
              <div className="h-4 bg-blue-100 rounded w-full mb-2"></div>
              <div className="h-4 bg-blue-100 rounded w-full mb-2"></div>
              <p className="text-slate-800 font-bold text-sm mt-4">60 seconds. Ready to submit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Enterprise-Grade Infrastructure. Zero Overhead.</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Tier 1 */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Tactical</h3>
            <p className="text-slate-500 mb-6">For lean operators scaling up.</p>
            <div className="text-4xl font-extrabold mb-6">$149<span className="text-lg text-slate-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Daily SAM.gov Sync</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Up to 3 NAICS Codes</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /> 10 Automated Bids / mo</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-md transition-all">Start Tactical</Link>
          </div>

          {/* Tier 2 */}
          <div className="bg-blue-900 text-white p-8 rounded-xl border border-blue-800 shadow-2xl transform md:-translate-y-4">
            <div className="bg-blue-500 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2">Strategic</h3>
            <p className="text-blue-200 mb-6">The core bidding engine.</p>
            <div className="text-4xl font-extrabold mb-6">$497<span className="text-lg text-blue-300 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Unlimited NAICS Tracking</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> 50 Automated Bids / mo</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Access to Vector Vault RAG</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-white hover:bg-slate-100 text-blue-900 font-bold py-3 rounded-md transition-all">Start Strategic</Link>
          </div>

          {/* Tier 3 */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Sovereign</h3>
            <p className="text-slate-500 mb-6">Total architectural control.</p>
            <div className="text-4xl font-extrabold mb-6">$1,497<span className="text-lg text-slate-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Unlimited Generation</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Local-First Data Deployment</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Custom CRM API Access</li>
            </ul>
            <Link href="/login" className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-md transition-all">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-center">
        <p>© 2026 BidWon. All rights reserved. Built for scale.</p>
      </footer>
    </div>
  );
}