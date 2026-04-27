"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RefreshCw, LogOut, ExternalLink } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkAndLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      // Not logged in — send to login page
      if (!session) {
        router.replace("/login");
        return;
      }

      fetchOpportunities(session.user.id);
    };

    checkAndLoad();
  }, []);

  // ── Fetch opportunities ────────────────────────────────────────────────────
  const fetchOpportunities = async (userId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from("opportunities")
      .select("*")
      .eq("user_id", userId)
      .order("match_score", { ascending: false });

    setOpportunities(data || []);
    setLoading(false);
  };

  // ── Manual SAM.gov sync ────────────────────────────────────────────────────
  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setSyncResult("Not authenticated.");
      setSyncing(false);
      return;
    }

    try {
      const res = await fetch("/api/sam-fetch", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = await res.json();

      if (data.success) {
        setSyncResult(`✓ Synced ${data.upserted} opportunities across ${data.naics_scanned?.length} NAICS codes.`);
        fetchOpportunities(session.user.id); // reload the list
      } else {
        setSyncResult(`Error: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setSyncResult(`Error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  // ── Sign out ───────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  // ── Score colour ───────────────────────────────────────────────────────────
  const scoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-slate-400";
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-slate-600 border-t-indigo-400 rounded-full animate-spin" />
          Loading your opportunities…
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          BidWon.
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 text-sm bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800 disabled:cursor-wait px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing…" : "Sync Now"}
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-1">Your Opportunities</h1>
            <p className="text-slate-400 text-sm">
              Ranked by win probability · Updated daily from SAM.gov
            </p>
          </div>
        </div>

        {/* Sync result banner */}
        {syncResult && (
          <div className={`mb-6 px-5 py-4 rounded-xl text-sm border ${
            syncResult.startsWith("✓")
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
              : "bg-red-950/40 border-red-800 text-red-300"
          }`}>
            {syncResult}
          </div>
        )}

        {/* Empty state */}
        {opportunities.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-slate-400 mb-6">
              No opportunities yet. Click <strong className="text-white">Sync Now</strong> to pull the latest SAM.gov matches for your NAICS codes.
            </p>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              {syncing ? "Syncing…" : "Run First Sync →"}
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {opportunities.map((opp) => (
              <div
                key={opp.notice_id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-600 p-6 rounded-2xl transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white leading-snug mb-1">
                      {opp.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {opp.agency}
                      {opp.response_deadline && (
                        <> · Deadline: {new Date(opp.response_deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</>
                      )}
                      {opp.naics_code && <> · NAICS {opp.naics_code}</>}
                    </p>
                    {opp.type_of_set_aside && (
                      <span className="inline-block mt-2 text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full">
                        {opp.type_of_set_aside}
                      </span>
                    )}
                    {opp.ai_summary && (
                      <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                        {opp.ai_summary}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-3 flex-shrink-0">
                    {opp.match_score && (
                      <div className="text-center">
                        <div className={`text-3xl font-black ${scoreColor(opp.match_score)}`}>
                          {opp.match_score}
                        </div>
                        <div className="text-slate-500 text-xs">win score</div>
                      </div>
                    )}
                    <a
                      href={`https://sam.gov/opp/${opp.notice_id}/view`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      SAM.gov
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}