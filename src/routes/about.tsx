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

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading label="উদ্দেশ্য" title={about.missionTitle} />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">
              {about.mission1}
            </p>
            <p className="text-[15px] leading-relaxed text-pretty text-muted-foreground">
              {about.mission2} আমাদের কার্যালয় {settings.address}-এ অবস্থিত।
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading label="সেবা" title={about.servicesTitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-bold text-primary">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/packages"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              হজ প্যাকেজ দেখুন
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-primary/25 px-6 py-3 text-sm font-semibold text-primary"
            >
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
