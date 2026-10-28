import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { galleryCategories, journeySteps, requiredDocuments, site } from "@/lib/site";

export type Card = { t: string; d: string };

export const defaultContent = {
  settings: {
    nameBn: site.nameBn,
    nameEn: site.nameEn,
    tagline: site.tagline,
    address: site.address,
    phone: site.phone,
    whatsapp: site.whatsapp,
    email: site.email,
    facebook: site.facebook,
    officeHours: "",
    logoUrl: "",
  },
  home: {
    heroLabel: "বিসমিল্লাহির রাহমানির রাহিম",
    heroTitle: "আপনার পবিত্র হজ যাত্রার",
    heroHighlight: "বিশ্বস্ত সঙ্গী",
    heroSubtitle: site.tagline,
    heroImage: "",
    btnPackages: "হজ প্যাকেজ",
    btnRegistration: "রেজিস্ট্রেশন",
    introTitle: "গ্রীন বাংলা হজ কাফেলা",
    introText:
      "পবিত্র হজযাত্রার বিভিন্ন ধাপ, প্রয়োজনীয় প্রস্তুতি এবং সুসংগঠিত ব্যবস্থাপনার মাধ্যমে আপনার পবিত্র হজযাত্রাকে সহজ ও সুন্দর করতে আমরা প্রতিশ্রুতিবদ্ধ।",
    sessionLabel: "২০২৬ সেশন",
    ctaTitle: "এ বছরের হজ নিবন্ধন চলছে",
    ctaText:
      "আসন সীমিত। অনলাইনে প্রাথমিক নিবন্ধন সম্পন্ন করুন, আমাদের প্রতিনিধি আপনাকে ফোনে বিস্তারিত জানাবেন।",
    ctaButton: "রেজিস্ট্রেশন করুন",
  },
  introCards: [
    {
      t: "সুসংগঠিত ব্যবস্থাপনা",
      d: "নিবন্ধন থেকে দেশে ফেরা পর্যন্ত প্রতিটি ধাপ পূর্বপরিকল্পিত ও তত্ত্বাবধানে পরিচালিত।",
    },
    {
      t: "পূর্ণাঙ্গ প্রশিক্ষণ",
      d: "ব্যবহারিক প্রশিক্ষণ ক্লাস — হজের ফরজ, ওয়াজিব, তাওয়াফ ও সাঈ শেখানো হয়।",
    },
    { t: "অভিজ্ঞ গাইড", d: "প্রতিটি গ্রুপের সঙ্গে অভিজ্ঞ আলেম ও গাইড, ২৪ ঘণ্টা সহায়তা।" },
  ] as Card[],
  about: {
    heroTitle: "গ্রীন বাংলা হজ কাফেলা",
    heroText:
      "পবিত্র হজযাত্রার বিভিন্ন ধাপ, প্রয়োজনীয় প্রস্তুতি এবং সুসংগঠিত ব্যবস্থাপনার মাধ্যমে আপনার পবিত্র হজযাত্রাকে সহজ ও সুন্দর করতে আমরা প্রতিশ্রুতিবদ্ধ।",
    missionTitle: "আমাদের লক্ষ্য",
    mission1:
      "একজন নতুন হাজি যেন হজের প্রতিটি ধাপ আগেই বুঝে নিতে পারেন, প্রয়োজনীয় কাগজপত্র সময়মতো প্রস্তুত করতে পারেন এবং যাত্রাপথে কোনো দুশ্চিন্তায় না পড়েন — এটিই আমাদের মূল লক্ষ্য। আমরা শুধু একটি প্যাকেজ বিক্রি করি না, বরং হজের প্রস্তুতি থেকে দেশে ফেরা পর্যন্ত পুরো যাত্রাটি সঙ্গে থেকে পরিচালনা করি।",
    mission2:
      "প্রতিটি কাফেলায় অভিজ্ঞ আলেম ও গাইড থাকেন, যাঁরা ফিকহি মাসআলা, দোয়া ও হজের আমল সম্পর্কে সরাসরি দিকনির্দেশনা দেন। বয়স্ক ও অসুস্থ হাজিদের জন্য আলাদা সহায়তা ব্যবস্থা রাখা হয়।",
    servicesTitle: "আমাদের সেবাসমূহ",
  },
  services: [
    {
      t: "হজ নিবন্ধন ও কাগজপত্র",
      d: "সরকারি নিবন্ধন, পাসপোর্ট, ভিসা ও মেডিকেল প্রক্রিয়া সম্পূর্ণ তত্ত্বাবধানে।",
    },
    { t: "প্রশিক্ষণ কার্যক্রম", d: "ধারাবাহিক প্রশিক্ষণ ক্লাস ও ব্যবহারিক অনুশীলন।" },
    { t: "আবাসন ও খাবার", d: "মক্কা ও মদিনায় নির্ধারিত হোটেল এবং বাংলা খাবারের ব্যবস্থা।" },
    { t: "পরিবহন ব্যবস্থা", d: "বিমান টিকিট, এসি বাস, ট্রেন ও অভ্যন্তরীণ যাতায়াত।" },
    { t: "গাইড সেবা", d: "প্রতিটি গ্রুপে অভিজ্ঞ আলেম গাইড ও ২৪ ঘণ্টা যোগাযোগ।" },
    { t: "জিয়ারত কার্যক্রম", d: "মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহ পরিদর্শনের ব্যবস্থা।" },
  ] as Card[],
  journey: journeySteps.map((s) => ({ t: s.place, d: s.note })) as Card[],
  documents: requiredDocuments.map((s) => ({ t: s.title, d: s.detail })) as Card[],
  categories: galleryCategories.map((c) => ({ t: c.label, d: c.value })) as Card[],
};

export type SiteContent = typeof defaultContent;
export type ContentKey = keyof SiteContent;

export const siteContentQuery = queryOptions({
  queryKey: ["site_content"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_content").select("key,value");
    if (error) throw error;
    return data;
  },
  staleTime: 60_000,
});

export function mergeContent(rows: { key: string; value: unknown }[] | undefined): SiteContent {
  const out = structuredClone(defaultContent) as Record<string, unknown>;
  for (const r of rows ?? []) {
    if (!(r.key in out)) continue;
    const base = out[r.key];
    if (Array.isArray(base)) {
      if (Array.isArray(r.value)) out[r.key] = r.value;
    } else if (r.value && typeof r.value === "object") {
      const merged = { ...(base as object) } as Record<string, unknown>;
      for (const [k, v] of Object.entries(r.value)) if (typeof v === "string") merged[k] = v;
      out[r.key] = merged;
    }
  }
  return out as SiteContent;
}

const bnToEn = (s: string) => s.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));

export function phoneDigits(phone: string): string {
  const digits = bnToEn(phone).replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return "88" + digits;
  return digits;
}

export function useSiteContent() {
  const { data } = useQuery(siteContentQuery);
  const c = mergeContent(data);
  const s = c.settings;
  return {
    ...c,
    links: {
      phone: `tel:+${phoneDigits(s.phone)}`,
      whatsapp: `https://wa.me/${phoneDigits(s.whatsapp || s.phone)}`,
      email: `mailto:${s.email}`,
    },
  };
}
