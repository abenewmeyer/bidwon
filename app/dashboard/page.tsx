import { ShieldAlert, CheckCircle, Activity, FileText } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 p-8 font-sans">
      <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Command Center</h1>
          <p className="text-slate-400">Nightly SAM.gov Sync: <span className="text-green-400">Active</span></p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-bold transition-all shadow-lg">
          Force Sync Now
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="text-slate-400 text-sm font-semibold mb-2">New Opportunities</div>
          <div className="text-4xl font-black text-white">12</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="text-slate-400 text-sm font-semibold mb-2">Vector Vault Size</div>
          <div className="text-4xl font-black text-white">68,809</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500">
          <div className="text-slate-400 text-sm font-semibold mb-2">Ready to Draft</div>
          <div className="text-4xl font-black text-white">3</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Scored Opportunities (NAICS: 541512)</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        
        {/* Row 1: High Match */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-blue-400 font-mono text-sm">47QTCA24Q0012</span>
              <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded font-bold border border-green-500/20">92% MATCH</span>
            </div>
            <h3 className="text-lg font-bold text-white">Cloud Infrastructure & Data Sovereignty Architecture</h3>
            <p className="text-sm text-slate-400 mt-1">Due: Oct 15, 2026 | Value: Est. $2.4M</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md border border-slate-700 transition-all">
            <FileText className="w-4 h-4" /> Generate Bid
          </button>
        </div>

        {/* Row 2: Risk Flag */}
        <div className="p-6 flex justify-between items-center hover:bg-slate-800/50 transition-colors opacity-60">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-slate-500 font-mono text-sm">W9128F24R0045</span>
              <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded font-bold border border-red-500/20">HIGH RISK</span>
            </div>
            <h3 className="text-lg font-bold text-slate-300">Enterprise Logistics Software Deployment</h3>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-red-400" /> Top Secret Facility Clearance Required
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}