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
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          {isLoading && <p className="text-[16px] text-muted-foreground">প্যাকেজ লোড হচ্ছে…</p>}

          <div className="grid gap-8">
            {packages?.map((p) => (
              <article
                key={p.id}
                className={
                  "relative grid overflow-hidden rounded-[1.75rem] border bg-card lg:grid-cols-[320px_1fr] " +
                  (p.is_popular ? "border-accent shadow-raised" : "border-border")
                }
              >
                <div
                  className={
                    "flex flex-col justify-between gap-8 p-7 md:p-9 " +
                    (p.is_popular
                      ? "pattern-geometric bg-primary text-primary-foreground"
                      : "bg-secondary/70")
                  }
                >
                  <div>
                    {p.is_popular && (
                      <span className="mb-4 inline-flex rounded-full bg-accent px-3 py-1 text-[13px] font-bold text-accent-foreground">
                        সবচেয়ে জনপ্রিয়
                      </span>
                    )}
                    <h2
                      className={
                        "text-[1.7rem] leading-snug font-bold " +
                        (p.is_popular ? "text-primary-foreground" : "text-primary")
                      }
                    >
                      {p.name_bn}
                    </h2>
                    <p
                      className={
                        "mt-2 text-[15px] " +
                        (p.is_popular ? "text-primary-foreground/70" : "text-muted-foreground")
                      }
                    >
                      {p.tagline}
                    </p>
                  </div>
                  <div>
                    <p
                      className={
                        "font-display text-[2.4rem] leading-none font-bold " +
                        (p.is_popular ? "text-accent-soft" : "text-primary")
                      }
                    >
                      {formatTaka(Number(p.price))}
                    </p>
                    <p
                      className={
                        "mt-2 text-[14px] " +
                        (p.is_popular ? "text-primary-foreground/65" : "text-muted-foreground")
                      }
                    >
                      জনপ্রতি, {p.duration}
                    </p>
                    <div className="mt-6 grid gap-2.5">
                      <Link
                        to="/registration"
                        search={{ package: p.slug }}
                        className={
                          "rounded-full px-6 py-3.5 text-center text-[16px] font-bold transition-colors " +
                          (p.is_popular
                            ? "bg-accent text-accent-foreground hover:bg-accent-soft"
                            : "bg-primary text-primary-foreground hover:bg-primary-deep")
                        }
                      >
                        এই প্যাকেজে আবেদন করুন
                      </Link>
                      <Link
                        to="/contact"
                        className={
                          "rounded-full px-6 py-3 text-center text-[15px] font-semibold " +
                          (p.is_popular ? "text-primary-foreground/85" : "text-primary")
                        }
                      >
                        প্রশ্ন থাকলে যোগাযোগ করুন
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-7 md:p-9">
                  <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {[
                      ["হোটেল ও আবাসন", p.hotel],
                      ["খাবার", p.food],
                      ["পরিবহন", p.transport],
                      ["প্রশিক্ষণ", p.training],
                      ["অন্যান্য সুবিধা", p.other_facilities],
                      ["যাত্রার সময়কাল", p.duration],
                    ]
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k} className="border-t border-border pt-4">
                          <dt className="text-[14px] font-semibold text-accent">{k}</dt>
                          <dd className="mt-1.5 text-[16px] leading-[1.7] text-foreground/85">
                            {v}
                          </dd>
                        </div>
                      ))}
                  </dl>
                  {p.details && (
                    <p className="mt-8 border-l-2 border-accent pl-5 text-[16px] leading-[1.8] text-muted-foreground">
                      {p.details}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            label="ডকুমেন্টস"
            title="হজের জন্য প্রয়োজনীয় কাগজপত্র"
            description="নিবন্ধনের সময় নিচের কাগজপত্রগুলো প্রস্তুত রাখুন।"
          />
          <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
            {documents.map((d) => (
              <li key={d.t} className="border-t border-border py-6">
                <h3 className="font-display text-[19px] font-bold text-primary">{d.t}</h3>
                <p className="mt-2 text-[16px] leading-[1.75] text-muted-foreground">{d.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
