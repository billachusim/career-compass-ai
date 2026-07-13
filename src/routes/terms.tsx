import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Service — CareerBoost AI" },
      { name: "description", content: "The terms governing your use of CareerBoost AI." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 2026</p>
        <div className="prose prose-neutral mt-8 max-w-none space-y-4 text-sm leading-relaxed">
          <p>By using CareerBoost AI you agree to these terms. If you don't agree, don't use the service.</p>
          <h2 className="font-display text-xl font-semibold">Acceptable use</h2>
          <p>Don't upload content you don't have rights to. Don't try to break, scrape, or abuse the service. Free-tier limits apply per account.</p>
          <h2 className="font-display text-xl font-semibold">AI outputs</h2>
          <p>The AI is a tool. Review every output before using it — we make no guarantee of interviews, job offers, or specific outcomes.</p>
          <h2 className="font-display text-xl font-semibold">Subscriptions</h2>
          <p>Pro subscriptions renew automatically until you cancel. Refunds available within 14 days of purchase.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
