import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TOOL_MAP, TOOLS } from "@/lib/tools";

const AtsCheckerApp = lazy(() =>
  import("@/components/tools/AtsCheckerApp").then((m) => ({ default: m.AtsCheckerApp })),
);

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }): { tool: import("@/lib/tools").Tool } => {
    const tool = TOOL_MAP[params.slug];
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tool not found | CareerBoost AI" }, { name: "robots", content: "noindex" }] };
    }
    const { tool } = loaderData;
    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/tools/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/tools/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tool.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-md py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Tool not found</h1>
        <Button asChild className="mt-6"><Link to="/tools">See all tools</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const Icon = tool.icon;
  const related = TOOLS.filter((t) => t.slug !== tool.slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">{tool.category}</Badge>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{tool.name}</h1>
              <p className="mt-3 text-xl text-muted-foreground">{tool.tagline}</p>
              <p className="mt-4 text-base text-muted-foreground">{tool.description}</p>
              <ul className="mt-6 space-y-2">
                {tool.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /> <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl bg-brand-gradient text-brand-foreground shadow-elevated sm:h-72 sm:w-72">
                <Icon className="h-20 w-20" />
                <div className="absolute -bottom-3 -right-3 rounded-full bg-background px-4 py-2 text-xs font-semibold shadow-elevated">
                  ⚡ Instant AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App */}
      <section id="app" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {tool.slug === "ats-resume-checker" ? (
            <Suspense fallback={<div className="text-center text-muted-foreground">Loading tool…</div>}>
              <AtsCheckerApp />
            </Suspense>
          ) : (
            <ComingSoonForm toolName={tool.name} />
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold">FAQ</h2>
          <Accordion type="single" collapsible className="mt-8">
            {tool.faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((t) => (
              <Link key={t.slug} to="/tools/$slug" params={{ slug: t.slug }}>
                <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-brand-foreground">
                        <t.icon className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">{t.name}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Try it <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ComingSoonForm({ toolName }: { toolName: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="p-10 text-center">
        <Badge variant="secondary" className="mb-4">In development</Badge>
        <h3 className="font-display text-2xl font-bold">{toolName}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          The full AI-powered version is rolling out now. In the meantime, try our live tool below.
        </p>
        <Button asChild className="mt-6">
          <Link to="/tools/$slug" params={{ slug: "ats-resume-checker" }}>
            Try the ATS Resume Checker <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
