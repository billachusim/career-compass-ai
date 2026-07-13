import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  cover_url: string | null;
  published_at: string | null;
}

const listPosts = createServerFn({ method: "GET" }).handler(async (): Promise<PostSummary[]> => {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const supabase = createClient(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug,title,excerpt,category,cover_url,published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(50);
  if (error) return [];
  return (data ?? []) as PostSummary[];
});

const postsQuery = queryOptions({
  queryKey: ["blog", "posts"],
  queryFn: () => listPosts(),
});

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Career & Job Search Blog | CareerBoost AI" },
      { name: "description", content: "Actionable tips on resumes, interviews, LinkedIn, salary negotiation, and modern careers." },
      { property: "og:title", content: "Career & Job Search Blog | CareerBoost AI" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);
  return (
    <SiteLayout>
      <section className="bg-hero py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Career & Job Search Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">Actionable tips from the CareerBoost AI team.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">More articles coming soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}>
                  <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{p.category}</Badge>
                      <h2 className="font-display text-lg font-semibold leading-snug">{p.title}</h2>
                      {p.excerpt && <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>}
                      {p.published_at && (
                        <p className="mt-4 text-xs text-muted-foreground">
                          {new Date(p.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
