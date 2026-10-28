export const site = {
  nameBn: "গ্রীন বাংলা হজ কাফেলা",
  nameEn: "Green Bangla Hajj Kafela",
  tagline:
    "পবিত্র হজযাত্রাকে সহজ ও সুন্দর করতে সঠিক দিকনির্দেশনা, প্রয়োজনীয় প্রস্তুতি এবং সুসংগঠিত ব্যবস্থাপনার মাধ্যমে আমরা হাজিদের পাশে থাকার প্রতিশ্রুতিবদ্ধ।",
  address: "মিডল আলিপুর, ফরিদপুর",
  phone: "০১৮৩৪-৭৫৭৩৭৬",
  phoneHref: "tel:+8801834757376",
  whatsapp: "০১৮৩৪-৭৫৭৩৭৬",
  whatsappHref: "https://wa.me/8801834757376",
  facebook: "https://www.facebook.com/gbhk2k25",
  email: "gbkafela@gmail.com",
  emailHref: "mailto:gbkafela@gmail.com",
};

export const navItems = [
  { to: "/", label: "হোম" },
  { to: "/about", label: "পরিচিতি" },
  { to: "/packages", label: "হজ প্যাকেজ" },
  { to: "/registration", label: "রেজিস্ট্রেশন" },
  { to: "/training", label: "হজ প্রশিক্ষণ" },
  { to: "/journey", label: "হজ যাত্রা" },
  { to: "/gallery", label: "গ্যালারি" },
  { to: "/team", label: "হজ গাইড" },
  { to: "/experience", label: "হাজিদের অভিজ্ঞতা" },
  { to: "/contact", label: "যোগাযোগ" },
] as const;

export const journeySteps = [
  { place: "ঢাকা", note: "কাফেলা সমাবেশ, কাগজপত্র যাচাই ও হযরত শাহজালাল বিমানবন্দর থেকে যাত্রা" },
  { place: "মক্কা মোকাররমা", note: "ইহরাম, উমরাহ সম্পাদন ও হারাম শরীফে ইবাদত" },
  { place: "মদিনা মুনাওয়ারা", note: "রওজা মোবারক জিয়ারত ও ঐতিহাসিক স্থান পরিদর্শন" },
  { place: "আরাফাত", note: "৯ জিলহজ আরাফাতের মায়দানে অবস্থান ও দোয়া" },
  { place: "মুযদালিফা", note: "খোলা আকাশের নিচে রাত্রিযাপন ও কঙ্কর সংগ্রহ" },
  { place: "মিনা", note: "কঙ্কর নিক্ষেপ, কুরবানি ও মাথা মুণ্ডন" },
  { place: "মক্কা", note: "তাওয়াফে জিয়ারত ও বিদায়ী তাওয়াফ" },
  { place: "ঢাকা", note: "দেশে প্রত্যাবর্তন ও হাজিদের বরণ" },
];

export const requiredDocuments = [
  {
    title: "পাসপোর্ট",
    detail: "কমপক্ষে ৮ মাস বৈধতা থাকতে হবে। মূল পাসপোর্ট ও ফটোকপি জমা দিতে হয়।",
  },
  {
    title: "জাতীয় পরিচয়পত্র (NID)",
    detail: "পাসপোর্টের তথ্যের সঙ্গে NID-এর নাম ও জন্মতারিখ মিল থাকা আবশ্যক।",
  },
  {
    title: "ছবি",
    detail: "সাদা ব্যাকগ্রাউন্ডে সাম্প্রতিক ৬ কপি পাসপোর্ট সাইজ ছবি।",
  },
  {
    title: "মেডিকেল ও ভ্যাকসিন কাগজপত্র",
    detail: "মেনিনজাইটিস ও নির্ধারিত টিকার সনদ এবং স্বাস্থ্য পরীক্ষার রিপোর্ট।",
  },
  {
    title: "অন্যান্য প্রয়োজনীয় কাগজপত্র",
    detail: "মোবাইল নম্বর, ঠিকানার প্রমাণ এবং মহিলা হাজির ক্ষেত্রে মাহরামের তথ্য।",
  },
];

export const galleryCategories = [
  { value: "our-hajj-journey", label: "আমাদের হজ যাত্রা" },
  { value: "makkah", label: "মক্কা" },
  { value: "madinah", label: "মদিনা" },
  { value: "training", label: "প্রশিক্ষণ কার্যক্রম" },
  { value: "departure", label: "হাজিদের বিদায়" },
  { value: "group", label: "গ্রুপ কার্যক্রম" },
];

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value: string | number): string {
  return String(value).replace(/\d/g, (d) => bnDigits[Number(d)]!);
}

export function formatTaka(amount: number): string {
  return "৳ " + toBn(new Intl.NumberFormat("en-IN").format(amount));
}

export function formatBnDate(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return `${toBn(d.getDate())} ${months[d.getMonth()]} ${toBn(d.getFullYear())}`;
}
