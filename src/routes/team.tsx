import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { guidesQuery } from "@/lib/content-queries";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "হজ গাইড ও টিম — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content: "আমাদের হজ গাইড ও টিম সদস্যদের পরিচিতি এবং হজ প্রশিক্ষণের অভিজ্ঞতা।",
      },
      { property: "og:title", content: "হজ গাইড ও টিম — গ্রীন বাংলা হজ কাফেলা" },
      { property: "og:description", content: "আমাদের হজ গাইড ও টিম সদস্যদের পরিচিতি।" },
    ],
  }),
  component: Team,
});

function Team() {
  const { data: guides } = useQuery(guidesQuery);

  return (
    <>
      <PageHero
        label="আমাদের টিম"
        title="হজ গাইড ও টিম"
        description="প্রতিটি কাফেলার সঙ্গে থাকেন অভিজ্ঞ আলেম ও গাইড, যাঁরা হজের প্রতিটি আমলে দিকনির্দেশনা দেন।"
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {guides?.map((g) => (
              <article key={g.id}>
                <div className="arch aspect-[4/5] bg-secondary">
                  {g.photo_url ? (
                    <img
                      src={g.photo_url}
                      alt={g.name}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="pattern-geometric grid size-full place-items-center bg-primary">
                      <span className="font-display text-7xl font-bold text-accent-soft/80">
                        {g.name.replace(/^(মাওলানা|মুফতি|হাফেজ|মোঃ)\s*/, "").slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
                <h2 className="mt-6 text-[1.4rem] font-bold text-primary">{g.name}</h2>
                {g.bio && <p className="mt-1.5 text-[16px] text-accent">{g.bio}</p>}
                {g.experience && (
                  <p className="mt-4 border-t border-border pt-4 text-[16px] leading-[1.75] text-foreground/80">
                    {g.experience}
                  </p>
                )}
              </article>
            ))}
          </div>
          {guides?.length === 0 && (
            <p className="text-[16px] text-muted-foreground">
              টিম সদস্যদের তথ্য শীঘ্রই যোগ করা হবে।
            </p>
          )}
        </div>
      </section>
    </>
  );
}
