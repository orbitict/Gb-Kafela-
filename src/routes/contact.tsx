import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "যোগাযোগ — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "গ্রীন বাংলা হজ কাফেলার কার্যালয়ের ঠিকানা (মিডল আলিপুর, ফরিদপুর), মোবাইল, ইমেইল ও হোয়াটসঅ্যাপ নম্বর।",
      },
      { property: "og:title", content: "যোগাযোগ — গ্রীন বাংলা হজ কাফেলা" },
      {
        property: "og:description",
        content: "কার্যালয়ের ঠিকানা, মোবাইল, ইমেইল ও হোয়াটসঅ্যাপ নম্বর।",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { settings: site, links } = useSiteContent();
  return (
    <>
      <PageHero
        label="যোগাযোগ"
        title="আমাদের সঙ্গে কথা বলুন"
        description="হজ প্যাকেজ, নিবন্ধন বা প্রশিক্ষণ সম্পর্কে যেকোনো প্রশ্নে সরাসরি ফোন করুন বা কার্যালয়ে আসুন।"
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 md:py-20">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
            <h2 className="text-lg font-bold text-primary">যোগাযোগের তথ্য</h2>
            <dl className="mt-6 grid gap-5">
              {[
                ["কার্যালয়ের ঠিকানা", site.address],
                ["মোবাইল", site.phone],
                ...(site.whatsapp && site.whatsapp !== site.phone
                  ? [["হোয়াটসঅ্যাপ", site.whatsapp]]
                  : []),
                ["ইমেইল", site.email],
                ["ফেসবুক পেজ", site.facebook.replace(/^https?:\/\/(www\.)?/, "")],
                ...(site.officeHours ? [["অফিস সময়", site.officeHours]] : []),
              ].map(([k, v]) => (
                <div key={k} className="border-l-2 border-accent/40 pl-3">
                  <dt className="text-[11px] font-bold tracking-widest text-accent uppercase">
                    {k}
                  </dt>
                  <dd className="mt-1 text-[15px] text-foreground/85">
                    {k === "ফেসবুক পেজ" ? (
                      <a
                        href={site.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-2 hover:underline"
                      >
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.phone}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                কল করুন
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-primary/25 px-6 py-3 text-sm font-semibold text-primary"
              >
                হোয়াটসঅ্যাপ করুন
              </a>
              <a
                href={links.email}
                className="rounded-xl border border-primary/25 px-6 py-3 text-sm font-semibold text-primary"
              >
                ইমেইল করুন
              </a>
            </div>
          </div>

          <div className="pattern-geometric rounded-3xl bg-primary p-6 text-primary-foreground md:p-8">
            <h2 className="text-lg font-bold text-accent-soft">পরবর্তী ধাপ</h2>
            <ol className="mt-6 grid gap-4 text-sm text-primary-foreground/85">
              <li>১. প্যাকেজ দেখে আপনার পছন্দের প্যাকেজ নির্বাচন করুন।</li>
              <li>২. অনলাইনে প্রাথমিক নিবন্ধন ফরম পূরণ করুন।</li>
              <li>৩. আমাদের প্রতিনিধির কল পেয়ে কাগজপত্র কার্যালয়ে জমা দিন।</li>
              <li>৪. প্রশিক্ষণ ক্লাসে অংশ নিন এবং যাত্রার প্রস্তুতি নিন।</li>
            </ol>
            <Link
              to="/registration"
              className="mt-8 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
            >
              রেজিস্ট্রেশন করুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
