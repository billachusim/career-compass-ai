import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — CareerBoost AI" },
      { name: "description", content: "The team and mission behind CareerBoost AI — the fastest way to land more interviews with AI." },
      { property: "og:title", content: "About — CareerBoost AI" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-hero py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">The modern job search deserves better tools.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're building an AI career platform that turns overwhelming into obvious — one tool at a time.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { n: "10", l: "Purpose-built AI tools" },
            { n: "10,000+", l: "Job seekers helped" },
            { n: "3×", l: "More interview callbacks" },
          ].map((s) => (
            <Card key={s.l}>
              <CardContent className="p-8 text-center">
                <div className="font-display text-4xl font-bold text-primary">{s.n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-3xl px-4 text-lg leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
          <p>
            CareerBoost AI was built for one reason: to stop good candidates from being invisible. Millions of resumes never reach a human because of an ATS filter. Millions of great cover letters never get written because the template feels wrong. Millions of interviews are lost because no one practiced the right questions.
          </p>
          <p className="mt-4">
            We combine purpose-built AI workflows, structured outputs, and a clean UX so every step of your job search — from resume to offer — is one focused, guided experience.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
