import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content";

const quickLinks = [
  { to: "/packages", label: "হজ প্যাকেজ" },
  { to: "/registration", label: "হজ রেজিস্ট্রেশন" },
  { to: "/training", label: "হজ প্রশিক্ষণ" },
  { to: "/journey", label: "হজ যাত্রা" },
  { to: "/gallery", label: "গ্যালারি" },
  { to: "/team", label: "হজ গাইড" },
  { to: "/experience", label: "হাজিদের অভিজ্ঞতা" },
] as const;

export function Footer() {
  const { settings: site, links } = useSiteContent();
  return (
    <footer className="pattern-geometric bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={site.logoUrl || "/logo.png"}
              alt=""
              className="size-12 rounded-full border border-accent/40 bg-white object-contain p-0.5"
            />
            <span className="font-display text-lg font-bold">{site.nameBn}</span>
          </div>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.8] text-primary-foreground/70">
            {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-display text-[16px] font-bold text-accent-soft">দ্রুত লিংক</h3>
          <ul className="mt-4 grid gap-3 text-[15px] text-primary-foreground/80">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-[16px] font-bold text-accent-soft">যোগাযোগ</h3>
          <ul className="mt-4 grid gap-3 text-[15px] text-primary-foreground/80">
            <li>{site.address}</li>
            {site.officeHours && <li>অফিস সময়: {site.officeHours}</li>}
            <li>
              <a href={links.phone} className="font-semibold text-accent-soft">
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent-soft"
              >
                হোয়াটসঅ্যাপ: {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={links.email} className="transition-colors hover:text-accent-soft">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent-soft"
              >
                ফেসবুক পেজ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-[13px] text-primary-foreground/55 sm:flex-row">
          <span>© ২০২৬ {site.nameBn} — সর্বস্বত্ব সংরক্ষিত</span>
          <Link to="/admin" className="transition-colors hover:text-accent-soft">
            অ্যাডমিন প্যানেল
          </Link>
        </div>
      </div>
    </footer>
  );
}
