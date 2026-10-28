import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@/assets/hero-makkah.jpg";
import madinahImage from "@/assets/gallery-madinah.jpg";
import arafatImage from "@/assets/gallery-arafat.jpg";
import { SectionHeading } from "@/components/site/PageHero";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";
import { packagesQuery, testimonialsQuery } from "@/lib/content-queries";
import { formatTaka, toBn } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "গ্রীন বাংলা হজ কাফেলা — আপনার পবিত্র হজ যাত্রার বিশ্বস্ত সঙ্গী" },
      {
        name: "description",
        content:
          "হজ প্যাকেজ, অনলাইন রেজিস্ট্রেশন, প্রশিক্ষণ ও পূর্ণ হজ ব্যবস্থাপনা — গ্রীন বাংলা হজ কাফেলার সঙ্গে নিশ্চিন্ত হজযাত্রা।",
      },
      {
        property: "og:title",
        content: "গ্রীন বাংলা হজ কাফেলা — আপনার পবিত্র হজ যাত্রার বিশ্বস্ত সঙ্গী",
      },
      {
        property: "og:description",
        content: "হজ প্যাকেজ, অনলাইন রেজিস্ট্রেশন, প্রশিক্ষণ ও পূর্ণ হজ ব্যবস্থাপনা।",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: packages } = useQuery(packagesQuery);
  const { data: testimonials } = useQuery(testimonialsQuery);
  const { home, introCards } = useSiteContent();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={home.heroImage || heroImage}
          alt="ভোরের আলোয় পবিত্র কাবা শরীফ ও তাওয়াফরত হাজিগণ"
          width={1536}
          height={1024}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="pattern-geometric relative mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
          <p className="section-label">{home.heroLabel}</p>
          <h1 className="animate-rise mx-auto mt-4 max-w-[22ch] text-3xl leading-tight font-bold text-balance text-primary-foreground md:text-5xl">
            {home.heroTitle} <span className="text-accent-soft">{home.heroHighlight}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-pretty text-primary-foreground/80 md:text-base">
            {home.heroSubtitle}
          </p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              to="/packages"
              className="rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-gold transition-transform active:scale-95"
            >
              {home.btnPackages}
            </Link>
            <Link
              to="/registration"
              className="rounded-xl border border-primary-foreground/25 px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {home.btnRegistration}
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading label="পরিচিতি" title={home.introTitle} description={home.introText} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {introCards.map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-background p-6 shadow-soft"
              >
                <h3 className="font-bold text-primary">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-8 inline-flex rounded-full border border-primary/25 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
          >
            বিস্তারিত পরিচিতি দেখুন
          </Link>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <SectionHeading label="প্যাকেজ" title="হজ প্যাকেজ সমূহ" />
            <span className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
              {home.sessionLabel}
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {packages?.map((p) => (
              <article
                key={p.id}
                className={
                  "relative overflow-hidden rounded-2xl p-6 " +
                  (p.is_popular
                    ? "border-2 border-accent bg-card shadow-raised"
                    : "border border-border bg-card shadow-soft")
                }
              >
                {p.is_popular && (
                  <span className="absolute top-0 right-0 bg-accent px-4 py-1 text-[10px] font-bold text-accent-foreground uppercase">
                    জনপ্রিয়
                  </span>
                )}
                <h3 className="text-lg font-bold">{p.name_bn}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
                <p className="mt-4 text-2xl font-bold text-primary">
                  {formatTaka(Number(p.price))}
                </p>
                <p className="text-xs text-muted-foreground">জনপ্রতি · {p.duration}</p>
                <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
                  {[p.hotel, p.food, p.transport, p.training].filter(Boolean).map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-2">
                  <Link
                    to="/packages"
                    className="rounded-lg border border-primary px-4 py-2.5 text-center text-sm font-medium text-primary transition-colors hover:bg-secondary"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                  <Link
                    to="/registration"
                    search={{ package: p.slug }}
                    className={
                      "rounded-lg px-4 py-2.5 text-center text-sm font-bold " +
                      (p.is_popular
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground")
                    }
                  >
                    আবেদন করুন
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            প্যাকেজের মূল্য, সুবিধা ও শর্ত বাস্তব তথ্য অনুযায়ী প্রদর্শিত হয় এবং অ্যাডমিন প্যানেল
            থেকে পরিবর্তনযোগ্য।
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="pattern-geometric bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <p className="section-label">যাত্রাপথ</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">হজ যাত্রার ধাপসমূহ</h2>
          <div className="mt-8 max-w-xl">
            <JourneyTimeline compact />
          </div>
          <Link
            to="/journey"
            className="mt-8 inline-flex rounded-full border border-accent/40 px-5 py-2.5 text-sm font-semibold text-accent-soft"
          >
            সম্পূর্ণ যাত্রাপথ দেখুন
          </Link>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading label="গ্যালারি" title="হজ যাত্রার মুহূর্ত" align="center" />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { src: heroImage, alt: "পবিত্র কাবা শরীফ", label: "মক্কা" },
              { src: madinahImage, alt: "মসজিদে নববীর সবুজ গম্বুজ", label: "মদিনা" },
              { src: arafatImage, alt: "আরাফাতের মায়দানে হাজিগণ", label: "আরাফাত" },
            ].map((g) => (
              <figure key={g.label} className="relative overflow-hidden rounded-2xl">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="absolute bottom-0 w-full bg-primary/70 px-4 py-2 text-sm font-semibold text-primary-foreground">
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex rounded-full border border-primary/25 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            >
              সম্পূর্ণ গ্যালারি
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading
            label="Our Pilgrims Say"
            title="⭐ হাজীদের অভিজ্ঞতা"
            description="হাজিদের অনুমতি নিয়ে প্রকাশিত বাস্তব অভিজ্ঞতা।"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials?.slice(0, 3).map((t) => (
              <figure
                key={t.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <blockquote className="text-[15px] leading-relaxed text-pretty">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <span className="block text-sm font-bold text-primary">— {t.pilgrim_name}</span>
                  <span className="text-xs text-muted-foreground">হজ {toBn(t.hajj_year)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-accent-foreground">{home.ctaTitle}</h2>
          <p className="max-w-[48ch] text-sm text-accent-foreground/85">{home.ctaText}</p>
          <Link
            to="/registration"
            className="rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground"
          >
            {home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
