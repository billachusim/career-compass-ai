import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — CareerBoost AI" },
      { name: "description", content: "Get in touch with the CareerBoost AI team." },
      { property: "og:title", content: "Contact — CareerBoost AI" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [loading, setLoading] = useState(false);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thanks! We'll be in touch within 1 business day.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }
  return (
    <SiteLayout>
      <section className="bg-hero py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Contact us</h1>
          <p className="mt-3 text-lg text-muted-foreground">Questions, feedback, partnerships — we read everything.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="n">Name</Label>
                  <Input id="n" required maxLength={100} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="e">Email</Label>
                  <Input id="e" type="email" required maxLength={200} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="m">Message</Label>
                  <Textarea id="m" required rows={6} maxLength={2000} className="mt-1" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (<><Mail className="mr-2 h-4 w-4" />Send message</>)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
