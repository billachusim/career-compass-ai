import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Post {
  slug: string;
  title: string;
  excerpt: string | null;
  body_md: string;
  category: string;
  cover_url: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

const getPost = createServerFn({ method: "GET" })
  .inputValidator((raw: unknown) => z.object({ slug: z.string() }).parse(raw))
  .handler(async ({ data }): Promise<Post | null> => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const supabase = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });
    const { data: row, error } = await supabase
      .from("blog_posts")
      .select("slug,title,excerpt,body_md,category,cover_url,published_at,seo_title,seo_description")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !row) return null;
    return row as Post;
  });

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "post", slug],
    queryFn: () => getPost({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  component: BlogPost,
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: loaderData.seo_title ?? `${loaderData.title} | CareerBoost AI` },
        { name: "description", content: loaderData.seo_description ?? loaderData.excerpt ?? "" },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: loaderData.excerpt,
            datePublished: loaderData.published_at,
            articleSection: loaderData.category,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-md py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Post not found</h1>
        <Button asChild className="mt-6"><Link to="/blog">Back to blog</Link></Button>
      </div>
    </SiteLayout>
  ),
});

function BlogPost() {
  const params = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(params.slug));
  if (!post) return null;
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
        {post.published_at && (
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        <div className="mt-10 whitespace-pre-wrap text-base leading-relaxed text-foreground/90">{post.body_md}</div>
      </article>
    </SiteLayout>
  );
}
