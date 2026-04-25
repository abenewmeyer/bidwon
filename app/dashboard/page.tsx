import { FileText, Target, Activity, CheckCircle, Database } from 'lucide-react';

export default function Dashboard() {
  // Mock data representing the output of your vector search / RAG engine
  const activeOpportunities = [
    { id: 'SAM-2026-8921', agency: 'Department of Defense', title: 'AI Infrastructure Maintenance', score: 98, value: '$4.2M', status: 'Drafting Bid' },
    { id: 'SAM-2026-4432', agency: 'Department of Energy', title: 'Data Center HVAC Upgrades', score: 94, value: '$1.8M', status: 'Ready for Review' },
    { id: 'SAM-2026-1198', agency: 'Veterans Affairs', title: 'Secure Cloud Migration', score: 88, value: '$850K', status: 'Matched' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Dashboard Top Nav */}
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-4">
            <span className="text-xl font-bold text-white tracking-tight">BidWon <span className="text-indigo-400 text-sm font-medium ml-2">Command Center</span></span>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2 text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <Activity className="h-3 w-3" /> System Operational
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              TX
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <div className="flex items-center gap-x-3 text-slate-400 mb-2">
              <Target className="h-5 w-5 text-indigo-400" />
              <h3 className="text-sm font-medium">Scored Opportunities</h3>
            </div>
            <p className="text-3xl font-bold text-white">1,204</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 14 synced today via Cron</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <div className="flex items-center gap-x-3 text-slate-400 mb-2">
              <FileText className="h-5 w-5 text-indigo-400" />
              <h3 className="text-sm font-medium">Active AI Bids</h3>
            </div>
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-xs text-slate-500 mt-2">3 pending manual review</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <div className="flex items-center gap-x-3 text-slate-400 mb-2">
              <Database className="h-5 w-5 text-indigo-400" />
              <h3 className="text-sm font-medium">Vector Vault Status</h3>
            </div>
            <p className="text-3xl font-bold text-white">Active</p>
            <p className="text-xs text-slate-500 mt-2">PgVector connection stable</p>
          </div>
        </div>

        {/* Action Engine Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-sm">
          <div className="border-b border-slate-800 px-6 py-5 flex justify-between items-center">
            <h2 className="text-base font-semibold leading-6 text-white">High-Probability SAM.gov Matches</h2>
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold py-2 px-4 rounded-md transition-colors">
              Force Sync Database
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900">
                <tr>
                  <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Opportunity ID</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Agency</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Vector Score</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Est. Value</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/30">
                {activeOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-white">{opp.id}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">
                      <div className="font-medium">{opp.agency}</div>
                      <div className="text-xs text-slate-500">{opp.title}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-800 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${opp.score}%` }}></div>
                        </div>
                        <span className="text-emerald-400 font-medium">{opp.score}%</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{opp.value}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        opp.status === 'Drafting Bid' ? 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/30' :
                        opp.status === 'Ready for Review' ? 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/30' :
                        'bg-slate-400/10 text-slate-400 ring-slate-400/30'
                      }`}>
                        {opp.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Generate Bid<span className="sr-only">, {opp.id}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}