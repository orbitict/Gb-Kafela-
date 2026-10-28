import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { testimonialsQuery } from "@/lib/content-queries";
import { toBn } from "@/lib/site";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "হাজিদের অভিজ্ঞতা — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content: "গ্রীন বাংলা হজ কাফেলার সঙ্গে হজ পালন করা হাজিদের বাস্তব অভিজ্ঞতা।",
      },
      { property: "og:title", content: "হাজিদের অভিজ্ঞতা — গ্রীন বাংলা হজ কাফেলা" },
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
        label="হাজিদের কথা"
        title="হাজিদের অভিজ্ঞতা"
        description="বাস্তব হাজিদের অনুমতি নিয়ে তাঁদের বক্তব্য ও ছবি প্রকাশ করা হয়েছে।"
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-x-14 md:grid-cols-2">
            {testimonials?.map((t) => (
              <figure key={t.id} className="border-t border-border py-10">
                <span aria-hidden className="font-display text-5xl leading-none text-accent">
                  “
                </span>
                <blockquote className="font-display mt-2 text-[19px] leading-[1.85] text-pretty">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt=""
                      loading="lazy"
                      className="size-14 rounded-full border border-accent/40 object-cover"
                    />
                  ) : (
                    <span className="font-display grid size-14 place-items-center rounded-full bg-primary text-xl font-bold text-accent-soft">
                      {t.pilgrim_name.replace(/^(মোঃ|মোছাঃ)\s*/, "").slice(0, 1)}
                    </span>
                  )}
                  <span>
                    <span className="block text-[17px] font-bold text-primary">
                      {t.pilgrim_name}
                    </span>
                    <span className="text-[14px] text-muted-foreground">
                      হজ {toBn(t.hajj_year)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/registration"
              className="inline-flex rounded-full bg-primary px-8 py-4 text-[16px] font-bold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              আপনিও আমাদের সঙ্গে চলুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
