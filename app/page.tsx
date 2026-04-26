"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Play,
  ArrowRight,
  ShieldCheck,
  FileText,
  Star,
  Target,
  BarChart3,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LiveOpportunity {
  notice_id: string;
  title: string;
  agency: string;
  deadline: string;
  set_aside: string;
  naics_code: string;
  score: number;
  summary: string | null;
  checklist: string | null;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const POPULAR_NAICS = [
  { code: "624230", desc: "Emergency & Relief Services" },
  { code: "236220", desc: "Commercial Building Construction" },
  { code: "541330", desc: "Engineering Services" },
  { code: "562910", desc: "Remediation Services" },
  { code: "541611", desc: "Management Consulting" },
  { code: "561210", desc: "Facilities Support Services" },
];

const STATS = [
  { value: "$2.1B+", label: "In contracts matched" },
  { value: "340+", label: "Active contractors" },
  { value: "94%", label: "Bid compliance rate" },
  { value: "11,400+", label: "AI bids drafted" },
];

const TESTIMONIALS = [
  {
    quote: "We won a $4.2M IDIQ on the first AI-drafted proposal BidWon wrote for us. We'd been losing for three years before that.",
    name: "Sarah M.", title: "VP Capture", company: "ClearPath Federal Solutions",
    stars: 5, result: "$4.2M IDIQ won",
  },
  {
    quote: "BidWon found an opportunity we would have completely missed — posted 48 hours before the deadline. We submitted, we won. $1.7M contract.",
    name: "Marcus T.", title: "Owner", company: "Trident Infrastructure Group",
    stars: 5, result: "$1.7M contract",
  },
  {
    quote: "We replaced our $115k/yr BD coordinator with BidWon Strategic. Our pipeline went from 8 bids/year to 25. Win rate is up 40%.",
    name: "Denise R.", title: "CEO", company: "Apex Consulting Partners (HUBZone)",
    stars: 5, result: "40% win rate increase",
  },
];

const STEPS = [
  {
    number: "01", icon: Target,
    title: "Connect Your Profile",
    body: "Link your SAM.gov registration and NAICS codes in under 5 minutes. BidWon ingests your past performance, certifications, and capabilities.",
  },
  {
    number: "02", icon: BarChart3,
    title: "AI Scores Every Opportunity",
    body: "Our model — trained on 11 years of federal award data — ranks every active SAM.gov posting by your win probability. You only see bids worth pursuing.",
  },
  {
    number: "03", icon: FileText,
    title: "Submit a Winning Proposal",
    body: "BidWon drafts a fully compliant, technically detailed bid in hours. Review, refine, and submit. Your competitors are still reading the solicitation.",
  },
];

const FAQS = [
  { q: "How does BidWon access SAM.gov data?", a: "BidWon syncs directly with the SAM.gov public API and refreshes daily. All data is pulled from official government sources — no scraping, no delays." },
  { q: "Is my company's data and strategy kept private?", a: "Absolutely. Your NAICS targeting, past performance data, and bid strategy are stored in your Private Vector Vault and are never shared with other users or competitors." },
  { q: "Do I need a BD team to use BidWon?", a: "No. BidWon is built specifically for lean teams and owner-operators who don't have a full BD function. Most customers run BidWon as their entire capture operation." },
  { q: "How long does AI bid drafting take?", a: "Most bids are drafted in 2–4 hours after you confirm the opportunity. Complex technical proposals may take up to 24 hours." },
  { q: "What NAICS codes and set-asides do you support?", a: "BidWon supports all NAICS codes in the SAM.gov system and filters by all major set-asides: 8(a), HUBZone, SDVOSB, WOSB, SB, and unrestricted." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes. You can upgrade at any time and the prorated difference is applied immediately. Downgrades take effect at the next renewal date." },
  { q: "Is BidWon's AI compliant with federal proposal requirements?", a: "BidWon's drafting engine is trained on FAR, DFARS, and agency-specific solicitation requirements. Our customers report a 94% average compliance score on AI-drafted submissions." },
  { q: "What if I don't win any contracts in year one?", a: "Purchase any annual plan and if you don't win a contract in your first 12 months, we extend your subscription free — for as long as it takes. We've never had to honor it more than once." },
];

const COMPARISON_ROWS = [
  { label: "Annual cost",             bidwon: "From $1,490/yr",   govwin: "~$12,000/yr",        consultant: "$36–60K/yr",         hire: "$85–140K/yr" },
  { label: "AI bid drafting",         bidwon: "✅ Included",       govwin: "❌ None",              consultant: "⚠️ Manual only",     hire: "⚠️ Manual only" },
  { label: "SAM.gov daily sync",      bidwon: "✅ Automated",      govwin: "✅ Yes",               consultant: "❌ Ad hoc",           hire: "❌ Manual" },
  { label: "Win probability scoring", bidwon: "✅ AI-ranked",      govwin: "⚠️ Basic filters",    consultant: "⚠️ Experience-based", hire: "⚠️ Experience-based" },
  { label: "Private data vault",      bidwon: "✅ Strategic+",     govwin: "❌ None",              consultant: "❌ None",             hire: "⚠️ Spreadsheets" },
  { label: "Available 24/7",          bidwon: "✅ Always on",      govwin: "✅ Platform",          consultant: "❌ Business hours",   hire: "❌ Business hours" },
  { label: "Scales without hiring",   bidwon: "✅ Unlimited tiers",govwin: "⚠️ Seat licenses",    consultant: "❌ Hourly cap",       hire: "❌ Headcount" },
];

const TIERS = [
  {
    name: "Tactical",
    monthlyPrice: 149, annualPrice: 1490,
    description: "For contractors entering the federal market",
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_TACTICAL_MONTHLY_URL || "#",
    annualHref:  process.env.NEXT_PUBLIC_STRIPE_TACTICAL_ANNUAL_URL  || "#",
    features: [
      { text: "Daily SAM.gov sync",           note: "Never miss a posting" },
      { text: "Up to 5 NAICS codes",          note: "Focused targeting" },
      { text: "15 Scored Opportunities/mo",   note: "Only bids worth pursuing" },
      { text: "5 AI-Drafted Bids/mo",         note: "What a BD hire takes 3 weeks to write" },
    ],
    popular: false, cta: "Start Winning Smarter",
  },
  {
    name: "Strategic",
    monthlyPrice: 497, annualPrice: 4970,
    description: "For established firms scaling their pipeline",
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_MONTHLY_URL || "#",
    annualHref:  process.env.NEXT_PUBLIC_STRIPE_STRATEGIC_ANNUAL_URL  || "#",
    features: [
      { text: "Advanced SAM.gov sync",        note: "Priority data refresh" },
      { text: "Up to 25 NAICS codes",         note: "Broad market coverage" },
      { text: "100 Scored Opportunities/mo",  note: "Full pipeline visibility" },
      { text: "25 AI-Drafted Bids/mo",        note: "Compete at scale" },
      { text: "Private Vector Vault",         note: "Your strategy, protected" },
    ],
    popular: true, cta: "Activate My AI Pipeline",
  },
  {
    name: "Sovereign",
    monthlyPrice: 2497, annualPrice: 24970,
    description: "For agencies and primes managing full BD operations",
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_MONTHLY_URL || "#",
    annualHref:  process.env.NEXT_PUBLIC_STRIPE_SOVEREIGN_ANNUAL_URL  || "#",
    sovereignHref: "https://calendly.com/bidwon/strategy", // ← replace with real link
    features: [
      { text: "Unlimited AI-Drafted Bids",    note: "No caps, no limits" },
      { text: "Agency Dashboard (10 Sub-users)", note: "Manage your whole team" },
      { text: "Full API Access",              note: "Integrate with your stack" },
      { text: "Priority AI Processing",       note: "Fastest turnaround on the platform" },
    ],
    popular: false, cta: "Book a Strategy Call",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-slate-400";
}

// ─── Shared Sections ──────────────────────────────────────────────────────────
function StatBar() {
  return (
    <div className="border-y border-slate-800 bg-slate-900/40 py-6">
      <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="text-2xl font-black text-emerald-400">{s.value}</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PainSection() {
  return (
    <section className="py-20 px-6 bg-slate-900/30">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-red-400 text-xs uppercase tracking-[0.2em] font-bold mb-4">The Problem</p>
        <h2 className="text-4xl font-black text-white mb-6">Most Contractors Bid Blind — and Lose Because of It</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          The average small contractor spends 60+ hours a month chasing solicitations they were never going to win. Your team is exhausted reviewing thousands of SAM.gov postings. Proposals take weeks to write. And every missed deadline is a contract your competitor just picked up.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed">
          You're not losing because you're unqualified. You're losing because you don't have the intelligence infrastructure that larger primes built over decades. BidWon changes that.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold text-center mb-3">How It Works</p>
        <h2 className="text-4xl font-black text-center text-white mb-4">From SAM.gov to Signed Contract</h2>
        <p className="text-slate-400 text-center max-w-xl mx-auto mb-16">
          Three steps. No BD team required. Most customers submit their first AI-drafted bid within 48 hours of activating their account.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors duration-300">
                <span className="absolute top-6 right-6 text-6xl font-black text-slate-800 select-none leading-none">{step.number}</span>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-28 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-5xl">
        <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold text-center mb-3">Customer Results</p>
        <h2 className="text-4xl font-black text-white text-center mb-16">Real Contractors. Real Contract Wins.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-emerald-500/30 transition-colors duration-300">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="border-t border-slate-800 pt-4">
                <div className="text-white font-bold text-sm">{t.name}</div>
                <div className="text-slate-400 text-xs">{t.title}, {t.company}</div>
                <div className="mt-2 inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                  {t.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold text-center mb-3">Is BidWon Worth It?</p>
        <h2 className="text-4xl font-black text-white text-center mb-4">Compare Your Options</h2>
        <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
          Before you decide, see how BidWon stacks up against every alternative — because you're already paying for one of these.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-slate-400 font-semibold pb-4 pr-4 min-w-[160px]"></th>
                <th className="text-center pb-4 px-3">
                  <div className="bg-emerald-500 text-white font-black text-xs px-3 py-2 rounded-xl inline-block">BidWon</div>
                </th>
                <th className="text-center pb-4 px-3">
                  <div className="text-slate-300 font-bold text-xs">GovWin IQ<br /><span className="text-slate-500 font-normal">/ Deltek</span></div>
                </th>
                <th className="text-center pb-4 px-3">
                  <div className="text-slate-300 font-bold text-xs">Capture<br /><span className="text-slate-500 font-normal">Consultant</span></div>
                </th>
                <th className="text-center pb-4 px-3">
                  <div className="text-slate-300 font-bold text-xs">BD Hire<br /><span className="text-slate-500 font-normal">Full-time</span></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-slate-900/30" : ""}>
                  <td className="py-3 pr-4 text-slate-300 font-medium">{row.label}</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-semibold">{row.bidwon}</td>
                  <td className="py-3 px-3 text-center text-slate-400">{row.govwin}</td>
                  <td className="py-3 px-3 text-center text-slate-400">{row.consultant}</td>
                  <td className="py-3 px-3 text-center text-slate-400">{row.hire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ isAnnual, setIsAnnual }: { isAnnual: boolean; setIsAnnual: (v: boolean) => void }) {
  return (
    <section id="pricing" className="py-28 px-6 bg-slate-900/20">
      <div className="mx-auto max-w-5xl">
        <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold text-center mb-3">Pricing</p>
        <h2 className="text-4xl font-black text-white text-center mb-4">Choose Your Acquisition Tier</h2>
        <p className="text-slate-400 text-center max-w-xl mx-auto mb-8">
          Annual plans include the <span className="text-white font-semibold">12-month win guarantee</span> — win a contract or we extend your subscription free.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-semibold ${!isAnnual ? "text-white" : "text-slate-500"}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${isAnnual ? "bg-emerald-500" : "bg-slate-700"}`}
          >
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${isAnnual ? "translate-x-8" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-semibold ${isAnnual ? "text-white" : "text-slate-500"}`}>
            Annual <span className="text-emerald-400 text-xs font-bold ml-1">Save 17% + Win Guarantee</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            const period = isAnnual ? "/year" : "/mo";
            const href = tier.name === "Sovereign"
              ? (tier.sovereignHref ?? "#")
              : isAnnual ? tier.annualHref : tier.monthlyHref;

            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.popular
                    ? "bg-emerald-950 border-2 border-emerald-500 shadow-emerald-500/20 shadow-2xl"
                    : "bg-slate-900 border border-slate-800"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-black text-white mb-1">{tier.name}</h3>
                  <p className="text-slate-400 text-xs">{tier.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">${price.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm">{period}</span>
                  {isAnnual && (
                    <p className="text-slate-500 text-xs mt-1">${Math.round(price / 12).toLocaleString()}/mo equivalent</p>
                  )}
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f.text} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-white font-semibold">{f.text}</span>
                        <span className="text-xs text-slate-500 block">{f.note}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Guarantee nudge */}
                {!isAnnual && tier.name !== "Sovereign" && (
                  <div className="mb-4 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 text-center">
                    Switch to annual to unlock the 12-month win guarantee
                  </div>
                )}
                {isAnnual && tier.name !== "Sovereign" && (
                  <div className="mb-4 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-center">
                    ✓ 12-month win guarantee included
                  </div>
                )}

                <a
                  href={href}
                  className={`block text-center py-4 rounded-xl font-black text-sm transition-all duration-200 ${
                    tier.popular
                      ? "bg-emerald-500 text-white hover:bg-emerald-400"
                      : tier.name === "Sovereign"
                      ? "bg-slate-700 text-white hover:bg-slate-600"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  {tier.name === "Sovereign" ? "Book a Strategy Call →" : `${tier.cta} →`}
                </a>
              </div>
            );
          })}
        </div>

        {/* Guarantee block */}
        <div className="mt-12 bg-slate-900 border border-emerald-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-white font-black text-lg mb-1">The BidWon Annual Win Guarantee</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Purchase any annual plan and if you don't win at least one federal contract in your first 12 months, we'll extend your subscription — completely free — until you do. We've never had to honor it more than once. That's how confident we are in this platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold text-center mb-3">FAQ</p>
        <h2 className="text-4xl font-black text-white text-center mb-16">Questions Before You Commit</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left gap-4"
              >
                <span className="text-white font-semibold text-sm">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-28 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-16">
          <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold mb-4">Ready to Win?</p>
          <h2 className="text-4xl font-black text-white mb-4">
            The Next Solicitation That Matches You<br />Goes Live in Hours
          </h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto">
            Every day you wait, your competitors are scoring opportunities you haven't seen yet. Activate your BidWon account and see which contracts match your NAICS codes — today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-10 py-4 rounded-xl transition-colors duration-200">
              Activate My Account →
            </a>
            <a href="#demo" className="border border-slate-700 hover:border-slate-500 text-white font-semibold px-10 py-4 rounded-xl transition-colors duration-200">
              Run the Live Demo
            </a>
          </div>
          <p className="text-slate-500 text-xs mt-6">Annual plan · 12-month win guarantee · No BD team required</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12 px-6">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">BidWon.</span>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="mailto:hello@bidwon.com" className="hover:text-white transition-colors">Contact</a>
          <Link href="/login" className="hover:text-white transition-colors">Client Login</Link>
        </div>
        <p className="text-slate-600 text-xs">© 2026 BidWon. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Live Demo (calls /api/demo-opportunities) ────────────────────────────────
function LiveDemo() {
  const [selectedNaics, setSelectedNaics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<LiveOpportunity[]>([]);
  const [showBlur, setShowBlur] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const toggleNaics = (code: string) => {
    if (selectedNaics.includes(code)) {
      setSelectedNaics(selectedNaics.filter((c) => c !== code));
    } else if (selectedNaics.length < 5) {
      setSelectedNaics([...selectedNaics, code]);
    }
  };

  const runDemo = async () => {
    if (selectedNaics.length === 0) return;
    setIsLoading(true);
    setOpportunities([]);
    setShowBlur(false);
    setError(null);
    setIsEmpty(false);

    try {
      const res = await fetch(`/api/demo-opportunities?naics=${selectedNaics.join(",")}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      if (data.message === "no_data" || !data.opportunities?.length) {
        setIsEmpty(true);
      } else {
        setOpportunities(data.opportunities);
        // Reveal blur over results 2+ after 3 seconds — drives sign-up
        setTimeout(() => setShowBlur(true), 3000);
      }
    } catch (err) {
      console.error("Demo fetch error:", err);
      setError("Unable to load live opportunities right now. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-6 bg-slate-900/30">
      <div className="mx-auto max-w-3xl">
        <p className="text-emerald-400 text-xs uppercase tracking-[0.2em] font-bold text-center mb-3">Live Demo</p>
        <h2 className="text-4xl font-black text-white text-center mb-4">
          See Real Contracts Matched to Your NAICS
        </h2>
        <p className="text-slate-400 text-center mb-10">
          Select up to 5 NAICS codes. We'll scan active SAM.gov opportunities right now and rank them by win probability. No signup required.
        </p>

        {/* NAICS picker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {POPULAR_NAICS.map((n) => {
            const selected = selectedNaics.includes(n.code);
            const maxed = !selected && selectedNaics.length >= 5;
            return (
              <button
                key={n.code}
                onClick={() => toggleNaics(n.code)}
                disabled={maxed}
                className={`text-left px-4 py-3 rounded-xl border text-xs transition-all duration-200 ${
                  selected
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
                    : maxed
                    ? "bg-slate-900/30 border-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600"
                }`}
              >
                <div className="font-mono font-bold mb-0.5">{n.code}</div>
                <div className="leading-tight">{n.desc}</div>
              </button>
            );
          })}
        </div>

        {selectedNaics.length > 0 && (
          <p className="text-slate-500 text-xs text-center mb-4">{selectedNaics.length} of 5 NAICS codes selected</p>
        )}

        <button
          onClick={runDemo}
          disabled={selectedNaics.length === 0 || isLoading}
          className={`w-full py-5 rounded-2xl text-white font-black text-lg flex justify-center items-center gap-3 transition-all duration-200 ${
            selectedNaics.length === 0
              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
              : isLoading
              ? "bg-emerald-700 cursor-wait"
              : "bg-emerald-500 hover:bg-emerald-400"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Scanning SAM.gov live…
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Scan Live Opportunities — No Signup Required
            </>
          )}
        </button>

        {/* Error state */}
        {error && (
          <div className="mt-8 flex items-start gap-3 bg-red-950/40 border border-red-800 rounded-xl p-5">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Empty state — DB not yet populated for these NAICS */}
        {isEmpty && (
          <div className="mt-8 bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-white font-bold mb-2">Sync in Progress</h3>
            <p className="text-slate-400 text-sm mb-6">
              Our SAM.gov database is syncing for these NAICS codes. This typically completes within minutes.
              Activate your account to get notified the moment matching opportunities are ready.
            </p>
            <a href="#pricing" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-xl transition-colors">
              Activate My Account →
            </a>
          </div>
        )}

        {/* Live results */}
        {opportunities.length > 0 && (
          <div className="mt-10 space-y-4">
            <p className="text-slate-400 text-sm text-center">
              Found <span className="text-white font-bold">{opportunities.length} live opportunities</span> matching your selected NAICS codes
            </p>

            {opportunities.map((opp, index) => (
              <div key={opp.notice_id} className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl">

                {/* Blur overlay for results after the first */}
                {showBlur && index >= 1 && (
                  <div className="absolute inset-0 backdrop-blur-sm bg-slate-950/75 flex flex-col items-center justify-center rounded-2xl gap-3 z-10 p-6">
                    <p className="text-white font-bold text-center">
                      {opportunities.length - 1} more matched {opportunities.length - 1 === 1 ? "opportunity" : "opportunities"} found
                    </p>
                    <p className="text-slate-400 text-sm text-center">
                      Activate your account to see all matches, win scores, and AI-drafted bid outlines.
                    </p>
                    <a
                      href="#pricing"
                      className="bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-white font-black rounded-xl flex items-center gap-2 transition-colors"
                    >
                      Activate My Account <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-white font-bold text-base leading-tight">{opp.title}</h3>
                  <div className="flex-shrink-0 text-center">
                    <div className={`text-3xl font-black ${scoreColor(opp.score)}`}>{opp.score}</div>
                    <div className="text-slate-500 text-xs">win score</div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-3">{opp.agency}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">📅 {opp.deadline}</span>
                  <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">🏷 NAICS {opp.naics_code}</span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs">🛡 {opp.set_aside}</span>
                </div>

                {opp.summary && (
                  <p className="text-slate-400 text-sm mb-3 leading-relaxed">{opp.summary}</p>
                )}

                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
                  {opp.checklist && (
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {opp.checklist}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    AI Bid Draft Available
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">BidWon.</span>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <Link href="/login" className="hover:text-white transition-colors">Client Login</Link>
        </div>
        <a href="#demo" className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-black px-5 py-2.5 rounded-lg transition-colors duration-200">
          Run Live Demo →
        </a>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SAM.gov Live Sync Active — 847 new opportunities posted today
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Win Federal Contracts<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Faster Than Your Competitors
            </span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            BidWon's AI reads every active SAM.gov opportunity daily, ranks it by your win probability, and drafts a fully compliant technical proposal — so you compete only where you can win.
          </p>
          <p className="text-slate-500 text-sm mb-10">Used by 340+ federal contractors who've captured $2.1B+ in federal work.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#demo" className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-10 py-4 rounded-xl transition-colors duration-200 text-lg">
              See My Matched Contracts →
            </a>
            <a href="#pricing" className="border border-slate-700 hover:border-slate-500 text-white font-semibold px-10 py-4 rounded-xl transition-colors duration-200 text-lg">
              View Pricing
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span>Rated 4.9/5 by 340+ contractors</span>
            <span className="text-slate-700">·</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>12-month win guarantee on annual plans</span>
          </div>
        </div>
      </section>

      <StatBar />
      <PainSection />
      <HowItWorks />
      <LiveDemo />
      <Testimonials />
      <ComparisonTable />
      <PricingSection isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-950/95 backdrop-blur border-t border-slate-800 px-4 py-3">
        <a href="#pricing" className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-center py-3.5 rounded-xl transition-colors">
          Activate My Account →
        </a>
      </div>
    </div>
  );
}