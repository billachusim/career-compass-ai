import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
  head: () => ({
    meta: [
      { title: "All AI Career Tools | CareerBoost AI" },
      {
        name: "description",
        content:
          "Explore 10 AI-powered career tools: ATS resume checker, resume builder, cover letter generator, interview coach, salary negotiator, and more.",
      },
      { property: "og:title", content: "All AI Career Tools | CareerBoost AI" },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
});

function ToolsIndex() {
  return (
    <SiteLayout>
      <section className="bg-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">All AI Career Tools</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            10 purpose-built tools for every stage of your job search. Free to try, no signup required for your first run.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {TOOLS.map(({ slug, name, description, icon: Icon, category }) => (
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
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
