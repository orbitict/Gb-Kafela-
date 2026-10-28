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
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {guides?.map((g) => (
              <article
                key={g.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                {g.photo_url ? (
                  <img
                    src={g.photo_url}
                    alt={g.name}
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="grid aspect-square w-full place-items-center rounded-xl bg-secondary text-4xl font-bold text-primary/30">
                    {g.name.slice(0, 1)}
                  </div>
                )}
                <h2 className="mt-5 font-bold text-primary">{g.name}</h2>
                {g.bio && <p className="mt-2 text-sm text-muted-foreground">{g.bio}</p>}
                {g.experience && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-[11px] font-bold tracking-widest text-accent uppercase">
                      প্রশিক্ষণের অভিজ্ঞতা
                    </p>
                    <p className="mt-1 text-sm text-foreground/85">{g.experience}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
          {guides?.length === 0 && (
            <p className="text-sm text-muted-foreground">টিম সদস্যদের তথ্য শীঘ্রই যোগ করা হবে।</p>
          )}
        </div>
      </section>
    </>
  );
}
