import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { packagesQuery } from "@/lib/content-queries";
import { useSiteContent } from "@/lib/site-content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/registration")({
  validateSearch: (search: Record<string, unknown>): { package?: string } => {
    const value = search["package"];
    return typeof value === "string" ? { package: value } : {};
  },
  head: () => ({
    meta: [
      { title: "হজ রেজিস্ট্রেশন — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content:
          "অনলাইনে হজ রেজিস্ট্রেশন ফরম পূরণ করুন — আবেদনকারীর তথ্য, পাসপোর্ট তথ্য ও প্যাকেজ নির্বাচন।",
      },
      { property: "og:title", content: "হজ রেজিস্ট্রেশন — গ্রীন বাংলা হজ কাফেলা" },
      { property: "og:description", content: "অনলাইনে হজ রেজিস্ট্রেশন ফরম পূরণ করুন।" },
    ],
  }),
  component: Registration,
});

const emptyForm = {
  full_name: "",
  guardian_name: "",
  date_of_birth: "",
  nid_number: "",
  passport_number: "",
  mobile: "",
  address: "",
  note: "",
};

function Registration() {
  const { documents } = useSiteContent();
  const search = Route.useSearch();
  const { data: packages } = useQuery(packagesQuery);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState<string | undefined>(search["package"]);
  const [code, setCode] = useState<string | null>(null);

  const activePackage = selected ?? search["package"] ?? packages?.[0]?.slug;

  const mutation = useMutation({
    mutationFn: async () => {
      // anon users have no SELECT on registrations, so insert().select() fails.
      // A SECURITY DEFINER RPC inserts the row and returns only the code.
      const rpc = supabase.rpc as unknown as (
        fn: string,
        args: Record<string, string | null>,
      ) => Promise<{ data: string | null; error: { message: string } | null }>;
      const { data, error } = await rpc.call(supabase, "submit_registration", {
        _full_name: form.full_name.trim(),
        _guardian_name: form.guardian_name.trim(),
        _date_of_birth: form.date_of_birth || null,
        _nid_number: form.nid_number.trim(),
        _passport_number: form.passport_number.trim(),
        _mobile: form.mobile.trim(),
        _address: form.address.trim(),
        _package_slug: activePackage!,
        _note: form.note.trim(),
      });
      if (error || !data) throw new Error(error?.message ?? "No code returned");
      return { code: data };
    },
    onSuccess: (data) => {
      setCode(data.code);
      setForm(emptyForm);
      toast.success("আপনার নিবন্ধন জমা হয়েছে");
    },
    onError: () => toast.error("জমা দেওয়া যায়নি। আবার চেষ্টা করুন।"),
  });

  const field = (name: keyof typeof emptyForm) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value })),
  });

  const inputClass =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-[15px] outline-none focus:border-accent focus:ring-2 focus:ring-ring/40";

  if (code) {
    return (
      <>
        <PageHero label="নিবন্ধন" title="আপনার আবেদন জমা হয়েছে" />
        <section className="bg-background">
          <div className="mx-auto max-w-2xl px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">আপনার রেজিস্ট্রেশন নম্বর</p>
            <p className="mt-2 text-3xl font-bold text-primary">{code}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              নম্বরটি সংরক্ষণ করুন। আমাদের প্রতিনিধি ৪৮ ঘণ্টার মধ্যে আপনার সঙ্গে যোগাযোগ করে পরবর্তী
              ধাপ ও কাগজপত্র জমার নিয়ম জানাবেন।
            </p>
            <button
              type="button"
              onClick={() => setCode(null)}
              className="mt-8 cursor-pointer rounded-xl border border-primary/25 px-6 py-3 text-sm font-semibold text-primary"
            >
              আরেকটি আবেদন করুন
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        label="নিবন্ধন"
        title="অনলাইন হজ রেজিস্ট্রেশন"
        description="নিচের ফরমটি পূরণ করে প্রাথমিক নিবন্ধন সম্পন্ন করুন। তথ্যগুলো পাসপোর্ট অনুযায়ী দিন।"
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!activePackage) {
                toast.error("একটি প্যাকেজ নির্বাচন করুন");
                return;
              }
              const digits = form.mobile
                .replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))
                .replace(/\D/g, "");
              if (!/^(?:88)?01[3-9]\d{8}$/.test(digits)) {
                toast.error("সঠিক মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)");
                return;
              }
              mutation.mutate();
            }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
          >
            <h2 className="text-lg font-bold text-primary">আবেদনকারীর তথ্য</h2>

            <div className="mt-6 grid gap-5">
              <div>
                <label className="mb-2 block text-[13px] font-semibold">
                  নাম (পাসপোর্ট অনুযায়ী) *
                </label>
                <input
                  required
                  className={inputClass}
                  placeholder="আপনার পূর্ণ নাম"
                  {...field("full_name")}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold">পিতা / স্বামীর নাম</label>
                  <input className={inputClass} {...field("guardian_name")} />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold">জন্মতারিখ</label>
                  <input type="date" className={inputClass} {...field("date_of_birth")} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold">NID নম্বর</label>
                  <input className={inputClass} {...field("nid_number")} />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold">পাসপোর্ট নম্বর</label>
                  <input className={inputClass} {...field("passport_number")} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">মোবাইল নম্বর *</label>
                <input
                  required
                  type="tel"
                  className={inputClass}
                  placeholder="০১৭০০-০০০০০০"
                  {...field("mobile")}
                />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">ঠিকানা</label>
                <textarea rows={3} className={inputClass} {...field("address")} />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold">প্যাকেজ নির্বাচন *</label>
                <div className="flex flex-wrap gap-2">
                  {packages?.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setSelected(p.slug)}
                      className={
                        "cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition-colors " +
                        (activePackage === p.slug
                          ? "bg-primary text-primary-foreground"
                          : "border border-input bg-card text-foreground/80")
                      }
                    >
                      {p.name_bn}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold">অতিরিক্ত তথ্য</label>
                <textarea
                  rows={3}
                  className={inputClass}
                  placeholder="সঙ্গী/মাহরামের তথ্য, শারীরিক অবস্থা ইত্যাদি"
                  {...field("note")}
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="cursor-pointer rounded-xl bg-accent px-6 py-4 text-base font-bold text-accent-foreground shadow-gold transition-transform active:scale-[0.98] disabled:opacity-60"
              >
                {mutation.isPending ? "জমা হচ্ছে…" : "রেজিস্ট্রেশন জমা দিন"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                জমা দেওয়ার পর আমাদের প্রতিনিধি ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবেন।
              </p>
            </div>
          </form>

          <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold text-primary">প্রয়োজনীয় ডকুমেন্টস</h2>
            <ul className="mt-5 grid gap-4">
              {documents.map((d) => (
                <li key={d.t} className="border-l-2 border-accent/40 pl-3">
                  <h3 className="text-sm font-bold">{d.t}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{d.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-secondary p-3 text-[13px] text-secondary-foreground">
              কাগজপত্র সরাসরি কার্যালয়ে জমা দেওয়া যাবে। অনলাইনে কোনো ডকুমেন্ট আপলোড করতে হবে না।
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
