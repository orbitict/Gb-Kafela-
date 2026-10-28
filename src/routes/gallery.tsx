import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import heroImage from "@/assets/hero-makkah.jpg";
import madinahImage from "@/assets/gallery-madinah.jpg";
import arafatImage from "@/assets/gallery-arafat.jpg";
import { PageHero } from "@/components/site/PageHero";
import { galleryQuery } from "@/lib/content-queries";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "হজ গ্যালারি — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "পূর্ববর্তী হজযাত্রার বাস্তব ছবি — মক্কা, মদিনা, প্রশিক্ষণ কার্যক্রম, হাজিদের বিদায় ও গ্রুপ কার্যক্রম।",
      },
      { property: "og:title", content: "হজ গ্যালারি — গ্রীন বাংলা হজ কাফেলা" },
      { property: "og:description", content: "পূর্ববর্তী হজযাত্রার বাস্তব ছবি।" },
    ],
  }),
  component: Gallery,
});

const fallback = [
  { id: "f1", image_url: heroImage, caption: "মক্কা — হারাম শরীফে তাওয়াফ", category: "makkah" },
  { id: "f2", image_url: madinahImage, caption: "মদিনা — মসজিদে নববী", category: "madinah" },
  {
    id: "f3",
    image_url: arafatImage,
    caption: "আরাফাতের মায়দানে দোয়া",
    category: "our-hajj-journey",
  },
];

function Gallery() {
  const { categories } = useSiteContent();
  const galleryCategories = categories.map((c) => ({ value: c.d, label: c.t }));
  const { data } = useQuery(galleryQuery);
  const [filter, setFilter] = useState<string>("all");

  const images = data && data.length > 0 ? data : fallback;
  const visible = filter === "all" ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <PageHero
        label="গ্যালারি"
        title="হজ গ্যালারি"
        description="গ্রীন বাংলা হজ কাফেলার বাস্তব হজযাত্রার ছবি — আমাদের নিজেদের কাফেলার মুহূর্তগুলো।"
      />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="flex flex-wrap gap-2">
            {[{ value: "all", label: "সবগুলো" }, ...galleryCategories].map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setFilter(c.value)}
                className={
                  "cursor-pointer rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors " +
                  (filter === c.value
                    ? "bg-primary text-primary-foreground"
                    : "border border-input bg-card text-foreground/75 hover:border-primary/40")
                }
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((img) => (
              <figure key={img.id}>
                <img
                  src={img.image_url}
                  alt={img.caption || "হজ যাত্রার ছবি"}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-[4/5] w-full rounded-[1.25rem] bg-secondary object-cover"
                />
                {img.caption && (
                  <figcaption className="mt-3 text-[15px] font-medium text-foreground/80">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-10 text-[16px] text-muted-foreground">
              এই ক্যাটাগরিতে এখনো ছবি যোগ করা হয়নি।
            </p>
          )}
        </div>
      </section>
    </>
  );
}
