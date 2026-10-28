import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

// Desktop shows the core pages; the rest stay in the mobile menu and footer.
const desktopNav = navItems.filter((i) =>
  ["/", "/about", "/packages", "/training", "/journey", "/gallery", "/contact"].includes(i.to),
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings: site, links } = useSiteContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md transition-shadow " +
        (scrolled ? "border-border shadow-soft" : "border-transparent")
      }
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={site.logoUrl || "/logo.png"}
            alt=""
            className="size-11 rounded-full border border-accent/40 bg-white object-contain p-0.5"
          />
          <span className="leading-tight">
            <span className="font-display block text-[17px] font-bold text-primary">
              গ্রীন বাংলা
            </span>
            <span className="block text-[12px] font-medium text-accent">হজ কাফেলা</span>
          </span>
        </Link>

        <nav aria-label="প্রধান মেনু" className="hidden items-center gap-1 xl:flex">
          {desktopNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary after:scale-x-100" }}
              inactiveProps={{ className: "text-foreground/70" }}
              className="relative px-3 py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.phone}
            className="hidden text-[14px] font-semibold text-primary lg:inline-flex"
          >
            {site.phone}
          </a>
          <Link
            to="/registration"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary-deep sm:inline-flex"
          >
            রেজিস্ট্রেশন
          </Link>
          <button
            type="button"
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-primary/15 xl:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={
                  "absolute left-0 h-0.5 w-5 rounded-full bg-primary transition-transform " +
                  (open ? "top-1.5 rotate-45" : "top-0")
                }
              />
              <span
                className={
                  "absolute left-0 h-0.5 rounded-full bg-primary transition-all " +
                  (open ? "top-1.5 w-5 -rotate-45" : "top-2.5 w-3.5")
                }
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav aria-label="মোবাইল মেনু" className="mx-auto grid max-w-6xl gap-0.5 px-5 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-primary" }}
                className="rounded-lg px-3 py-3 text-[16px] font-medium text-foreground/85"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={links.phone}
                className="rounded-full border border-primary/20 px-3 py-3 text-center text-[15px] font-semibold text-primary"
              >
                কল করুন
              </a>
              <Link
                to="/registration"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary px-3 py-3 text-center text-[15px] font-semibold text-primary-foreground"
              >
                রেজিস্ট্রেশন
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
