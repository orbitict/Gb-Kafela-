import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "পরিচিতি — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "গ্রীন বাংলা হজ কাফেলার পরিচিতি, উদ্দেশ্য ও সেবার বিষয়সমূহ — সুসংগঠিত ব্যবস্থাপনায় নিশ্চিন্ত হজযাত্রা।",
      },
      { property: "og:title", content: "পরিচিতি — গ্রীন বাংলা হজ কাফেলা" },
      {
        property: "og:description",
        content: "গ্রীন বাংলা হজ কাফেলার পরিচিতি, উদ্দেশ্য ও সেবার বিষয়সমূহ।",
      },
    ],
  }),
  component: About,
});

function About() {
  const { about, services, settings } = useSiteContent();
  return (
    <>
      <PageHero label="আমাদের সম্পর্কে" title={about.heroTitle} description={about.heroText} />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading label="উদ্দেশ্য" title={about.missionTitle} />
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="font-display text-[19px] leading-[1.9] text-pretty text-foreground/85">
              {about.mission1}
            </p>
            <p className="text-[17px] leading-[1.9] text-pretty text-muted-foreground">
              {about.mission2} আমাদের কার্যালয় {settings.address}-এ অবস্থিত।
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading label="সেবা" title={about.servicesTitle} />
          <div className="mt-10 grid gap-x-10 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.t} className="border-t border-border py-7">
                <h3 className="font-display text-[19px] font-bold text-primary">{s.t}</h3>
                <p className="mt-2 text-[16px] leading-[1.75] text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/packages"
              className="rounded-full bg-primary px-7 py-3.5 text-[16px] font-bold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              হজ প্যাকেজ দেখুন
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-primary/25 px-7 py-3.5 text-[16px] font-semibold text-primary transition-colors hover:bg-secondary"
            >
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
