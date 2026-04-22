"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    company_name: "PEAT Consulting, Inc.",
    uei: "MZGKWS63YNE5",
    naics_codes: "624230, 236118, 236210, 541350, 541611, 541618, 541620, 561110",
    set_asides: "SDVOSBC",
    keywords: "FEMA, disaster, public assistance, individual assistance, recovery, debris, construction management, safety",
    capability_statement: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("company_profiles").select("*").eq("user_id", user.id).single();
    if (data) {
      setProfile({
        company_name: data.company_name || "",
        uei: data.uei || "",
        naics_codes: (data.naics_codes || []).join(", "),
        set_asides: (data.set_asides || []).join(", "),
        keywords: (data.keywords || []).join(", "),
        capability_statement: data.capability_statement || "",
      });
    }
  };

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("company_profiles").upsert({
      user_id: user.id,
      company_name: profile.company_name,
      uei: profile.uei,
      naics_codes: profile.naics_codes.split(",").map(s => s.trim()),
      set_asides: profile.set_asides.split(",").map(s => s.trim()),
      keywords: profile.keywords.split(",").map(s => s.trim()),
      capability_statement: profile.capability_statement,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <Sidebar />
      <main className="main-content">
        <div className="fade-up" style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.25rem" }}>Company Profile</h1>
          <p style={{ color: "var(--slate)", fontSize: "0.9rem" }}>Your certifications and preferences power BidWon daily scans</p>
        </div>

        <div className="card fade-up stagger-1" style={{ padding: "2rem", maxWidth: "700px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { key: "company_name", label: "Company Name", placeholder: "Your company name" },
              { key: "uei", label: "UEI Number", placeholder: "SAM.gov UEI" },
              { key: "naics_codes", label: "NAICS Codes (comma separated)", placeholder: "624230, 236118..." },
              { key: "set_asides", label: "Set-Aside Codes (comma separated)", placeholder: "SDVOSBC, 8A..." },
              { key: "keywords", label: "Search Keywords (comma separated)", placeholder: "FEMA, disaster, recovery..." },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label>{label}</label>
                <input value={(profile as any)[key]} placeholder={placeholder} onChange={e => setProfile({ ...profile, [key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label>Capability Statement</label>
              <textarea rows={5} value={profile.capability_statement}
                placeholder="Paste your capability statement here..."
                onChange={e => setProfile({ ...profile, capability_statement: e.target.value })} />
            </div>
            <button className="btn-primary" onClick={saveProfile} style={{ width: "100%" }}>
              {saved ? "Saved Successfully" : "Save Profile & Enable Daily Scans"}
            </button>
          </div>
        </div>

        <div className="card fade-up stagger-2" style={{ padding: "1.5rem", maxWidth: "700px", marginTop: "1.5rem" }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, marginBottom: "0.75rem" }}>Certifications Detected</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["SDVOSBC", "Minority Owned", "Self-Certified SDB", "HUBZone (Pending)"].map(cert => (
              <span key={cert} className="badge badge-gold">{cert}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
