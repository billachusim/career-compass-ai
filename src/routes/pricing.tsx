import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — CareerBoost AI" },
      { name: "description", content: "Simple pricing for AI career tools. Start free, upgrade to Pro for unlimited AI runs and deeper reports." },
      { property: "og:title", content: "Pricing — CareerBoost AI" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
});

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try every tool with daily limits.",
    features: ["1 run per tool per day", "Basic reports", "PDF downloads", "Save up to 5 reports"],
    cta: "Start free",
    href: "/auth",
  },
  {
    name: "Pro Monthly",
    price: "$19",
    period: "/month",
    description: "For active job seekers.",
    featured: true,
    features: [
      "Unlimited AI runs",
      "Full detailed reports",
      "Priority AI processing",
      "Save unlimited reports",
      "Cover letter tone variants",
      "Mock interview mode",
    ],
    cta: "Upgrade to Pro",
    href: "/auth",
  },
  {
    name: "Pro Yearly",
    price: "$149",
    period: "/year",
    description: "Save 35% vs monthly.",
    features: ["Everything in Pro Monthly", "Save 35%", "Priority email support", "Early access to new tools"],
    cta: "Save 35%",
    href: "/auth",
  },
];

const payg = [
  { name: "Deep ATS Report", price: "$9", desc: "Ultra-detailed one-off resume audit." },
  { name: "Interview Prep Pack", price: "$14", desc: "50+ personalized questions with answers." },
  { name: "5 Credits Bundle", price: "$12", desc: "Use on any premium report." },
];

function Pricing() {
  return (
    <SiteLayout>
      <section className="bg-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">Simple pricing</Badge>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Land the job. Not a bill.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you're ready to accelerate your job search.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <Card key={t.name} className={t.featured ? "relative border-primary shadow-elevated" : ""}>
                {t.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>}
                <CardContent className="p-8">
                  <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-bold">{t.price}</span>
                    <span className="text-sm text-muted-foreground">{t.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2"><Check className="h-4 w-4 flex-shrink-0 text-primary" />{f}</li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full" variant={t.featured ? "default" : "outline"} asChild>
                    <Link to={t.href}>{t.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold">Pay-per-report</h2>
            <p className="mt-2 text-sm text-muted-foreground">Not sure about a subscription? Buy a single deep report.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {payg.map((p) => (
              <Card key={p.name}>
                <CardContent className="p-6">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 font-display text-2xl font-bold">{p.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Payments powered by Stripe. Cancel anytime. Full pricing set up during checkout.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
