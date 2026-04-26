"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ChevronRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Tactical",
      monthlyPrice: "$149",
      annualPrice: "$1,490",
      description: "Consistently identify and act on qualified opportunities.",
      features: [
        "Daily matched opportunities from SAM.gov",
        "Up to 5 NAICS codes tracked",
        "15 high-fit opportunities scored monthly",
        "Up to 5 fully compliant AI-drafted bids/month",
      ],
      popular: false,
    },
    {
      name: "Strategic",
      monthlyPrice: "$497",
      annualPrice: "$4,970",
      description: "Scale bid volume and increase win probability.",
      features: [
        "Advanced opportunity matching across 25 NAICS codes",
        "100 scored, high-probability opportunities monthly",
        "Up to 25 fully compliant AI-drafted bids/month",
        "Private knowledge vault trained on your past wins",
      ],
      popular: true,
    },
    {
      name: "Sovereign",
      monthlyPrice: "$2,497",
      annualPrice: "$24,970",
      description: "Operate a fully automated, high-volume contract pipeline.",
      features: [
        "Unlimited AI-drafted compliant bids",
        "Real-time agency opportunity dashboard",
        "Multi-user team access (10 seats)",
        "Priority processing with highest-speed AI models",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">

      {/* NAV */}
      <nav className="flex items-center justify-between p-6 border-b border-slate-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          BidWon
        </div>
        <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">
          Client Login
        </Link>
      </nav>

      {/* HERO */}
      <section className="px-6 py-24 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <div className="inline-flex items-center px-3 py-1 text-sm text-indigo-300 bg-indigo-500/10 rounded-full mb-6">
            Live SAM.gov Data • Updated Daily
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Win More Government Contracts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Without Manual Search or Proposal Writing
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-8">
            BidWon automatically finds, qualifies, and drafts compliant bids for active
            SAM.gov opportunities based on your capabilities—so you can increase
            submission volume and win rate without increasing workload.
          </p>

          {/* PRIMARY CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/api/checkout?plan=Strategic&interval=year"
              className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-md font-semibold text-center"
            >
              Start Winning Contracts
            </Link>

            <Link
              href="#how"
              className="flex items-center justify-center text-white"
            >
              See How It Works
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Takes less than 2 minutes • No setup required • 14-day risk-free access
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-4">
            Example Matched Opportunity
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-slate-800 rounded-lg">
              <div className="font-semibold">Federal IT Services Contract</div>
              <div className="text-sm text-slate-400">Match Score: 92%</div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg">
              <div className="font-semibold">Cybersecurity Support RFP</div>
              <div className="text-sm text-slate-400">Match Score: 87%</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-6 py-16 border-t border-slate-800 text-center">
        <p className="text-slate-400 mb-6">
          Trusted by contractors scaling federal revenue pipelines
        </p>

        <div className="flex justify-center gap-10 text-slate-500 text-sm mb-10">
          <span>IT Services</span>
          <span>Defense</span>
          <span>Healthcare</span>
          <span>Logistics</span>
        </div>

        <div className="max-w-3xl mx-auto text-lg text-slate-300">
          “BidWon replaced over 20 hours per week of manual opportunity search and
          increased our bid submissions by more than 4x within the first month.”
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div>
            <div className="text-indigo-400 font-semibold mb-2">1. Connect</div>
            <p className="text-slate-400">
              Input your NAICS codes and core capabilities in minutes.
            </p>
          </div>

          <div>
            <div className="text-indigo-400 font-semibold mb-2">2. Analyze</div>
            <p className="text-slate-400">
              BidWon scans and scores live SAM.gov opportunities for best fit.
            </p>
          </div>

          <div>
            <div className="text-indigo-400 font-semibold mb-2">3. Execute</div>
            <p className="text-slate-400">
              Instantly generate compliant, submission-ready proposals.
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="px-6 py-24 bg-slate-900 border-t border-slate-800 text-center">
        <h2 className="text-4xl font-bold mb-12">Why BidWon</h2>

        <div className="grid md:grid-cols-3 gap-10 text-left max-w-5xl mx-auto">
          <div>
            <h3 className="font-semibold mb-2">Manual Search</h3>
            <p className="text-slate-400">Time-consuming and inconsistent</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Generic AI Tools</h3>
            <p className="text-slate-400">Lack compliance and targeting</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-indigo-400">BidWon</h3>
            <p className="text-slate-400">
              Fully automated, compliant, opportunity-to-bid system
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Select Your Deployment Tier</h2>
          <p className="text-slate-400">
            One successful contract can cover years of BidWon.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-900 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full ${!isAnnual ? "bg-indigo-500" : ""}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full ${isAnnual ? "bg-indigo-500" : ""}`}
            >
              Annually
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 rounded-2xl border ${
                tier.popular
                  ? "border-indigo-500 bg-slate-800 scale-105"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>

              <p className="text-slate-400 mb-4">{tier.description}</p>

              <div className="text-4xl font-bold mb-6">
                {isAnnual ? tier.annualPrice : tier.monthlyPrice}
              </div>

              <Link
                href={`/api/checkout?plan=${tier.name}&interval=${
                  isAnnual ? "year" : "month"
                }`}
                className="block bg-indigo-500 hover:bg-indigo-400 text-center py-3 rounded-md font-semibold"
              >
                Start Winning Contracts
              </Link>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          14-day risk-free access. Cancel anytime.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-6">
          Start Winning More Contracts Today
        </h2>

        <Link
          href="/api/checkout?plan=Strategic&interval=year"
          className="bg-indigo-500 hover:bg-indigo-400 px-8 py-4 rounded-md font-semibold"
        >
          Get Matched Opportunities Now
        </Link>
      </section>

    </div>
  );
}