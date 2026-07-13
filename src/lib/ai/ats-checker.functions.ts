import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  resumeText: z.string().min(50, "Resume too short").max(50000),
  targetRole: z.string().max(200).optional().default(""),
});

const responseSchema = z.object({
  score: z.number(),
  ats_compatibility: z.number(),
  formatting: z.number(),
  keyword_coverage: z.number(),
  recruiter_friendliness: z.number(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  missing_keywords: z.array(z.string()),
  weak_bullets: z.array(z.object({ original: z.string(), suggested: z.string() })),
  summary: z.string(),
  top_recommendations: z.array(z.string()),
});

export type AtsResult = z.infer<typeof responseSchema>;

export const runAtsCheck = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => inputSchema.parse(raw))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI is not configured. Please contact support.");

    const systemPrompt =
      "You are an expert ATS analyst and senior technical recruiter. Analyze the resume strictly against ATS parsing rules and recruiter expectations. Be specific, honest, actionable. Never invent content that isn't in the resume. Respond with valid JSON only.";

    const userPrompt = `Analyze this resume for ATS compatibility and recruiter friendliness.

RESUME:
${data.resumeText}

Target role: ${data.targetRole || "not specified"}

Return a JSON object exactly matching this schema:
{
  "score": number (0-100 overall),
  "ats_compatibility": number (0-100),
  "formatting": number (0-100),
  "keyword_coverage": number (0-100),
  "recruiter_friendliness": number (0-100),
  "strengths": string[] (3-5 short items),
  "weaknesses": string[] (3-5 short items),
  "missing_keywords": string[] (5-10 items relevant to target role),
  "weak_bullets": [{ "original": string, "suggested": string }] (2-5 examples),
  "summary": string (2-3 sentences),
  "top_recommendations": string[] (exactly 5 concrete actions)
}`;

    let lastError: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (res.status === 402) {
          throw new Error("AI credits exhausted. Please contact support.");
        }
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
        }
        const json = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const content = json.choices?.[0]?.message?.content ?? "{}";
        const parsed = JSON.parse(content);
        const validated = responseSchema.parse(parsed);
        return validated;
      } catch (err) {
        lastError = err;
        if (attempt < 2) await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }
    throw lastError instanceof Error ? lastError : new Error("AI analysis failed");
  });
