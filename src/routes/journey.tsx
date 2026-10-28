import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "হজ যাত্রা — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "ঢাকা থেকে মক্কা, মদিনা, আরাফাত, মুযদালিফা ও মিনা হয়ে দেশে ফেরা — সম্পূর্ণ হজ যাত্রার ধাপে ধাপে বিবরণ।",
      },
      { property: "og:title", content: "হজ যাত্রা — গ্রীন বাংলা হজ কাফেলা" },
      {
        property: "og:description",
        content: "ঢাকা থেকে মক্কা, মদিনা, আরাফাত, মুযদালিফা ও মিনা হয়ে দেশে ফেরার সম্পূর্ণ পথ।",
      },
    ],
  }),
  component: Journey,
});

function Journey() {
  return (
    <>
      <PageHero
        label="যাত্রাপথ"
        title="সম্পূর্ণ হজ যাত্রা"
        description="একজন নতুন হাজি সহজেই বুঝতে পারবেন — কোথা থেকে যাত্রা শুরু, কোন কোন গুরুত্বপূর্ণ স্থান অতিক্রম করবেন এবং কীভাবে দেশে ফিরবেন।"
      />

      <section className="pattern-geometric bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <JourneyTimeline />
          <div className="mt-12 rounded-2xl border border-accent/25 bg-primary-deep/40 p-6">
            <h2 className="font-bold text-accent-soft">সংক্ষেপে যাত্রাপথ</h2>
            <p className="mt-3 text-sm leading-loose text-primary-foreground/80">
              ঢাকা → মক্কা → মদিনা → আরাফাত → মুযদালিফা → মিনা → মক্কা → ঢাকা
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/training"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
            >
              প্রশিক্ষণের বিষয়সমূহ
            </Link>
            <Link
              to="/registration"
              className="rounded-xl border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              রেজিস্ট্রেশন করুন
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
