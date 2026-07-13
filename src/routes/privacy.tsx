import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — CareerBoost AI" },
      { name: "description", content: "How CareerBoost AI collects, uses, and protects your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Privacy() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 2026</p>
        <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-sm leading-relaxed">
          <p>We collect only the information required to run our services: your account email, any resumes or job descriptions you submit, and the reports the AI produces.</p>
          <h2 className="font-display text-xl font-semibold">What we don't do</h2>
          <ul className="list-disc pl-6">
            <li>Sell your data to third parties.</li>
            <li>Train models on your content.</li>
            <li>Share your reports with anyone.</li>
          </ul>
          <h2 className="font-display text-xl font-semibold">Your rights</h2>
          <p>You can delete your account and all associated data any time from your dashboard settings, or by emailing privacy@careerboost.ai.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
