import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { packagesQuery } from "@/lib/content-queries";
import { formatTaka } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "হজ প্যাকেজ — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "ইকোনমি, স্ট্যান্ডার্ড ও প্রিমিয়াম হজ প্যাকেজ — মূল্য, আবাসন, খাবার, পরিবহন ও প্রশিক্ষণসহ বিস্তারিত সুবিধা।",
      },
      { property: "og:title", content: "হজ প্যাকেজ — গ্রীন বাংলা হজ কাফেলা" },
      {
        property: "og:description",
        content: "ইকোনমি, স্ট্যান্ডার্ড ও প্রিমিয়াম হজ প্যাকেজের মূল্য ও সুবিধা।",
      },
    ],
  }),
  component: Packages,
});

function Packages() {
  const { documents } = useSiteContent();
  const { data: packages, isLoading } = useQuery(packagesQuery);

  return (
    <>
      <PageHero
        label="প্যাকেজ"
        title="হজ প্যাকেজ সমূহ"
        description="প্রতিটি প্যাকেজে যাত্রার সময়কাল, হোটেল, খাবার, পরিবহন, প্রশিক্ষণ ও অন্যান্য সুবিধা স্পষ্টভাবে উল্লেখ করা আছে।"
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          {isLoading && <p className="text-sm text-muted-foreground">লোড হচ্ছে…</p>}

          <div className="grid gap-8">
            {packages?.map((p) => (
              <article
                key={p.id}
                className={
                  "relative overflow-hidden rounded-3xl bg-card p-6 md:p-8 " +
                  (p.is_popular
                    ? "border-2 border-accent shadow-raised"
                    : "border border-border shadow-soft")
                }
              >
                {p.is_popular && (
                  <span className="absolute top-0 right-0 bg-accent px-4 py-1 text-[10px] font-bold text-accent-foreground uppercase">
                    জনপ্রিয়
                  </span>
                )}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-primary">{p.name_bn}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{formatTaka(Number(p.price))}</p>
                    <p className="text-xs text-muted-foreground">জনপ্রতি</p>
                  </div>
                </div>

                <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {[
                    ["যাত্রার সময়কাল", p.duration],
                    ["হোটেল / আবাসন", p.hotel],
                    ["খাবার", p.food],
                    ["পরিবহন", p.transport],
                    ["প্রশিক্ষণ", p.training],
                    ["অন্যান্য সুবিধা", p.other_facilities],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="border-l-2 border-accent/40 pl-3">
                        <dt className="text-[11px] font-bold tracking-widest text-accent uppercase">
                          {k}
                        </dt>
                        <dd className="mt-1 text-sm text-foreground/85">{v}</dd>
                      </div>
                    ))}
                </dl>

                {p.details && (
                  <p className="mt-6 rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
                    {p.details}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/registration"
                    search={{ package: p.slug }}
                    className={
                      "rounded-xl px-6 py-3 text-sm font-bold " +
                      (p.is_popular
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground")
                    }
                  >
                    এখনই আবেদন করুন
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-xl border border-primary/25 px-6 py-3 text-sm font-semibold text-primary"
                  >
                    প্রশ্ন আছে?
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 rounded-2xl border border-accent/30 bg-card p-4 text-sm text-muted-foreground">
            প্যাকেজের মূল্য, সুবিধা ও শর্ত বাস্তব তথ্য অনুযায়ী প্রদর্শিত হয়। সব তথ্য অ্যাডমিন
            প্যানেল থেকে পরিবর্তনযোগ্য।
          </p>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading
            label="ডকুমেন্টস"
            title="হজের জন্য প্রয়োজনীয় কাগজপত্র"
            description="নিবন্ধনের সময় নিচের কাগজপত্রগুলো প্রস্তুত রাখুন।"
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {documents.map((d) => (
              <li key={d.t} className="rounded-2xl border border-border bg-background p-5">
                <h3 className="font-bold text-primary">{d.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
