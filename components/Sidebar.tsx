"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, FileText, User, LogOut, Settings } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Bids", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/profile" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column", padding: "1.5rem 1rem" }}>
      <div style={{ marginBottom: "2.5rem", paddingLeft: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "32px", height: "32px", background: "var(--gold)", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Syne, sans-serif", fontWeight: 800, color: "var(--navy)", fontSize: "0.9rem"
          }}>B</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.25rem" }}>
            Bid<span style={{ color: "var(--gold)" }}>Won</span>
          </span>
        </div>
        <p style={{ color: "var(--slate)", fontSize: "0.7rem", marginTop: "0.25rem", paddingLeft: "0.25rem" }}>
          Contract Discovery AI
        </p>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <button key={label} onClick={() => router.push(href)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.65rem 0.75rem", borderRadius: "8px", border: "none",
              background: active ? "rgba(201,168,76,0.12)" : "transparent",
              color: active ? "var(--gold)" : "var(--slate)",
              cursor: "pointer", fontFamily: "DM Sans, sans-serif",
              fontWeight: active ? 600 : 400, fontSize: "0.9rem",
              textAlign: "left", transition: "all 0.15s", width: "100%",
            }}>
              <Icon size={16} />{label}
            </button>
          );
        })}
      </nav>

      <button onClick={handleLogout} style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        padding: "0.65rem 0.75rem", borderRadius: "8px", border: "none",
        background: "transparent", color: "var(--slate)", cursor: "pointer",
        fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", width: "100%",
      }}>
        <LogOut size={16} />Sign Out
      </button>
    </div>
  );
}
