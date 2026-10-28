import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { testimonialsQuery } from "@/lib/content-queries";
import { toBn } from "@/lib/site";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "হাজীদের অভিজ্ঞতা — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "Our Pilgrims Say — গ্রীন বাংলা হজ কাফেলার সঙ্গে হজ পালন করা হাজিদের বাস্তব অভিজ্ঞতা।",
      },
      { property: "og:title", content: "হাজীদের অভিজ্ঞতা — গ্রীন বাংলা হজ কাফেলা" },
      { property: "og:description", content: "হাজিদের বাস্তব অভিজ্ঞতা ও মন্তব্য।" },
    ],
  }),
  component: Experience,
});

function Experience() {
  const { data: testimonials } = useQuery(testimonialsQuery);

  return (
    <>
      <PageHero
        label="Our Pilgrims Say"
        title="⭐ হাজীদের অভিজ্ঞতা"
        description="বাস্তব হাজিদের অনুমতি নিয়ে তাঁদের বক্তব্য ও ছবি প্রকাশ করা হয়েছে।"
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials?.map((t) => (
              <figure
                key={t.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <blockquote className="text-[15px] leading-relaxed text-pretty">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt={t.pilgrim_name}
                      loading="lazy"
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid size-12 place-items-center rounded-full bg-secondary font-bold text-primary/40">
                      {t.pilgrim_name.slice(0, 1)}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-bold text-primary">— {t.pilgrim_name}</span>
                    <span className="text-xs text-muted-foreground">হজ {toBn(t.hajj_year)}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/registration"
              className="inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-gold"
            >
              আপনিও আমাদের সঙ্গে চলুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
