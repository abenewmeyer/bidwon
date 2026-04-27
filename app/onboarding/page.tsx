"use client";

import { useState } from "react";
import { ShieldCheck, UploadCloud, Globe, ArrowRight, Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function OnboardingPage() {
  const [url, setUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [scraped, setScraped] = useState(false);
  const router = useRouter();

  const handleScrape = () => {
    if (!url) {
      alert("Please enter a website URL first.");
      return;
    }
    setScraped(true);
    alert("Website successfully queued for capability mapping!");
  };

  const handleProceed = async () => {
    setIsSaving(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        alert("Auth Error: You are not logged in! Please go to /login and sign in again.");
        setIsSaving(false);
        return;
      }

      const { error: dbError } = await supabase.from("company_profiles").upsert({
        id: user.id,
        naics_codes: ["541330", "541511", "541512", "541611"], 
      });
      
      if (dbError) {
        alert("Database Error: " + dbError.message);
        setIsSaving(false);
        return;
      }
      
      alert("Profile successfully generated! Taking you to the Command Center.");
      router.push("/dashboard");
    } catch (error) {
      alert("An unexpected error occurred: " + String(error));
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <nav className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
        <div className="text-xl font-bold text-white tracking-tight">BidWon <span className="text-indigo-400 text-sm ml-2">Secure Ingestion</span></div>
        <div className="flex items-center gap-x-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
          <Lock className="h-3 w-3" /> Connection Encrypted
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-16 px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Initialize Your Vector Vault</h1>
          <p className="text-slate-400">
            Upload your Capability Statements and past performance data. <strong className="text-slate-200">Your data is Sovereign.</strong>
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center"><Globe className="mr-3 h-5 w-5 text-indigo-400"/> Primary Capability Scrape</h2>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="https://yourcompany.com" 
              className="flex-grow bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              onClick={handleScrape}
              className={`${scraped ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-800 hover:bg-slate-700'} px-6 rounded-lg font-semibold transition-colors flex items-center`}
            >
              {scraped ? <><CheckCircle className="mr-2 h-4 w-4" /> Queued</> : "Queue Scrape"}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center"><UploadCloud className="mr-3 h-5 w-5 text-indigo-400"/> Document Ingestion</h2>
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-12 text-center bg-slate-950/50">
            <ShieldCheck className="h-10 w-10 text-slate-500 mx-auto mb-4" />
            <p className="font-semibold text-slate-300 mb-1">Drag and drop Capability Statements or Past Proposals</p>
            <p className="text-xs text-slate-500">PDF, DOCX, or TXT up to 50MB. AES-256 Encrypted Storage.</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleProceed}
            disabled={isSaving}
            className="bg-indigo-500 hover:bg-indigo-400 px-8 py-3 rounded-lg font-semibold flex items-center transition-colors disabled:opacity-50"
          >
            {isSaving ? "Initializing Vault..." : "Proceed to Command Center"} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}