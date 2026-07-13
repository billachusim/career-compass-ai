import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FileText, Loader2, Sparkles, TrendingUp, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { runAtsCheck, type AtsResult } from "@/lib/ai/ats-checker.functions";

export function AtsCheckerApp() {
  const runCheck = useServerFn(runAtsCheck);
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (resumeText.trim().length < 50) {
      toast.error("Please paste your full resume (at least 50 characters).");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const r = await runCheck({ data: { resumeText, targetRole } });
      setResult(r);
      toast.success(`ATS score: ${r.score}/100`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === "text/plain") {
      setResumeText(await file.text());
      return;
    }
    toast.info("For best results, paste your resume text below. PDF/DOCX upload coming soon.");
  }

  return (
    <div className="space-y-6">
      {!result && (
        <Card>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <Label htmlFor="target">Target role (optional)</Label>
                <Input
                  id="target"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Product Manager at a SaaS company"
                  className="mt-1.5"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="resume">Your resume</Label>
                  <label className="cursor-pointer text-xs font-medium text-primary hover:underline">
                    <input type="file" accept=".txt,.pdf,.docx" className="sr-only" onChange={onFile} />
                    Upload .txt
                  </label>
                </div>
                <Textarea
                  id="resume"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the full text of your resume here…"
                  rows={14}
                  className="mt-1.5 font-mono text-xs"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {resumeText.length} chars · Everything runs privately, never used for training.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full shadow-glow" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Analyze my resume
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {result && <ResultView result={result} onReset={() => setResult(null)} />}
    </div>
  );
}

function ResultView({ result, onReset }: { result: AtsResult; onReset: () => void }) {
  const scoreColor =
    result.score >= 80 ? "text-success" : result.score >= 60 ? "text-warning" : "text-destructive";
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Your ATS score</p>
              <div className={`font-display text-6xl font-bold ${scoreColor}`}>{result.score}</div>
              <p className="mt-1 text-sm text-muted-foreground">out of 100</p>
            </div>
            <div className="flex-1 space-y-3 sm:pl-8">
              {[
                { label: "ATS compatibility", value: result.ats_compatibility },
                { label: "Formatting", value: result.formatting },
                { label: "Keyword coverage", value: result.keyword_coverage },
                { label: "Recruiter friendliness", value: result.recruiter_friendliness },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-medium">{r.value}</span>
                  </div>
                  <Progress value={r.value} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-muted/60 p-4 text-sm">{result.summary}</div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <h3 className="font-display text-lg font-semibold">Strengths</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" />{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <h3 className="font-display text-lg font-semibold">Weaknesses</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {result.weaknesses.map((s, i) => (
                <li key={i} className="flex gap-2"><AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-warning" />{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {result.missing_keywords.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">Missing keywords</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add these where they truthfully apply to your experience.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {result.missing_keywords.map((k) => (
                <Badge key={k} variant="secondary">{k}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {result.weak_bullets.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">Bullet-point rewrites</h3>
            <div className="mt-4 space-y-4">
              {result.weak_bullets.map((b, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Before</p>
                  <p className="mt-1 text-sm text-muted-foreground line-through">{b.original}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">After</p>
                  <p className="mt-1 text-sm font-medium">{b.suggested}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-display text-lg font-semibold">Top 5 actions to boost your score</h3>
          </div>
          <ol className="mt-3 space-y-2 text-sm">
            {result.top_recommendations.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-bold text-brand-foreground">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" onClick={onReset} className="flex-1">
          <FileText className="mr-2 h-4 w-4" /> Check another resume
        </Button>
        <Button className="flex-1 shadow-glow">
          <Sparkles className="mr-2 h-4 w-4" /> Unlock full report (Pro)
        </Button>
      </div>
    </div>
  );
}
