import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldAlert, Activity, Lock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-slate-800">
        <div className="text-2xl font-black tracking-tighter text-white">
          BID<span className="text-blue-500">WON</span>
        </div>
        <div className="space-x-6 flex items-center">
          <Link href="/login" className="text-slate-400 hover:text-white font-medium transition-colors">
            Client Login
          </Link>
          <Link href="#pricing" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            Deploy Infrastructure
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 max-w-6xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-semibold text-blue-400 mb-8 backdrop-blur-sm">
          <Activity className="w-4 h-4" /> Live SAM.gov Sync Active
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-white leading-tight">
          Stop Bleeding Margins on <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Dead-End Government Bids.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          The incumbent already has the contract. You are just filler. 
          BidWon leverages native Llama 3-70B architecture and historical vector data to instantly draft 
          highly targeted, technically superior proposals that actually compete.
        </p>

        {/* Lead Magnet / Interactive Demo Entry */}
        <div className="bg-slate-800/80 p-3 rounded-xl shadow-2xl border border-slate-700 max-w-3xl mx-auto flex flex-col md:flex-row gap-3 backdrop-blur-md">
          <input 
            type="text" 
            placeholder="Enter your primary NAICS code (e.g., 541512)" 
            className="flex-1 px-6 py-4 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
          />
          <Link href="#pricing" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-lg transition-all flex items-center justify-center gap-2 text-lg shadow-lg">
            Audit My NAICS <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Interactive Demo & Scoring Framework Visual */}
      <section className="py-24 px-6 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Scoring Framework in Action</h2>
            <p className="text-slate-400 text-lg">Real-time eligibility processing against live federal data.</p>
          </div>
          
          <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex border-b border-slate-800 bg-slate-900/50 p-4 items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs font-mono text-slate-500">bidwon-terminal // Llama-3-70b-active</div>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Solicitation 47QTCA24Q0012</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-bold">MATCH</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Cloud Infrastructure Services</h4>
                  <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[92%]"></div>
                  </div>
                  <p className="text-xs text-slate-400">Eligibility Score: 92% | NAICS: 541512</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 opacity-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Solicitation W9128F24R0045</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded font-bold">RISK</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Facility Logistics Management</h4>
                  <p className="text-xs text-red-400">Flagged: Past performance requirement not met.</p>
                </div>
              </div>
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 font-mono text-sm text-slate-300 relative">
                <div className="text-blue-400 mb-4">{`> INITIATING RAG VECTOR SEARCH...`}</div>
                <div className="text-green-400 mb-2">{`[SUCCESS] 3 Historical Wins Found.`}</div>
                <div className="text-slate-500 mb-4">{`> Compiling System Prompt via Llama 3-70B...`}</div>
                <div>{`## Executive Summary`}</div>
                <div className="text-slate-400 mt-2">In response to solicitation 47QTCA24Q0012, we propose a scalable, local-first architecture ensuring absolute data sovereignty...</div>
                <div className="absolute bottom-6 right-6">
                  <Lock className="w-5 h-5 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Annual Upfront Focus */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Deploy the Infrastructure.</h2>
          <p className="text-lg text-slate-400">Zero budget growth hacking ends here. Build a real pipeline.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Tactical Tier */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Tactical</h3>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">$1,490</span>
              <span className="text-slate-500 ml-2">/year</span>
              <p className="text-blue-400 text-sm font-bold mt-2">Save $298 vs monthly</p>
            </div>
            <ul className="text-slate-400 space-y-3 mb-8 text-sm">
              <li>• 5 Target NAICS Codes</li>
              <li>• 5 Llama-3-70B Bids / mo</li>
              <li>• Daily SAM.gov Email Alerts</li>
            </ul>
            <Link href={process.env.NEXT_PUBLIC_STRIPE_TACTICAL_ANNUAL || "#"} className="block w-full text-center py-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold border border-slate-700 text-white transition-colors">
              Get Tactical
            </Link>
          </div>

          {/* Strategic Tier */}
          <div className="bg-blue-600 p-8 rounded-2xl border border-blue-500 transform md:-translate-y-4 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-xs font-black uppercase px-4 py-1 rounded-full shadow-md">
              Best for Growth
            </div>
            <h3 className="text-xl font-bold text-white mb-4 mt-2">Strategic</h3>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">$4,970</span>
              <span className="text-blue-100 ml-2">/year</span>
              <p className="text-white text-sm font-bold mt-2">Save $994 vs monthly</p>
            </div>
            <ul className="text-white space-y-3 mb-8 text-sm">
              <li>• 20 Target NAICS Codes</li>
              <li>• 50 Llama-3-70B Bids / mo</li>
              <li>• Historical Vector Vault Access</li>
              <li>• Priority Support</li>
            </ul>
            <Link href={process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_ANNUAL || "#"} className="block w-full text-center py-4 rounded-lg bg-white text-blue-600 font-black shadow-lg hover:bg-slate-100 transition-colors">
              Start Strategic
            </Link>
          </div>

          {/* Sovereign Tier */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Sovereign</h3>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">$24,970</span>
              <span className="text-slate-500 ml-2">/year</span>
              <p className="text-blue-400 text-sm font-bold mt-2">Save $4,994 vs monthly</p>
            </div>
            <ul className="text-slate-400 space-y-3 mb-8 text-sm">
              <li>• Unlimited Bid Packages</li>
              <li>• Agency Dashboard (10 Seats)</li>
              <li>• White-Label Reporting</li>
              <li>• API & Local-First Deployment</li>
            </ul>
            <Link href={process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_ANNUAL || "#"} className="block w-full text-center py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
        
        <p className="text-center text-slate-500 text-sm mt-12">
          All plans include 100% human-in-the-loop compliance. You maintain complete control to review and submit bids manually.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 text-center text-slate-500">
        <p>© 2026 BidWon. Sovereign AI Infrastructure.</p>
      </footer>
    </div>
  );
}