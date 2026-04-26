"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ChevronRight,
  CheckCircle2,
  Play,
  ArrowRight,
  ShieldCheck,
  FileText,
} from "lucide-react";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedNaics, setSelectedNaics] = useState<string[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoResults, setDemoResults] = useState<any>(null);
  const [showBlur, setShowBlur] = useState(false);

  const popularNaics = [
    { code: "624230", desc: "Emergency and Other Relief Services" },
    { code: "236220", desc: "Commercial & Institutional Building Construction" },
    { code: "541330", desc: "Engineering Services" },
    { code: "562910", desc: "Remediation Services" },
    { code: "541611", desc: "Administrative Management Consulting" },
    { code: "561210", desc: "Facilities Support Services" },
  ];

  const toggleNaics = (code: string) => {
    if (selectedNaics.includes(code)) {
      setSelectedNaics(selectedNaics.filter((c) => c !== code));
    } else if (selectedNaics.length < 5) {
      setSelectedNaics([...selectedNaics, code]);
    }
  };

  const runDemo = () => {
    if (selectedNaics.length === 0) return;
    setIsDemoRunning(true);

    setTimeout(() => {
      setDemoResults({
        opportunities: [
          {
            title:
              "Public Assistance Technical Assistance and Consulting Services",
            agency: "Federal Emergency Management Agency (FEMA)",
            deadline: "May 28, 2026",
            score: 93,
            summary:
              "Excellent match for your selected NAICS codes. Strong set-aside eligibility.",
            checklist:
              "SDVOSB/HUBZone eligible • Flexible place of performance",
          },
          {
            title:
              "Disaster Recovery Construction Management & Safety Oversight",
            agency: "U.S. Army Corps of Engineers",
            deadline: "June 4, 2026",
            score: 89,
            summary:
              "High-potential opportunity matching your construction and safety capabilities.",
            checklist:
              "Minority-owned preference noted • Tight timeline flagged",
          },
        ],
      });
      setIsDemoRunning(false);
      setTimeout(() => setShowBlur(true), 2800);
    }, 1600);
  };

  const tiers = [
    {
      name: "Tactical",
      monthlyPrice: "$149",
      annualPrice: "$1,490",
      description:
        "Daily SAM.gov sync (5 NAICS), 15 Scored Opps, 5 AI Bids/mo.",
      monthlyHref:
        process.env.NEXT_PUBLIC_STRIPE_TACTICAL_MONTHLY_URL || "#",
      annualHref:
        process.env.NEXT_PUBLIC_STRIPE_TACTICAL_ANNUAL_URL || "#",
      features: [
        "Daily SAM.gov sync",
        "Up to 5 NAICS codes",
        "15 Scored Opportunities per month",
        "5 AI-Drafted Bids per month",
      ],
      popular: false,
    },
    {
      name: "Strategic",
      monthlyPrice: "$497",
      annualPrice: "$4,970",
      description:
        "25 NAICS codes, 100 Scored Opps, 25 AI Bids/mo + Vector Vault.",
      monthlyHref:
        process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_MONTHLY_URL || "#",
      annualHref:
        process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_ANNUAL_URL || "#",
      features: [
        "Advanced SAM.gov sync",
        "Up to 25 NAICS codes",
        "100 Scored Opportunities per month",
        "25 AI-Drafted Bids per month",
        "Private Vector Vault",
      ],
      popular: true,
    },
    {
      name: "Sovereign (Enterprise)",
      monthlyPrice: "$2,497",
      annualPrice: "$24,970",
      description:
        "Unlimited Bids, Agency Dashboard, Priority AI Model Processing.",
      monthlyHref:
        process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_MONTHLY_URL || "#",
      annualHref:
        process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_ANNUAL_URL || "#",
      features: [
        "Unlimited AI-Drafted Bids",
        "Agency Dashboard (10 Sub-users)",
        "Full API Access",
        "Priority AI Model Processing",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex lg:flex-1">
          <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            BidWon.
          </span>
        </div>
        <Link
          href="/login"
          className="text-sm font-semibold text-slate-300 hover:text-white"
        >
          Client Login
        </Link>
      </nav>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-24 text-center">
          <h1 className="text-5xl font-extrabold text-white sm:text-7xl mb-8">
            Stop Guessing.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Start Winning Govt Contracts.
            </span>
          </h1>

          <div className="mt-10 flex justify-center gap-x-6">
            <a
              href="#pricing"
              className="bg-emerald-500 px-8 py-4 text-white rounded-md"
            >
              View Pricing
            </a>
            <a
              href="#demo"
              className="flex items-center text-white font-semibold"
            >
              View Live Demo
              <ChevronRight className="ml-1 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div id="demo" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={runDemo}
            className="w-full bg-emerald-500 py-5 rounded-3xl text-white flex justify-center gap-3"
          >
            {isDemoRunning ? "Searching SAM.gov..." : "Run Demo"}
            <Play className="w-6 h-6" />
          </button>

          {demoResults && (
            <div className="mt-10 space-y-6">
              {demoResults.opportunities.map((opp: any, index: number) => (
                <div
                  key={index}
                  className="bg-slate-900 p-6 rounded-2xl relative"
                >
                  {showBlur && index >= 1 && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-2xl">
                      <Link
                        href="/login"
                        className="bg-emerald-500 px-6 py-3 text-white rounded-xl flex items-center gap-2"
                      >
                        Unlock Full Results
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold">{opp.title}</h3>
                  <p className="text-slate-400">
                    {opp.agency} • {opp.deadline}
                  </p>

                  <div className="mt-4 text-emerald-400 text-3xl font-bold">
                    {opp.score}
                  </div>

                  <div className="mt-4 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      {opp.checklist}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      Bid Ready
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}