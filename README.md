# BidWon.

**Winning Government Contracts through Straight Line AI.**

BidWon is a high-velocity B2G (Business-to-Government) SaaS platform designed for government contractors to identify, score, and bid on SAM.gov opportunities with surgical precision. 

## 🚀 The Core Proposition

BidWon solves the "Search-to-Submission" bottleneck by combining real-time federal data synchronization with a proprietary **Straight Line** sales methodology and **Sovereign AI** architecture.

### Key Capabilities
* **Real-time SAM.gov Sync:** Automated nightly ingestion of active federal opportunities.
* **Vector-Matched Scoring:** Opportunities are matched against corporate core competencies using `pgvector` to ensure maximum probability of award.
* **AI-Drafted Bids:** Generates highly technical, compliant bid drafts using a sophisticated RAG (Retrieval-Augmented Generation) engine.
* **Sovereign-First Architecture:** Designed for maximum data privacy, transitioning from cloud-inference (Gemini) to local-first (Llama 3-70B) processing.

## 🛠 Tech Stack

* **Frontend:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript.
* **Backend:** Supabase (Postgres, Auth, pgvector).
* **Payment Infrastructure:** Stripe (Payment Links & Automated Webhooks).
* **Compute/Hosting:** Vercel (Edge Functions, Cron Jobs).
* **AI Stack:** Gemini API (MVP Generation/Embeddings) → Future-locked for Llama 3-70B.

## 🏗 System Architecture

BidWon operates on a "Zero-Local" deployment model, utilizing Vercel's serverless infrastructure and Supabase's managed database to maintain a lean, solo-founder operational footprint.

1. **The Pipeline:** A nightly Vercel Cron job syncs SAM.gov CSV data directly into Postgres.
2. **The Vault:** Historical winning contracts are vectorized to provide a "Straight Line" logic for new bid drafts.
3. **The Command Center:** A premium 2026-standard dashboard allows users to manage their acquisition pipeline at scale.

## ⚖️ License

Proprietary. All rights reserved. Built by [Your Name/Company Name].
