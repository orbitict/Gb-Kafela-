import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@/assets/hero-makkah.jpg";
import madinahImage from "@/assets/gallery-madinah.jpg";
import arafatImage from "@/assets/gallery-arafat.jpg";
import { SectionHeading } from "@/components/site/PageHero";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";
import { packagesQuery, testimonialsQuery } from "@/lib/content-queries";
import { formatTaka, toBn } from "@/lib/site";
import { PackageFeatures } from "@/components/site/PackageFeatures";
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
      <section className="pattern-geometric relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          <div className="animate-rise">
            <p className="section-label text-accent-soft">{home.heroLabel}</p>
            <h1 className="mt-5 text-[2.35rem] leading-[1.3] font-bold text-balance sm:text-5xl lg:text-[3.6rem] lg:leading-[1.22]">
              {home.heroTitle} {home.heroHighlight}
            </h1>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.85] text-pretty text-primary-foreground/78 md:text-[18px]">
              {home.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/packages"
                className="rounded-full bg-accent px-8 py-4 text-center text-[17px] font-bold text-accent-foreground shadow-gold transition-colors hover:bg-accent-soft"
              >
                {home.btnPackages}
              </Link>
              <Link
                to="/registration"
                className="rounded-full border border-primary-foreground/30 px-8 py-4 text-center text-[17px] font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {home.btnRegistration}
              </Link>
            </div>
            {packages && packages.length > 0 && (
              <p className="mt-8 text-[15px] text-primary-foreground/65">
                প্যাকেজ শুরু{" "}
                <span className="font-display font-bold text-accent-soft">
                  {formatTaka(Math.min(...packages.map((p) => Number(p.price))))}
                </span>{" "}
                থেকে
              </p>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div className="arch-outline">
              <div className="arch aspect-[4/5] w-full bg-primary-deep">
                <img
                  src={home.heroImage || heroImage}
                  alt="ভোরের আলোয় পবিত্র কাবা শরীফ ও তাওয়াফরত হাজিগণ"
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading label="পরিচিতি" title={home.introTitle} description={home.introText} />
            <Link
              to="/about"
              className="mt-8 inline-flex rounded-full border border-primary/25 px-6 py-3 text-[15px] font-semibold text-primary transition-colors hover:bg-secondary"
            >
              আমাদের সম্পর্কে জানুন
            </Link>
          </div>
          <ul className="grid gap-0 self-center">
            {introCards.map((c) => (
              <li key={c.t} className="grid gap-2 border-t border-border py-7 last:border-b">
                <h3 className="font-display text-[21px] font-bold text-primary">{c.t}</h3>
                <p className="max-w-[52ch] text-[16px] leading-[1.8] text-muted-foreground">
                  {c.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <SectionHeading
            label={home.sessionLabel}
            title="হজ প্যাকেজ"
            description="প্রতিটি প্যাকেজে আবাসন, খাবার, পরিবহন ও প্রশিক্ষণ অন্তর্ভুক্ত। আপনার প্রয়োজন অনুযায়ী বেছে নিন।"
          />

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {packages?.map((p) => {
              const featured = p.is_popular;
              return (
                <article
                  key={p.id}
                  className={
                    "relative flex flex-col rounded-[1.75rem] p-7 md:p-8 " +
                    (featured
                      ? "pattern-geometric bg-primary text-primary-foreground shadow-raised lg:-my-4 lg:py-12"
                      : "border border-border bg-card")
                  }
                >
                  {featured && (
                    <span className="absolute top-6 right-6 rounded-full bg-accent px-3 py-1 text-[13px] font-bold text-accent-foreground">
                      সবচেয়ে জনপ্রিয়
                    </span>
                  )}
                  <h3
                    className={
                      "font-display text-[22px] font-bold " +
                      (featured ? "text-primary-foreground" : "text-primary")
                    }
                  >
                    {p.name_bn}
                  </h3>
                  <p
                    className={
                      "mt-1.5 text-[15px] " +
                      (featured ? "text-primary-foreground/70" : "text-muted-foreground")
                    }
                  >
                    {p.tagline}
                  </p>
                  <p
                    className={
                      "font-display mt-7 text-[2.25rem] leading-none font-bold " +
                      (featured ? "text-accent-soft" : "text-primary")
                    }
                  >
                    {formatTaka(Number(p.price))}
                  </p>
                  <p
                    className={
                      "mt-2 text-[14px] " +
                      (featured ? "text-primary-foreground/65" : "text-muted-foreground")
                    }
                  >
                    জনপ্রতি, {p.duration}
                  </p>
                  <PackageFeatures
                    items={[p.hotel, p.food, p.transport, p.training]}
                    dark={featured}
                    className="mt-7 flex-1"
                  />
                  <div className="mt-8 grid gap-2.5">
                    <Link
                      to="/registration"
                      search={{ package: p.slug }}
                      className={
                        "rounded-full px-5 py-3.5 text-center text-[16px] font-bold transition-colors " +
                        (featured
                          ? "bg-accent text-accent-foreground hover:bg-accent-soft"
                          : "bg-primary text-primary-foreground hover:bg-primary-deep")
                      }
                    >
                      আবেদন করুন
                    </Link>
                    <Link
                      to="/packages"
                      className={
                        "rounded-full px-5 py-3 text-center text-[15px] font-semibold " +
                        (featured ? "text-primary-foreground/85" : "text-primary")
                      }
                    >
                      সব সুবিধা দেখুন
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="pattern-geometric bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              label="যাত্রাপথ"
              title="ঢাকা থেকে মক্কা, তারপর ঘরে ফেরা"
              description="কোথা থেকে যাত্রা শুরু, কোন স্থানে কী আমল — প্রতিটি ধাপ আগে থেকেই জেনে নিন।"
              tone="dark"
            />
            <Link
              to="/journey"
              className="mt-8 inline-flex rounded-full border border-accent/50 px-6 py-3 text-[15px] font-semibold text-accent-soft transition-colors hover:bg-accent/10"
            >
              সম্পূর্ণ যাত্রাপথ দেখুন
            </Link>
          </div>
          <JourneyTimeline compact />
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label="গ্যালারি" title="হজ যাত্রার মুহূর্ত" />
            <Link
              to="/gallery"
              className="rounded-full border border-primary/25 px-6 py-3 text-[15px] font-semibold text-primary transition-colors hover:bg-secondary"
            >
              সম্পূর্ণ গ্যালারি
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { src: heroImage, alt: "পবিত্র কাবা শরীফ", label: "মক্কা মোকাররমা" },
              { src: madinahImage, alt: "মসজিদে নববীর সবুজ গম্বুজ", label: "মদিনা মুনাওয়ারা" },
              { src: arafatImage, alt: "আরাফাতের মায়দানে হাজিগণ", label: "আরাফাতের ময়দান" },
            ].map((g, i) => (
              <figure key={g.label} className={i === 1 ? "sm:mt-12" : ""}>
                <div className="arch aspect-[3/4] bg-secondary">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="size-full object-cover"
                  />
                </div>
                <figcaption className="font-display mt-4 text-center text-[18px] font-bold text-primary">
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <SectionHeading
              label="হাজিদের কথা"
              title="যাঁরা আমাদের সঙ্গে হজ করেছেন"
              description="হাজিদের অনুমতি নিয়ে প্রকাশিত বাস্তব অভিজ্ঞতা।"
            />
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
              {testimonials.slice(0, 3).map((t) => (
                <figure key={t.id} className="flex flex-col md:px-8 md:first:pl-0 md:last:pr-0">
                  <span aria-hidden className="font-display text-5xl leading-none text-accent">
                    “
                  </span>
                  <blockquote className="font-display mt-2 flex-1 text-[18px] leading-[1.8] text-pretty text-foreground">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <span className="block text-[16px] font-bold text-primary">
                      {t.pilgrim_name}
                    </span>
                    <span className="text-[14px] text-muted-foreground">
                      হজ {toBn(t.hajj_year)}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link
              to="/experience"
              className="mt-12 inline-flex text-[15px] font-semibold text-primary underline decoration-accent decoration-2 underline-offset-8"
            >
              আরও অভিজ্ঞতা পড়ুন
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-background px-5 py-16 md:py-20">
        <div className="pattern-geometric relative mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-[2rem] bg-primary-deep px-7 py-12 text-primary-foreground md:flex-row md:items-center md:justify-between md:px-14 md:py-16">
          <div>
            <h2 className="text-[1.75rem] leading-[1.35] font-bold md:text-[2.2rem]">
              {home.ctaTitle}
            </h2>
            <p className="mt-3 max-w-[50ch] text-[16px] leading-[1.8] text-primary-foreground/75">
              {home.ctaText}
            </p>
          </div>
          <Link
            to="/registration"
            className="shrink-0 rounded-full bg-accent px-8 py-4 text-[17px] font-bold text-accent-foreground shadow-gold transition-colors hover:bg-accent-soft"
          >
            {home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
