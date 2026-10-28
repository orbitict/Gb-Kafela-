import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { trainingSessionsQuery, trainingTopicsQuery } from "@/lib/content-queries";
import { formatBnDate, toBn } from "@/lib/site";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "হজ প্রশিক্ষণ ও শিডিউল — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "হজের ফরজ, ওয়াজিব, তাওয়াফ, সাঈ, আরাফাত, মুযদালিফা ও মিনা — প্রশিক্ষণের বিষয়সমূহ এবং প্রশিক্ষণ ক্লাসের শিডিউল।",
      },
      { property: "og:title", content: "হজ প্রশিক্ষণ ও শিডিউল — গ্রীন বাংলা হজ কাফেলা" },
      {
        property: "og:description",
        content: "প্রশিক্ষণের বিষয়সমূহ এবং প্রশিক্ষণ ক্লাসের শিডিউল।",
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
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            label="বিষয়সমূহ"
            title="প্রশিক্ষণে যা শেখানো হয়"
            description="ফরজ থেকে শুরু করে সৌদি আরবের নিয়মকানুন — হজের ক্রম অনুযায়ী সাজানো।"
          />
          <ol className="mt-12 grid gap-x-12 md:grid-cols-2">
            {topics?.map((t, i) => (
              <li key={t.id} className="flex gap-5 border-t border-border py-6">
                <span className="font-display w-8 shrink-0 text-[20px] font-bold text-accent">
                  {toBn(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-[19px] font-bold text-primary">{t.title}</h3>
                  {t.content && (
                    <p className="mt-2 text-[16px] leading-[1.75] text-muted-foreground">
                      {t.content}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pattern-geometric bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHeading
            label="শিডিউল"
            title="প্রশিক্ষণ ক্লাসের তারিখ"
            description="প্রতিটি ক্লাসের সময়, স্থান ও প্রশিক্ষক।"
            tone="dark"
          />
          <div className="mt-12 grid gap-5">
            {sessions?.map((s) => (
              <article
                key={s.id}
                className="grid gap-6 rounded-[1.5rem] border border-accent/25 bg-primary-deep/50 p-6 md:grid-cols-[200px_1fr] md:items-center md:p-8"
              >
                <div>
                  <p className="text-[14px] font-semibold text-accent-soft">{s.title}</p>
                  <p className="font-display mt-1 text-[1.6rem] leading-snug font-bold">
                    {formatBnDate(s.session_date)}
                  </p>
                </div>
                <dl className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["সময়", s.session_time],
                    ["স্থান", s.location],
                    ["বিষয়", s.topic],
                    ["প্রশিক্ষক", s.instructor],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[14px] text-primary-foreground/60">{k}</dt>
                        <dd className="mt-1 text-[16px] font-medium">{v}</dd>
                      </div>
                    ))}
                </dl>
              </article>
            ))}
            {sessions?.length === 0 && (
              <p className="text-[16px] text-primary-foreground/70">
                শিডিউল শীঘ্রই প্রকাশ করা হবে।
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
