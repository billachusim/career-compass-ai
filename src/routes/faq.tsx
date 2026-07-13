import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is CareerBoost AI free?", a: "Yes. Every tool has a free tier with daily limits. Pro unlocks unlimited runs and full detailed reports." },
  { q: "What data do you store?", a: "Only what you save. Reports live in your dashboard until you delete them. We never sell your data or train models on it." },
  { q: "Which AI models power the tools?", a: "State-of-the-art models via the Lovable AI gateway. We optimize the prompt, structure, and workflow per tool." },
  { q: "Do you support PDF and DOCX resumes?", a: "Yes for the resume tools. PDF is recommended for maximum compatibility." },
  { q: "How is this different from ChatGPT?", a: "Each tool has a purpose-built prompt, structured JSON output, and a workflow tuned for one job — no prompt engineering required." },
  { q: "Can I cancel my subscription?", a: "Yes, cancel any time from your dashboard. You keep access until the end of your billing period." },
  { q: "Do you offer refunds?", a: "Within 14 days of purchase, no questions asked." },
  { q: "Is my resume shared with anyone?", a: "No. Your resume is only visible to you. See our privacy policy for full details." },
];

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — CareerBoost AI" },
      { name: "description", content: "Answers to the most common questions about CareerBoost AI's tools, pricing, and privacy." },
      { property: "og:title", content: "Frequently Asked Questions — CareerBoost AI" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function FAQ() {
  return (
    <SiteLayout>
      <section className="bg-hero py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Frequently asked questions</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
