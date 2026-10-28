import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { navItems } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function Header() {
  const [open, setOpen] = useState(false);
  const { settings: site, links } = useSiteContent();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={site.logoUrl || "/logo.png"}
            alt={site.nameEn}
            className="size-11 rounded-full border border-primary/15 bg-white object-contain p-0.5"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-primary">গ্রীন বাংলা</span>
            <span className="block text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
              হজ কাফেলা
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-primary" }}
              className="rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/registration"
            className="hidden rounded-full bg-accent px-4 py-2 text-[13px] font-bold text-accent-foreground shadow-gold transition-transform active:scale-95 sm:inline-flex"
          >
            রেজিস্ট্রেশন
          </Link>
          <button
            type="button"
            aria-label="মেনু"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-primary/15 lg:hidden"
          >
            <span className="h-0.5 w-5 rounded-full bg-primary" />
            <span className="h-0.5 w-5 rounded-full bg-primary" />
            <span className="h-0.5 w-3.5 rounded-full bg-primary" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary/10 bg-card lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-primary" }}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={links.phone}
              className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-center text-[15px] font-semibold text-primary-foreground"
            >
              কল করুন {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
