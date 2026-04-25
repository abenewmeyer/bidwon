'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpps = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('opportunities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOpportunities(data || []);
      setLoading(false);
    };
    fetchOpps();
  }, []);

  if (loading) return <div className="p-12 text-white">Loading your opportunities...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8">Your Opportunities</h1>
      {opportunities.length === 0 ? (
        <p>No opportunities yet. Your daily scan will populate this dashboard.</p>
      ) : (
        <div className="grid gap-6">
          {opportunities.map((opp) => (
            <div key={opp.notice_id} className="bg-slate-800 p-6 rounded-3xl">
              <h3 className="text-xl font-semibold">{opp.title}</h3>
              <p className="text-slate-400">{opp.agency} • Deadline: {opp.response_deadline}</p>
              {opp.match_score && <p className="text-emerald-400 font-medium mt-2">Match Score: {opp.match_score}/100</p>}
              {opp.ai_summary && <p className="mt-4 text-slate-300">{opp.ai_summary}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}