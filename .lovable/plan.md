# CareerBoost AI — Full Platform v1

A world-class AI career platform with 10 tools, auth, Stripe payments, blog CMS, admin dashboard, and SEO-first architecture.

## Design

- Linear/Stripe/Notion-inspired modern SaaS aesthetic
- Light + dark mode, glass effects, soft shadows, rounded corners
- Custom semantic design tokens (OKLCH) in `src/styles.css`
- Distinctive brand palette (deep indigo + electric accent), Space Grotesk headings + Inter body — avoiding generic purple-gradient AI look
- Subtle Motion animations, mobile-first responsive
- Fully accessible (keyboard nav, ARIA, contrast)

## Architecture

- TanStack Start (SSR) + React 19 + Tailwind v4
- Lovable Cloud (Supabase) for DB/auth/storage
- Lovable AI Gateway (`google/gemini-3-flash-preview` default) for all 10 tools
- Stripe (seamless, Lovable-managed) for payments
- All AI logic in `createServerFn`; Stripe webhooks in `/api/public/*`

## Pages / Routes

**Marketing & SEO**
- `/` Homepage — hero, tool grid, testimonials, FAQ, pricing preview, blog preview, CTA
- `/pricing` Free / Pro Monthly / Pro Yearly / Pay-per-report
- `/about`, `/contact`, `/faq`, `/privacy`, `/terms`
- `/blog` index + `/blog/$slug` (with TOC, related posts, FAQ schema, Article JSON-LD)
- `/blog/category/$category` for 7 categories

**10 AI Tool Landing + App pages** (each its own SEO route with unique meta, FAQ schema, JSON-LD)
- `/tools/ats-resume-checker`
- `/tools/resume-builder`
- `/tools/resume-optimizer`
- `/tools/cover-letter-generator`
- `/tools/job-match-analyzer`
- `/tools/linkedin-analyzer`
- `/tools/interview-coach`
- `/tools/salary-negotiation`
- `/tools/skill-gap-analyzer`
- `/tools/career-roadmap`

**Auth & App (under `_authenticated/`)**
- `/dashboard` — saved reports, credits, subscription, history
- `/dashboard/reports/$id` — view saved AI report
- `/dashboard/billing` — manage subscription, buy credits
- `/dashboard/settings`

**Admin (`_authenticated/_admin/`)**
- `/admin` overview
- `/admin/users`, `/admin/subscriptions`, `/admin/payments`
- `/admin/blog` (CRUD)
- `/admin/prompts` (versioned prompt manager)
- `/admin/pricing`, `/admin/feature-flags`, `/admin/ai-usage`

**Auth**
- `/auth` — email/password + Google sign-in (Apple noted as future — requires Apple Dev account setup)

**SEO infra**
- `/sitemap.xml` server route (dynamic — includes all tools + blog posts)
- `/robots.txt`

## Database Schema (Lovable Cloud)

- `profiles` (id → auth.users, display_name, avatar_url, created_at)
- `user_roles` (user_id, role: 'user'|'admin') — separate table via `has_role()` SECURITY DEFINER (privilege-escalation safe)
- `subscriptions` (user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end)
- `credits` (user_id, balance, updated_at)
- `credit_transactions` (user_id, delta, reason, stripe_payment_intent_id)
- `reports` (id, user_id, tool_slug, input_json, output_json, score, created_at) — saved AI outputs
- `blog_posts` (id, slug, title, excerpt, body_md, category, cover_url, published, published_at, author_id, seo_title, seo_description, faq_json)
- `prompts` (id, tool_slug, version, system_prompt, user_prompt_template, is_active)
- `ai_usage_logs` (user_id, tool_slug, tokens_in, tokens_out, cost_estimate, created_at)
- `feature_flags` (key, enabled, description)

All tables get explicit GRANTs to `authenticated`/`service_role` (+ `anon` on public tables like `blog_posts` where published=true) and RLS policies scoped to `auth.uid()`.

## AI Tools Implementation

Each tool is a `createServerFn` calling Lovable AI Gateway with:
- Prompt loaded from `prompts` table (versioned, admin-editable)
- Zod `Output.object` schema for structured JSON responses
- Streaming for long-form outputs (cover letter, interview questions, roadmap)
- Retry with backoff on 429/5xx
- Credit deduction + `ai_usage_logs` insert
- Save result to `reports` for signed-in users
- Free tier: 1 free run per tool per day (anon rate-limited by IP); premium report/full details behind paywall

**File uploads** (PDF/DOCX for resume tools): parse via Lovable AI multimodal `file` content block (base64 data URL, correct MIME).

**PDF generation** (Resume Builder, Cover Letter, Salary Counter-Offer email): server-side via `pdf-lib` (Worker-compatible), NOT reportlab/puppeteer.

## Payments (Stripe seamless)

- Products: Pro Monthly, Pro Yearly, Pay-per-report credit packs
- Checkout via `createServerFn` → Stripe Checkout Session
- Webhook at `/api/public/stripe-webhook` (HMAC verified) → updates `subscriptions` + `credits`
- Billing portal link for subscription management
- Tax handling: full compliance (managed_payments) for digital SaaS
- Requires running `recommend_payment_provider` + `enable_stripe_payments` after Cloud is enabled and user confirms

## SEO

- Per-route `head()` with unique title/description/og:title/og:description/og:url
- Canonical on every leaf
- JSON-LD: Organization (root), SoftwareApplication (tool pages), Article + FAQPage + BreadcrumbList (blog)
- Dynamic `/sitemap.xml` server route enumerates all tools + published blog posts
- `robots.txt` allows all
- Core Web Vitals: SSR + minimal client JS on marketing pages, lazy-load tool UIs

## Build Order

Because of the huge scope, I'll ship in phases within this v1 build:

1. **Foundation**: design system, layout, Header/Footer, Cloud enablement, DB schema, auth (email + Google), `_authenticated` gate
2. **Marketing shell**: Homepage, Pricing, About, Contact, FAQ, all 10 tool landing pages (with proper SEO/JSON-LD), blog scaffold
3. **Core AI tools working** (all 10): server functions, prompt table seeded, streaming, credit metering, report saving
4. **Dashboard**: reports history, credits, downloads, billing
5. **Payments**: Stripe enablement, checkout, webhook, billing portal
6. **Blog CMS**: reader UI, admin CRUD, dynamic sitemap
7. **Admin dashboard**: users, subs, payments, prompt manager, feature flags, AI usage
8. **Polish**: dark mode toggle, animations, meta refinement, sitemap, SEO audit

## Notes / Constraints

- **Apple sign-in**: skipped in v1 (requires Apple Developer account setup by user; can add later via `configure_social_auth`)
- **Paystack / Flutterwave**: not included (Stripe only, per your answer). Can add later as custom integrations if you obtain their API keys.
- **Voice mock interviews, job board, AI recruiter, etc.**: listed as Future Features — not in v1.
- This is a large first build. Expect the initial version to focus on getting all surfaces up with working AI on the core tools; deep polish per tool will iterate after.
