import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { trainingSessionsQuery, trainingTopicsQuery } from "@/lib/content-queries";
import { formatBnDate } from "@/lib/site";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "হজ প্রশিক্ষণ ও শিডিউল — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "হজের ফরজ, ওয়াজিব, তাওয়াফ, সাঈ, আরাফাত, মুযদালিফা ও মিনা — প্রশিক্ষণের বিষয়সমূহ এবং ঢাকার প্রশিক্ষণ শিডিউল।",
      },
      { property: "og:title", content: "হজ প্রশিক্ষণ ও শিডিউল — গ্রীন বাংলা হজ কাফেলা" },
      {
        property: "og:description",
        content: "প্রশিক্ষণের বিষয়সমূহ এবং ঢাকার প্রশিক্ষণ শিডিউল।",
      },
    ],
  }),
  component: Training,
});

function Training() {
  const { data: topics } = useQuery(trainingTopicsQuery);
  const { data: sessions } = useQuery(trainingSessionsQuery);

  return (
    <>
      <PageHero
        label="প্রশিক্ষণ"
        title="হজ প্রশিক্ষণ"
        description="হজের প্রতিটি আমল ব্যবহারিকভাবে শেখানো হয়, যাতে মক্কায় পৌঁছে কোনো কিছুই নতুন মনে না হয়।"
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading label="বিষয়সমূহ" title="প্রশিক্ষণে যা শেখানো হয়" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {topics?.map((t) => (
              <article
                key={t.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <h3 className="font-bold text-primary">{t.title}</h3>
                {t.content && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.content}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <SectionHeading
            label="শিডিউল"
            title="প্রশিক্ষণ শিডিউল"
            description="ক্রম অনুযায়ী প্রশিক্ষণ ক্লাসের তারিখ, সময়, স্থান ও প্রশিক্ষক।"
          />
          <div className="mt-8 grid gap-4">
            {sessions?.map((s) => (
              <article
                key={s.id}
                className="grid gap-4 rounded-2xl border border-border bg-background p-6 md:grid-cols-[auto_1fr]"
              >
                <div className="rounded-xl bg-primary px-5 py-4 text-center text-primary-foreground">
                  <p className="text-[11px] tracking-widest text-accent-soft uppercase">
                    {s.title}
                  </p>
                  <p className="mt-1 font-bold">{formatBnDate(s.session_date)}</p>
                </div>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["সময়", s.session_time],
                    ["স্থান", s.location],
                    ["বিষয়", s.topic],
                    ["প্রশিক্ষক", s.instructor],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[11px] font-bold tracking-widest text-accent uppercase">
                          {k}
                        </dt>
                        <dd className="mt-0.5 text-sm text-foreground/85">{v}</dd>
                      </div>
                    ))}
                </dl>
              </article>
            ))}
            {sessions?.length === 0 && (
              <p className="text-sm text-muted-foreground">শিডিউল শীঘ্রই প্রকাশ করা হবে।</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
