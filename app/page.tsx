"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setMessage("");
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Check your email to confirm your account, then log in.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 60% 20%, #1a2f50 0%, #0a1628 60%)",
      padding: "2rem"
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{
              width: "40px", height: "40px", background: "var(--gold)", borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Syne, sans-serif", fontWeight: 800, color: "var(--navy)", fontSize: "1.1rem"
            }}>B</div>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "var(--white)" }}>
              Bid<span style={{ color: "var(--gold)" }}>Won</span>
            </span>
          </div>
          <p style={{ color: "var(--slate)", fontSize: "0.9rem" }}>AI-powered contract discovery for certified contractors</p>
        </div>

        <div className="card fade-up stagger-1" style={{ padding: "2rem" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1.5rem" }}>
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
            </div>
            {message && (
              <p style={{ color: message.includes("Check") ? "var(--green)" : "var(--red)", fontSize: "0.85rem" }}>{message}</p>
            )}
            <button className="btn-primary" onClick={handleAuth} disabled={loading} style={{ width: "100%", marginTop: "0.5rem" }}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </div>
          <hr className="divider" />
          <p style={{ textAlign: "center", color: "var(--slate)", fontSize: "0.875rem" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)}
              style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
              {isLogin ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
        <p style={{ textAlign: "center", color: "var(--slate)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          Secure Â· Human-in-the-loop Â· No auto-submission
        </p>
      </div>
    </div>
  );
}
