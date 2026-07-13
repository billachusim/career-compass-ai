import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, ShieldCheck, TrendingUp, Star, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "CareerBoost AI — Land More Interviews with AI" },
      {
        name: "description",
        content:
          "10 AI-powered tools for every stage of your job search. Free ATS checker, resume builder, cover letter generator, interview coach, and more.",
      },
      { property: "og:title", content: "CareerBoost AI — Land More Interviews with AI" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "CareerBoost AI",
          url: "/",
        }),
      },
    ],
  }),
});

const testimonials = [
  { name: "Priya S.", role: "Product Manager @ Meta", quote: "Went from zero callbacks to 4 interviews in 2 weeks. The ATS checker caught issues I never would have found." },
  { name: "Marcus T.", role: "Senior Engineer", quote: "The cover letter generator sounds like me — not like ChatGPT. That's the difference." },
  { name: "Ana L.", role: "UX Designer", quote: "The interview coach nailed the exact behavioral questions I got asked. Landed the offer." },
];

const faqs = [
  { q: "Is CareerBoost AI free?", a: "Yes. You get free access to every tool with daily limits. Upgrade to Pro for unlimited runs and deeper reports." },
  { q: "How is this different from ChatGPT?", a: "Each tool uses a purpose-built prompt, structured outputs, and workflows tuned for the specific stage of your job search — no prompt engineering required." },
  { q: "Is my data safe?", a: "Your resume and reports are only accessible to you. We never sell your data or train models on it." },
  { q: "Do you support DOCX and PDF?", a: "Yes — both formats for resume uploads." },
  { q: "Can I cancel any time?", a: "Absolutely. Pro is month-to-month or yearly, with no long-term commitment." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="h-3 w-3" /> AI-powered career platform
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Land More Interviews{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">with AI.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              10 AI-powered tools to fix your resume, tailor cover letters, prep for interviews, and negotiate your offer. Free to start.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="shadow-glow">
                <Link to="/tools/ats-resume-checker">
                  Try free ATS check <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/tools">See all 10 tools</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <Star className="h-4 w-4 fill-warning text-warning" />
                <Star className="h-4 w-4 fill-warning text-warning" />
                <Star className="h-4 w-4 fill-warning text-warning" />
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="ml-1 font-medium text-foreground">4.9</span>
              </div>
              <span>•</span>
              <span>10,000+ job seekers</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value bar */}
      <section className="border-y border-border bg-background/50 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { icon: Zap, label: "Instant AI analysis" },
            { icon: ShieldCheck, label: "ATS-tested" },
            { icon: TrendingUp, label: "3× more callbacks" },
            { icon: Sparkles, label: "Free to start" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* Tool grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Every tool you need. One platform.</h2>
            <p className="mt-4 text-muted-foreground">
              Purpose-built AI for every stage of the job search. Not generic chat — tuned workflows that produce ready-to-use output.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map(({ slug, name, tagline, icon: Icon, category }) => (
              <Link key={slug} to="/tools/$slug" params={{ slug }} className="group">
                <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground shadow-soft">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                        {category}
                      </Badge>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Try it <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Loved by job seekers.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/70">
                <CardContent className="p-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Simple pricing.</h2>
            <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Free", price: "$0", period: "forever", features: ["1 run per tool per day", "Basic reports", "PDF downloads"], cta: "Start free", href: "/auth" },
              { name: "Pro Monthly", price: "$19", period: "/month", features: ["Unlimited AI runs", "Full detailed reports", "Priority processing", "Save unlimited reports"], cta: "Go Pro", href: "/pricing", featured: true },
              { name: "Pro Yearly", price: "$149", period: "/year", features: ["Everything in Pro", "35% off vs monthly", "Priority support"], cta: "Save 35%", href: "/pricing" },
            ].map((p) => (
              <Card key={p.name} className={p.featured ? "relative border-primary shadow-elevated" : ""}>
                {p.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                )}
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="h-4 w-4 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" variant={p.featured ? "default" : "outline"} asChild>
                    <Link to={p.href}>{p.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-0 bg-brand-gradient text-brand-foreground shadow-elevated">
            <CardContent className="p-10 text-center sm:p-16">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Your dream job is one AI report away.</h2>
              <p className="mt-3 text-brand-foreground/80">Try our free ATS Resume Checker. No credit card. No signup for your first run.</p>
              <Button size="lg" variant="secondary" className="mt-8" asChild>
                <Link to="/tools/ats-resume-checker">
                  Check my resume <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
