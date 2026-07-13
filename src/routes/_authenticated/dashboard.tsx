import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Sparkles, CreditCard, LogOut, Zap, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Dashboard — CareerBoost AI" }, { name: "robots", content: "noindex" }],
  }),
});

interface Report {
  id: string;
  tool_slug: string;
  title: string | null;
  score: number | null;
  created_at: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [credits, setCredits] = useState<number>(0);
  const [plan, setPlan] = useState<string>("free");
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (u.user) setEmail(u.user.email ?? "");
      const [{ data: c }, { data: s }, { data: r }] = await Promise.all([
        supabase.from("credits").select("balance").maybeSingle(),
        supabase.from("subscriptions").select("plan").maybeSingle(),
        supabase.from("reports").select("id, tool_slug, title, score, created_at").order("created_at", { ascending: false }).limit(10),
      ]);
      if (c) setCredits(c.balance);
      if (s) setPlan(s.plan);
      if (r) setReports(r as Report[]);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out.");
    navigate({ to: "/" });
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-hero py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Your dashboard</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <StatCard icon={Zap} label="AI credits" value={credits.toString()} sub="Free daily runs" />
          <StatCard icon={CreditCard} label="Plan" value={plan.replace("_", " ")} sub="Manage in billing" />
          <StatCard icon={FileText} label="Saved reports" value={reports.length.toString()} sub="Last 10 shown below" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold">Recent reports</h2>
            {reports.length === 0 ? (
              <Card className="mt-4">
                <CardContent className="p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-3 text-sm text-muted-foreground">No reports yet. Try a tool to generate your first one.</p>
                  <Button asChild className="mt-4">
                    <Link to="/tools">Browse tools <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="mt-4 space-y-2">
                {reports.map((r) => (
                  <Card key={r.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="text-sm font-medium">{r.title ?? r.tool_slug}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString()} · {r.tool_slug}
                        </div>
                      </div>
                      {r.score != null && <Badge variant="secondary">{r.score}/100</Badge>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold">Quick actions</h2>
            <div className="mt-4 space-y-3">
              {TOOLS.slice(0, 5).map((t) => (
                <Link key={t.slug} to="/tools/$slug" params={{ slug: t.slug }}>
                  <Card className="transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-brand-foreground">
                        <t.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{t.name}</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: typeof Sparkles; label: string; value: string; sub: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-2 font-display text-3xl font-bold capitalize">{value}</div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  );
}
