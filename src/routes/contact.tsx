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
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="rounded-[1.75rem] border border-border bg-card p-7 md:p-10">
            <h2 className="text-[1.5rem] font-bold text-primary">যোগাযোগের তথ্য</h2>
            <dl className="mt-7 grid gap-5">
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
                <div key={k} className="border-t border-border pt-4">
                  <dt className="text-[14px] font-semibold text-accent">{k}</dt>
                  <dd className="mt-1 text-[17px] text-foreground/90">
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
                className="rounded-full bg-primary px-7 py-3.5 text-[16px] font-bold text-primary-foreground transition-colors hover:bg-primary-deep"
              >
                কল করুন
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-primary/25 px-7 py-3.5 text-[16px] font-semibold text-primary transition-colors hover:bg-secondary"
              >
                হোয়াটসঅ্যাপ করুন
              </a>
              <a
                href={links.email}
                className="rounded-full border border-primary/25 px-7 py-3.5 text-[16px] font-semibold text-primary transition-colors hover:bg-secondary"
              >
                ইমেইল করুন
              </a>
            </div>
          </div>

          <div className="pattern-geometric rounded-[1.75rem] bg-primary p-7 text-primary-foreground md:p-10">
            <h2 className="text-[1.5rem] font-bold text-accent-soft">পরবর্তী ধাপ</h2>
            <ol className="mt-7 grid gap-5 text-[16px] leading-[1.7] text-primary-foreground/85">
              <li>১. প্যাকেজ দেখে আপনার পছন্দের প্যাকেজ নির্বাচন করুন।</li>
              <li>২. অনলাইনে প্রাথমিক নিবন্ধন ফরম পূরণ করুন।</li>
              <li>৩. আমাদের প্রতিনিধির কল পেয়ে কাগজপত্র কার্যালয়ে জমা দিন।</li>
              <li>৪. প্রশিক্ষণ ক্লাসে অংশ নিন এবং যাত্রার প্রস্তুতি নিন।</li>
            </ol>
            <Link
              to="/registration"
              className="mt-9 inline-flex rounded-full bg-accent px-7 py-3.5 text-[16px] font-bold text-accent-foreground transition-colors hover:bg-accent-soft"
            >
              রেজিস্ট্রেশন করুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
