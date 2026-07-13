import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
                <Sparkles className="h-4 w-4 text-brand-foreground" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">CareerBoost AI</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Land more interviews with AI. The all-in-one career platform for modern job seekers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Tools</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {TOOLS.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/tools/$slug"
                    params={{ slug: t.slug }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">More tools</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {TOOLS.slice(5).map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/tools/$slug"
                    params={{ slug: t.slug }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {year} CareerBoost AI. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Land more interviews with AI.</p>
        </div>
      </div>
    </footer>
  );
}
