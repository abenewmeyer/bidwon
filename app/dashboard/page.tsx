"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { Opportunity } from "@/lib/types";
import { RefreshCw, Clock, Trophy, ChevronRight, Zap } from "lucide-react";

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? "var(--green)" : score >= 50 ? "var(--yellow)" : "var(--red)";
  const label = score >= 75 ? "Strong Match" : score >= 50 ? "Possible" : "Weak Match";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{
        width: "42px", height: "42px", borderRadius: "50%",
        border: `2px solid ${color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Syne, sans-serif", fontWeight: 700, color, fontSize: "0.8rem"
      }}>{score}</div>
      <span style={{ color, fontSize: "0.75rem", fontWeight: 600, fontFamily: "Syne, sans-serif" }}>{label}</span>
    </div>
  );
}

function OpportunityCard({ opp, onSelect }: { opp: Opportunity; onSelect: () => void }) {
  const daysLeft = opp.response_deadline
    ? Math.ceil((new Date(opp.response_deadline).getTime() - Date.now()) / 86400000)
    : null;
  return (
    <div className="card fade-up" style={{ padding: "1.5rem", cursor: "pointer" }} onClick={onSelect}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
            <span className="badge badge-gold">{opp.type_of_set_aside || "SDVOSBC"}</span>
            <span className="badge badge-gold">NAICS {opp.naics_code}</span>
            {opp.status === "new" && <span className="badge badge-green">New</span>}
          </div>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", lineHeight: 1.4 }}>
            {opp.title}
          </h3>
          <p style={{ color: "var(--slate)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{opp.agency}</p>
          {opp.ai_summary && (
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", lineHeight: 1.6 }}>{opp.ai_summary}</p>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem", minWidth: "130px" }}>
          {opp.match_score && <ScoreBadge score={opp.match_score} />}
          {daysLeft !== null && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: daysLeft < 7 ? "var(--red)" : "var(--slate)", fontSize: "0.8rem" }}>
              <Clock size={13} />
              {daysLeft < 0 ? "Expired" : `${daysLeft}d left`}
            </div>
          )}
          <ChevronRight size={16} style={{ color: "var(--gold)" }} />
        </div>
      </div>
    </div>
  );
}

function DetailModal({ opp, onClose, onGenerateBid }: { opp: Opportunity; onClose: () => void; onGenerateBid: () => void }) {
  const [activeTab, setActiveTab] = useState<"summary" | "checklist" | "risks">("summary");
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(10,22,40,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
    }} onClick={onClose}>
      <div className="card" style={{ width: "100%", maxWidth: "700px", maxHeight: "85vh", overflow: "auto", padding: "2rem" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.4rem" }}>{opp.title}</h2>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem" }}>{opp.agency}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--slate)", cursor: "pointer", fontSize: "1.5rem" }}>x</button>
        </div>

        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem", background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "0.25rem" }}>
          {(["summary", "checklist", "risks"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: "0.5rem", borderRadius: "6px", border: "none",
              background: activeTab === tab ? "var(--gold)" : "transparent",
              color: activeTab === tab ? "var(--navy)" : "var(--slate)",
              fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.8rem",
              cursor: "pointer", textTransform: "capitalize",
            }}>{tab === "checklist" ? "Eligibility" : tab === "risks" ? "Risk Flags" : "AI Summary"}</button>
          ))}
        </div>

        <div style={{ color: "var(--slate)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem", minHeight: "120px" }}>
          {activeTab === "summary" && (opp.ai_summary || "AI summary not yet generated. Click Generate Bid Package to analyze.")}
          {activeTab === "checklist" && (opp.eligibility_checklist || "SDVOSBC set-aside: matches your certification\nNAICS match: verify against your profile\nPlace of performance: review solicitation")}
          {activeTab === "risks" && (opp.risk_flags || "No major risk flags detected. Always review full solicitation before submitting.")}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn-primary" onClick={onGenerateBid} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <Zap size={16} /> Generate Bid Package
          </button>
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
        <p style={{ color: "var(--slate)", fontSize: "0.72rem", marginTop: "1rem", textAlign: "center" }}>
          AI-generated draft â€” owner must review, certify accuracy, and manually submit on SAM.gov
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [scanning, setScanning] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [bidResult, setBidResult] = useState("");
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "strong" | "new">("all");

  useEffect(() => { loadOpportunities(); }, []);

  const loadOpportunities = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("opportunities").select("*").eq("user_id", user.id).order("match_score", { ascending: false });
    if (data) setOpportunities(data);
    setLastScan(new Date().toLocaleTimeString());
  };

  const runScan = async () => {
    setScanning(true);
    try { await fetch("/api/sam-fetch"); await loadOpportunities(); } catch (e) { console.error(e); }
    setScanning(false);
  };

  const generateBid = async () => {
    if (!selected) return;
    setGenerating(true);
    setBidResult("");
    try {
      const res = await fetch("/api/generate-bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunity: selected }),
      });
      const data = await res.json();
      setBidResult(data.bid_package || "Error generating bid package.");
    } catch (e) { setBidResult("Error connecting to AI. Check your API keys."); }
    setGenerating(false);
  };

  const filtered = opportunities.filter(o => {
    if (filter === "strong") return o.match_score >= 75;
    if (filter === "new") return o.status === "new";
    return true;
  });

  return (
    <div>
      <Sidebar />
      <main className="main-content">
        <div className="fade-up" style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.25rem" }}>Contract Dashboard</h1>
          <p style={{ color: "var(--slate)", fontSize: "0.9rem" }}>{lastScan ? `Last scanned: ${lastScan}` : "Run your first scan to discover opportunities"}</p>
        </div>

        <div className="fade-up stagger-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Found", value: opportunities.length, color: "var(--gold)" },
            { label: "Strong Matches", value: opportunities.filter(o => o.match_score >= 75).length, color: "var(--green)" },
            { label: "New Today", value: opportunities.filter(o => o.status === "new").length, color: "var(--gold)" },
          ].map(({ label, value, color }) => (
            <div key={label} className="card" style={{ padding: "1.25rem" }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color }}>{value}</p>
              <p style={{ color: "var(--slate)", fontSize: "0.8rem" }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="fade-up stagger-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {(["all", "strong", "new"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "0.4rem 1rem", borderRadius: "999px",
                border: `1px solid ${filter === f ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
                background: filter === f ? "rgba(201,168,76,0.12)" : "transparent",
                color: filter === f ? "var(--gold)" : "var(--slate)",
                cursor: "pointer", fontSize: "0.8rem",
                fontFamily: "Syne, sans-serif", fontWeight: 600, textTransform: "capitalize",
              }}>{f === "strong" ? "Strong Matches" : f === "new" ? "New" : "All"}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={runScan} disabled={scanning} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <RefreshCw size={15} />
            {scanning ? "Scanning SAM.gov..." : "Run Manual Scan"}
          </button>
        </div>

        <div className="fade-up stagger-3" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.length === 0 ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <Trophy size={36} style={{ color: "var(--gold)", marginBottom: "1rem", opacity: 0.5 }} />
              <p style={{ color: "var(--slate)", fontFamily: "Syne, sans-serif" }}>No opportunities yet â€” click Run Manual Scan to discover contracts.</p>
            </div>
          ) : (
            filtered.map(opp => <OpportunityCard key={opp.id} opp={opp} onSelect={() => setSelected(opp)} />)
          )}
        </div>

        {bidResult && (
          <div className="card fade-up" style={{ padding: "1.5rem", marginTop: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>AI-Generated Bid Package</h3>
              <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.9rem" }}
                onClick={() => {
                  const blob = new Blob([bidResult], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url; a.download = "BidWon-Draft-Package.txt"; a.click();
                }}>Download Draft</button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", color: "var(--slate)", fontSize: "0.85rem", lineHeight: 1.7 }}>{bidResult}</pre>
            <p style={{ color: "var(--red)", fontSize: "0.75rem", marginTop: "1rem" }}>
              AI-generated draft only. Review carefully and manually submit on SAM.gov.
            </p>
          </div>
        )}
      </main>

      {selected && (
        <DetailModal opp={selected} onClose={() => { setSelected(null); setBidResult(""); }} onGenerateBid={generateBid} />
      )}

      {generating && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.1rem", marginBottom: "0.75rem" }}>Generating your bid package...</div>
          <p style={{ color: "var(--slate)", fontSize: "0.85rem" }}>Claude AI is reading the full solicitation</p>
        </div>
      )}
    </div>
  );
}
