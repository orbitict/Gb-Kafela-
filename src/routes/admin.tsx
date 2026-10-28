import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatBnDate, formatTaka } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";
import { ImageInput } from "@/components/admin/ImageInput";
import { CardListEditor, ObjectEditor, SmallBtn } from "@/components/admin/ContentEditor";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "অ্যাডমিন প্যানেল — গ্রীন বাংলা হজ কাফেলা" },
      {
        name: "description",
        content: "গ্রীন বাংলা হজ কাফেলার ওয়েবসাইট পরিচালনার অ্যাডমিন প্যানেল।",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "অ্যাডমিন প্যানেল — গ্রীন বাংলা হজ কাফেলা" },
      { property: "og:description", content: "ওয়েবসাইট পরিচালনার অ্যাডমিন প্যানেল।" },
    ],
  }),
  component: AdminPage,
});

type Row = Record<string, string | number | boolean | null>;

const inputClass =
  "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-accent";

type Tab =
  | "dashboard"
  | "settings"
  | "home"
  | "about"
  | "journey"
  | "documents"
  | "registrations"
  | "packages"
  | "guides"
  | "topics"
  | "sessions"
  | "gallery"
  | "testimonials";

const tabs: { id: Tab; label: string }[] = [
  { id: "dashboard", label: "ড্যাশবোর্ড" },
  { id: "registrations", label: "রেজিস্ট্রেশন" },
  { id: "packages", label: "প্যাকেজ" },
  { id: "guides", label: "হজ গাইড" },
  { id: "topics", label: "প্রশিক্ষণ বিষয়" },
  { id: "sessions", label: "শিডিউল" },
  { id: "gallery", label: "গ্যালারি" },
  { id: "testimonials", label: "অভিজ্ঞতা" },
  { id: "home", label: "হোম পেজ" },
  { id: "about", label: "পরিচিতি পেজ" },
  { id: "journey", label: "হজ যাত্রা" },
  { id: "documents", label: "প্রয়োজনীয় কাগজপত্র" },
  { id: "settings", label: "সাইট সেটিংস" },
];

function AdminPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setUserId(session?.user?.id ?? null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const roleQuery = useQuery({
    queryKey: ["is-admin", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });

  if (!ready) return <Shell>লোড হচ্ছে…</Shell>;
  if (!userId) return <SignIn />;
  if (roleQuery.isLoading) return <Shell>অনুমতি যাচাই হচ্ছে…</Shell>;
  if (roleQuery.isError) {
    return (
      <Shell>
        <p className="font-semibold text-foreground">অনুমতি যাচাই করা যায়নি।</p>
        <p className="mt-2 text-sm text-muted-foreground">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => void roleQuery.refetch()}
            className="cursor-pointer rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground"
          >
            আবার চেষ্টা করুন
          </button>
          <SignOutButton />
        </div>
      </Shell>
    );
  }

  if (!roleQuery.data) {
    return (
      <Shell>
        <p className="font-semibold text-foreground">এই অ্যাকাউন্টের অ্যাডমিন অনুমতি নেই।</p>
        <p className="mt-2 text-sm text-muted-foreground">
          অ্যাডমিন অনুমতি যোগ করার পর আবার লগইন করুন।
        </p>
        <div className="mt-6 flex justify-center">
          <SignOutButton />
        </div>
      </Shell>
    );
  }

  return (
    <div className="bg-background">
      <div className="pattern-geometric bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10">
          <div>
            <p className="section-label">অ্যাডমিন</p>
            <h1 className="mt-2 text-2xl font-bold">ড্যাশবোর্ড</h1>
          </div>
          <SignOutButton />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition-colors " +
                (tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-card text-foreground/75")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "dashboard" && <Dashboard onOpen={() => setTab("registrations")} />}
          {tab === "settings" && <SettingsTab />}
          {tab === "home" && <HomeTab />}
          {tab === "about" && <AboutTab />}
          {tab === "journey" && (
            <CardListEditor
              title="হজ যাত্রার ধাপ"
              hint="ক্রম পরিবর্তন করতে ↑ ↓ ব্যবহার করুন।"
              contentKey="journey"
              tLabel="স্থান"
              dLabel="বিবরণ"
            />
          )}
          {tab === "documents" && (
            <CardListEditor
              title="প্রয়োজনীয় কাগজপত্র"
              contentKey="documents"
              tLabel="কাগজের নাম"
              dLabel="বিস্তারিত"
            />
          )}
          {tab === "registrations" && <Registrations />}
          {tab === "packages" && <Packages />}
          {tab === "guides" && <Guides />}
          {tab === "topics" && <Topics />}
          {tab === "sessions" && <Sessions />}
          {tab === "gallery" && <GalleryManager />}
          {tab === "testimonials" && <TestimonialsManager />}
        </div>
      </div>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center text-muted-foreground">{children}</div>
  );
}

function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        void supabase.auth.signOut().then(() => toast.success("লগআউট সম্পন্ন"));
      }}
      className="cursor-pointer rounded-full border border-accent/40 px-4 py-2 text-[13px] font-semibold text-accent-soft"
    >
      লগআউট
    </button>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(mode === "in" ? "লগইন সম্পন্ন" : "অ্যাকাউন্ট তৈরি হয়েছে");
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-3xl border border-border bg-card p-8">
        <p className="section-label">অ্যাডমিন</p>
        <h1 className="mt-2 text-xl font-bold text-primary">
          {mode === "in" ? "অ্যাডমিন লগইন" : "অ্যাডমিন অ্যাকাউন্ট তৈরি"}
        </h1>
        <form
          onSubmit={(e) => {
            void submit(e);
          }}
          className="mt-6 grid gap-4"
        >
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">ইমেইল</span>
            <input
              required
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold">পাসওয়ার্ড</span>
            <input
              required
              type="password"
              minLength={6}
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "অপেক্ষা করুন…" : mode === "in" ? "লগইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-4 cursor-pointer text-[13px] font-semibold text-accent"
        >
          {mode === "in" ? "নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি করুন" : "লগইন পাতায় ফিরুন"}
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-bold text-primary">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* --------------------------------- data ---------------------------------- */

function useTable(table: string, orderBy: string) {
  const qc = useQueryClient();
  const queryKey = ["admin", table];

  const query = useQuery({
    queryKey,
    queryFn: async (): Promise<Row[]> => {
      const client = supabase as unknown as {
        from: (t: string) => {
          select: (c: string) => {
            order: (
              c: string,
              o: { ascending: boolean },
            ) => Promise<{
              data: Row[] | null;
              error: { message: string } | null;
            }>;
          };
        };
      };
      const { data, error } = await client.from(table).select("*").order(orderBy, {
        ascending: true,
      });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey });
  };

  const client = supabase as unknown as {
    from: (t: string) => {
      insert: (v: Row) => Promise<{ error: { message: string } | null }>;
      update: (v: Row) => {
        eq: (c: string, v: string) => Promise<{ error: { message: string } | null }>;
      };
      delete: () => {
        eq: (c: string, v: string) => Promise<{ error: { message: string } | null }>;
      };
    };
  };

  const save = useMutation({
    mutationFn: async (input: Row | { row: Row; silent: true }) => {
      const row = "silent" in input && input.silent === true ? (input.row as Row) : (input as Row);
      const id = row["id"];
      if (typeof id === "string") {
        const { id: _omit, ...rest } = row;
        const { error } = await client.from(table).update(rest).eq("id", id);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await client.from(table).insert(row);
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: (_d, input) => {
      invalidate();
      if (!("silent" in input && input.silent === true)) toast.success("সংরক্ষণ হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await client.from(table).delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      invalidate();
      toast.success("মুছে ফেলা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { rows: query.data ?? [], isLoading: query.isLoading, save, remove };
}

/* ------------------------------ Registrations ----------------------------- */

const statuses = [
  { value: "pending", label: "পেন্ডিং" },
  { value: "approved", label: "অনুমোদিত" },
  { value: "paid", label: "পেইড" },
  { value: "cancelled", label: "বাতিল" },
];

type Registration = {
  id: string;
  code: string;
  full_name: string;
  guardian_name: string;
  date_of_birth: string | null;
  nid_number: string;
  passport_number: string;
  mobile: string;
  address: string;
  package_slug: string;
  note: string;
  status: string;
  created_at: string;
};

function useRegistrations() {
  return useQuery({
    queryKey: ["admin", "registrations"],
    queryFn: async (): Promise<Registration[]> => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

function usePackageNames() {
  const { rows } = useTable("packages", "sort_order");
  return (slug: string) => String(rows.find((p) => p["slug"] === slug)?.["name_bn"] ?? slug);
}

const statusLabel = (v: string) => statuses.find((s) => s.value === v)?.label ?? v;

function exportCsv(rows: Registration[], pkgName: (s: string) => string) {
  const head = [
    "Code",
    "Name",
    "Guardian",
    "DOB",
    "NID",
    "Passport",
    "Mobile",
    "Address",
    "Package",
    "Status",
    "Note",
    "Applied",
  ];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.code,
      r.full_name,
      r.guardian_name,
      r.date_of_birth ?? "",
      r.nid_number,
      r.passport_number,
      r.mobile,
      r.address,
      pkgName(r.package_slug),
      statusLabel(r.status),
      r.note,
      r.created_at.slice(0, 10),
    ]
      .map((v) => esc(String(v ?? "")))
      .join(","),
  );
  const blob = new Blob(["\uFEFF" + [head.join(","), ...lines].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function printRegistration(r: Registration, pkgName: (s: string) => string) {
  const w = window.open("", "_blank");
  if (!w) return;
  const rowsHtml = [
    ["আবেদন নম্বর", r.code],
    ["নাম", r.full_name],
    ["পিতা/স্বামীর নাম", r.guardian_name],
    ["জন্ম তারিখ", formatBnDate(r.date_of_birth)],
    ["NID", r.nid_number],
    ["পাসপোর্ট", r.passport_number],
    ["মোবাইল", r.mobile],
    ["ঠিকানা", r.address],
    ["প্যাকেজ", pkgName(r.package_slug)],
    ["স্ট্যাটাস", statusLabel(r.status)],
    ["নোট", r.note],
    ["আবেদনের তারিখ", formatBnDate(r.created_at)],
  ]
    .map(([k, v]) => `<tr><th>${k}</th><td>${String(v || "—").replace(/</g, "&lt;")}</td></tr>`)
    .join("");
  w.document.write(
    `<html><head><title>${r.code}</title><style>body{font-family:sans-serif;padding:32px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{width:35%;background:#f5f5f5}</style></head><body><h2>গ্রীন বাংলা হজ কাফেলা — রেজিস্ট্রেশন</h2><table>${rowsHtml}</table><script>window.print()</script></body></html>`,
  );
  w.document.close();
}

function Dashboard({ onOpen }: { onOpen: () => void }) {
  const { data = [] } = useRegistrations();
  const pkgName = usePackageNames();
  const bySlug = new Map<string, number>();
  for (const r of data) bySlug.set(r.package_slug, (bySlug.get(r.package_slug) ?? 0) + 1);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <Stat label="মোট আবেদন" value={data.length} />
        {statuses.map((s) => (
          <Stat
            key={s.value}
            label={s.label}
            value={data.filter((r) => r.status === s.value).length}
          />
        ))}
      </div>
      <Card title="প্যাকেজ অনুযায়ী আবেদন">
        {bySlug.size === 0 ? (
          <p className="text-sm text-muted-foreground">এখনো কোনো আবেদন আসেনি।</p>
        ) : (
          <ul className="grid gap-2 text-sm">
            {[...bySlug].map(([slug, n]) => (
              <li key={slug} className="flex justify-between border-b border-border/60 pb-2">
                <span>{pkgName(slug)}</span>
                <strong className="text-primary">{n}</strong>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card title="সর্বশেষ ৫টি আবেদন">
        <ul className="grid gap-2 text-sm">
          {data.slice(0, 5).map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap justify-between gap-2 border-b border-border/60 pb-2"
            >
              <span>
                <strong className="text-primary">{r.code}</strong> · {r.full_name} · {r.mobile}
              </span>
              <span className="text-xs text-muted-foreground">{statusLabel(r.status)}</span>
            </li>
          ))}
          {data.length === 0 && <li className="text-muted-foreground">কোনো আবেদন নেই।</li>}
        </ul>
        <button
          type="button"
          onClick={onOpen}
          className="mt-4 cursor-pointer text-sm font-semibold text-accent"
        >
          সব আবেদন দেখুন →
        </button>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}

function Registrations() {
  const qc = useQueryClient();
  const { data = [] } = useRegistrations();
  const pkgName = usePackageNames();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [pkg, setPkg] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("registrations").update({ status }).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "registrations"] });
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("registrations").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "registrations"] });
      toast.success("আবেদন মুছে ফেলা হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const term = q.trim().toLowerCase();
  const filtered = data.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      (pkg === "all" || r.package_slug === pkg) &&
      (!term || [r.full_name, r.mobile, r.code].some((v) => v.toLowerCase().includes(term))),
  );
  const slugs = [...new Set(data.map((r) => r.package_slug))];

  return (
    <Card title={`রেজিস্ট্রেশন তালিকা (${filtered.length}/${data.length})`}>
      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          className={inputClass}
          placeholder="নাম, মোবাইল বা কোড দিয়ে খুঁজুন"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">সব স্ট্যাটাস</option>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select className={inputClass} value={pkg} onChange={(e) => setPkg(e.target.value)}>
          <option value="all">সব প্যাকেজ</option>
          {slugs.map((s) => (
            <option key={s} value={s}>
              {pkgName(s)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => exportCsv(filtered, pkgName)}
          className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
        >
          Excel (CSV) ডাউনলোড
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">কোনো আবেদন পাওয়া যায়নি।</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-background p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(open === r.id ? null : r.id)}
                  className="cursor-pointer text-left"
                >
                  <span className="font-semibold text-primary">{r.code}</span>{" "}
                  <span className="font-semibold">{r.full_name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {r.mobile} · {pkgName(r.package_slug)} · {formatBnDate(r.created_at)}
                  </span>
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={r.status}
                    onChange={(e) => update.mutate({ id: r.id, status: e.target.value })}
                    className="cursor-pointer rounded-lg border border-input bg-card px-2 py-1.5 text-xs"
                  >
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setOpen(open === r.id ? null : r.id)}
                    className="cursor-pointer rounded-lg border border-input px-3 py-1.5 text-xs font-semibold"
                  >
                    {open === r.id ? "বন্ধ" : "বিস্তারিত"}
                  </button>
                  <button
                    type="button"
                    onClick={() => printRegistration(r, pkgName)}
                    className="cursor-pointer rounded-lg border border-input px-3 py-1.5 text-xs font-semibold"
                  >
                    প্রিন্ট
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`${r.code} মুছে ফেলতে চান?`)) remove.mutate(r.id);
                    }}
                    className="cursor-pointer rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive"
                  >
                    ডিলিট
                  </button>
                </div>
              </div>
              {open === r.id && (
                <dl className="mt-4 grid gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
                  {[
                    ["পিতা/স্বামীর নাম", r.guardian_name],
                    ["জন্ম তারিখ", formatBnDate(r.date_of_birth)],
                    ["NID", r.nid_number],
                    ["পাসপোর্ট", r.passport_number],
                    ["ঠিকানা", r.address],
                    ["নোট", r.note],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[11px] font-bold text-accent">{k}</dt>
                      <dd>{v || "—"}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/* --------------------------------- fields -------------------------------- */

function Field({
  label,
  name,
  defaultValue,
  type,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold">{label}</span>
      {textarea ? (
        <textarea name={name} rows={3} defaultValue={defaultValue ?? ""} className={inputClass} />
      ) : (
        <input
          name={name}
          type={type ?? "text"}
          defaultValue={defaultValue ?? ""}
          className={inputClass}
        />
      )}
    </label>
  );
}

function Check({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4" />
      {label}
    </label>
  );
}

/* -------------------------------- Packages ------------------------------- */

function Packages() {
  const { rows, save } = useTable("packages", "sort_order");

  return (
    <div className="grid gap-6">
      {rows.map((p) => (
        <Card key={String(p["id"])} title={`${String(p["name_bn"])} (${String(p["name_en"])})`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              save.mutate({
                id: String(p["id"]),
                name_bn: String(fd.get("name_bn")),
                tagline: String(fd.get("tagline")),
                price: Number(fd.get("price")),
                duration: String(fd.get("duration")),
                hotel: String(fd.get("hotel")),
                food: String(fd.get("food")),
                transport: String(fd.get("transport")),
                training: String(fd.get("training")),
                other_facilities: String(fd.get("other_facilities")),
                details: String(fd.get("details")),
                is_popular: fd.get("is_popular") === "on",
                is_active: fd.get("is_active") === "on",
              });
            }}
            className="grid gap-4"
          >
            <p className="text-sm text-muted-foreground">
              বর্তমান মূল্য:{" "}
              <strong className="text-primary">{formatTaka(Number(p["price"]))}</strong>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="প্যাকেজের নাম" name="name_bn" defaultValue={String(p["name_bn"])} />
              <Field
                label="মূল্য (টাকা)"
                name="price"
                type="number"
                defaultValue={String(p["price"])}
              />
              <Field label="সংক্ষিপ্ত বর্ণনা" name="tagline" defaultValue={String(p["tagline"])} />
              <Field label="যাত্রার সময়কাল" name="duration" defaultValue={String(p["duration"])} />
              <Field label="হোটেল" name="hotel" defaultValue={String(p["hotel"])} />
              <Field label="খাবার" name="food" defaultValue={String(p["food"])} />
              <Field label="পরিবহন" name="transport" defaultValue={String(p["transport"])} />
              <Field label="প্রশিক্ষণ" name="training" defaultValue={String(p["training"])} />
            </div>
            <Field
              label="অন্যান্য সুবিধা"
              name="other_facilities"
              defaultValue={String(p["other_facilities"])}
            />
            <Field label="বিস্তারিত" name="details" textarea defaultValue={String(p["details"])} />
            <div className="flex flex-wrap gap-6">
              <Check
                label="জনপ্রিয় হিসেবে দেখাও"
                name="is_popular"
                defaultChecked={Boolean(p["is_popular"])}
              />
              <Check
                label="ওয়েবসাইটে প্রকাশিত"
                name="is_active"
                defaultChecked={Boolean(p["is_active"])}
              />
            </div>
            <button
              type="submit"
              className="w-fit cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground"
            >
              সংরক্ষণ করুন
            </button>
          </form>
        </Card>
      ))}
    </div>
  );
}

/* ----------------------------- Generic manager --------------------------- */

type FieldSpec = {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  image?: boolean;
};

function ListManager({
  title,
  table,
  fields,
  primary,
  secondary,
  selectField,
}: {
  title: string;
  table: string;
  fields: FieldSpec[];
  primary: (row: Row) => string;
  secondary?: (row: Row) => string;
  selectField?: { name: string; label: string; options: { value: string; label: string }[] };
}) {
  const { rows, save, remove } = useTable(table, "sort_order");
  const [editing, setEditing] = useState<string | null>(null);

  async function move(i: number, dir: -1 | 1) {
    const a = rows[i];
    const b = rows[i + dir];
    if (!a || !b) return;
    const ao = Number(a["sort_order"] ?? i);
    let bo = Number(b["sort_order"] ?? i + dir);
    if (ao === bo) bo = ao + dir;
    try {
      await save.mutateAsync({ row: { id: String(a["id"]), sort_order: bo }, silent: true });
      await save.mutateAsync({ row: { id: String(b["id"]), sort_order: ao }, silent: true });
      toast.success("ক্রম পরিবর্তন হয়েছে");
    } catch {
      // error toast already shown by the mutation
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>, id?: string) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const row: Row = {};
    if (id) row["id"] = id;
    for (const f of fields) {
      if (f.name === "sort_order") {
        if (!id)
          row[f.name] = rows.length
            ? Math.max(...rows.map((r) => Number(r["sort_order"] ?? 0))) + 1
            : 0;
        continue;
      }
      const value = String(fd.get(f.name) ?? "");
      row[f.name] =
        f.type === "number" ? Number(value || 0) : f.type === "date" ? value || null : value;
    }
    if (selectField) {
      const v = String(fd.get(selectField.name) ?? "");
      if (!v) {
        toast.error(`আগে একটি ${selectField.label} যোগ করুন`);
        return;
      }
      row[selectField.name] = v;
    }
    save.mutate(row, {
      onSuccess: () => {
        setEditing(null);
        if (!id) formEl.reset();
      },
    });
  }

  const renderFields = (row?: Row) => (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields
          .filter((f) => f.image)
          .map((f) => (
            <div key={f.name} className="sm:col-span-2">
              <ImageInput
                label={f.label}
                name={f.name}
                defaultValue={row ? String(row[f.name] ?? "") : ""}
              />
            </div>
          ))}
        {fields
          .filter((f) => !f.textarea && !f.image && f.name !== "sort_order")
          .map((f) => (
            <Field
              key={f.name}
              label={f.label}
              name={f.name}
              {...(f.type ? { type: f.type } : {})}
              defaultValue={row ? String(row[f.name] ?? "") : ""}
            />
          ))}
        {selectField && (
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold">{selectField.label}</span>
            <select
              name={selectField.name}
              defaultValue={
                row ? String(row[selectField.name] ?? "") : (selectField.options[0]?.value ?? "")
              }
              className={inputClass}
            >
              {selectField.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {fields
        .filter((f) => f.textarea)
        .map((f) => (
          <Field
            key={f.name}
            label={f.label}
            name={f.name}
            textarea
            defaultValue={row ? String(row[f.name] ?? "") : ""}
          />
        ))}
    </>
  );

  return (
    <div className="grid gap-6">
      <Card title={`নতুন ${title} যোগ করুন`}>
        <form onSubmit={(e) => onSubmit(e)} className="grid gap-4">
          {renderFields()}
          <button
            type="submit"
            className="w-fit cursor-pointer rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground"
          >
            যোগ করুন
          </button>
        </form>
      </Card>

      <Card title={`${title} তালিকা`}>
        <div className="grid gap-3">
          {rows.map((row, i) => {
            const id = String(row["id"]);
            return (
              <div key={id} className="rounded-xl border border-border bg-background p-4">
                {editing === id ? (
                  <form onSubmit={(e) => onSubmit(e, id)} className="grid gap-4">
                    {renderFields(row)}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                      >
                        সংরক্ষণ
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="cursor-pointer rounded-lg border border-input px-4 py-2 text-xs font-semibold"
                      >
                        বাতিল
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-primary">{primary(row)}</p>
                      {secondary && (
                        <p className="mt-1 text-sm text-muted-foreground">{secondary(row)}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <SmallBtn label="উপরে" onClick={() => void move(i, -1)}>
                        ↑
                      </SmallBtn>
                      <SmallBtn label="নিচে" onClick={() => void move(i, 1)}>
                        ↓
                      </SmallBtn>
                      <button
                        type="button"
                        onClick={() => setEditing(id)}
                        className="cursor-pointer rounded-lg border border-input px-3 py-1.5 text-xs font-semibold"
                      >
                        এডিট
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("মুছে ফেলতে চান?")) remove.mutate(id);
                        }}
                        className="cursor-pointer rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive"
                      >
                        ডিলিট
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {rows.length === 0 && <p className="text-sm text-muted-foreground">কোনো তথ্য নেই।</p>}
        </div>
      </Card>
    </div>
  );
}

function Guides() {
  return (
    <ListManager
      title="হজ গাইড"
      table="guides"
      fields={[
        { name: "name", label: "নাম" },
        { name: "photo_url", label: "ছবি", image: true },
        { name: "sort_order", label: "ক্রম", type: "number" },
        { name: "bio", label: "পরিচিতি", textarea: true },
        { name: "experience", label: "হজ প্রশিক্ষণের অভিজ্ঞতা", textarea: true },
      ]}
      primary={(r) => String(r["name"])}
      secondary={(r) => String(r["experience"] ?? "")}
    />
  );
}

function Topics() {
  return (
    <ListManager
      title="প্রশিক্ষণ বিষয়"
      table="training_topics"
      fields={[
        { name: "title", label: "বিষয়" },
        { name: "sort_order", label: "ক্রম", type: "number" },
        { name: "content", label: "বিবরণ", textarea: true },
      ]}
      primary={(r) => String(r["title"])}
      secondary={(r) => String(r["content"] ?? "")}
    />
  );
}

function Sessions() {
  return (
    <ListManager
      title="প্রশিক্ষণ শিডিউল"
      table="training_sessions"
      fields={[
        { name: "title", label: "শিরোনাম (যেমন প্রশিক্ষণ ০১)" },
        { name: "session_date", label: "তারিখ", type: "date" },
        { name: "session_time", label: "সময়" },
        { name: "location", label: "স্থান" },
        { name: "topic", label: "বিষয়" },
        { name: "instructor", label: "প্রশিক্ষক" },
        { name: "sort_order", label: "ক্রম", type: "number" },
      ]}
      primary={(r) =>
        `${String(r["title"])}${r["session_date"] ? ` — ${formatBnDate(String(r["session_date"]))}` : ""}`
      }
      secondary={(r) => `${String(r["topic"] ?? "")} · ${String(r["instructor"] ?? "")}`}
    />
  );
}

function GalleryManager() {
  const { categories } = useSiteContent();
  const galleryCategories = categories.map((c) => ({ value: c.d, label: c.t }));
  return (
    <div className="grid gap-6">
      <CardListEditor
        title="গ্যালারি ক্যাটাগরি"
        hint="নাম পরিবর্তন করা যাবে। কোড (ইংরেজি, স্পেস ছাড়া) পরিবর্তন করলে পুরনো ছবির ক্যাটাগরি আবার সেট করতে হবে।"
        contentKey="categories"
        tLabel="ক্যাটাগরির নাম"
        dLabel="কোড (যেমন makkah)"
        dTextarea={false}
      />
      <ListManager
        title="গ্যালারি ছবি"
        table="gallery_images"
        fields={[
          { name: "image_url", label: "ছবি", image: true },
          { name: "caption", label: "ক্যাপশন" },
          { name: "sort_order", label: "ক্রম", type: "number" },
        ]}
        selectField={{
          name: "category",
          label: "ক্যাটাগরি",
          options: galleryCategories.map((c) => ({ value: c.value, label: c.label })),
        }}
        primary={(r) => String(r["caption"] || r["image_url"])}
        secondary={(r) =>
          galleryCategories.find((c) => c.value === r["category"])?.label ??
          String(r["category"] ?? "")
        }
      />
    </div>
  );
}

function TestimonialsManager() {
  return (
    <ListManager
      title="হাজির অভিজ্ঞতা"
      table="testimonials"
      fields={[
        { name: "pilgrim_name", label: "হাজির নাম" },
        { name: "hajj_year", label: "হজের বছর" },
        { name: "photo_url", label: "ছবি", image: true },
        { name: "sort_order", label: "ক্রম", type: "number" },
        { name: "quote", label: "বক্তব্য", textarea: true },
      ]}
      primary={(r) => `${String(r["pilgrim_name"])} (${String(r["hajj_year"] ?? "")})`}
      secondary={(r) => String(r["quote"] ?? "")}
    />
  );
}

/* ------------------------------ Content tabs ------------------------------ */

function SettingsTab() {
  return (
    <ObjectEditor
      title="সাইট সেটিংস ও যোগাযোগ"
      hint="এখানে পরিবর্তন করলে হেডার, ফুটার ও যোগাযোগ পেজে দেখা যাবে।"
      contentKey="settings"
      fields={[
        { key: "logoUrl", label: "লোগো (খালি রাখলে বর্তমান লোগো)", kind: "image" },
        { key: "nameBn", label: "প্রতিষ্ঠানের নাম (বাংলা)" },
        { key: "nameEn", label: "প্রতিষ্ঠানের নাম (ইংরেজি)" },
        { key: "address", label: "ঠিকানা" },
        { key: "phone", label: "মোবাইল নম্বর" },
        { key: "whatsapp", label: "হোয়াটসঅ্যাপ নম্বর" },
        { key: "email", label: "ইমেইল" },
        { key: "facebook", label: "ফেসবুক পেজ লিংক" },
        { key: "officeHours", label: "অফিস সময় (খালি রাখলে দেখাবে না)" },
        { key: "tagline", label: "ফুটারের বর্ণনা", kind: "textarea" },
      ]}
    />
  );
}

function HomeTab() {
  return (
    <div className="grid gap-6">
      <ObjectEditor
        title="হোম পেজ"
        contentKey="home"
        fields={[
          { key: "heroImage", label: "প্রধান ছবি (খালি রাখলে বর্তমান ছবি)", kind: "image" },
          { key: "heroLabel", label: "উপরের ছোট লেখা" },
          { key: "heroTitle", label: "শিরোনাম" },
          { key: "heroHighlight", label: "শিরোনামের সোনালি অংশ" },
          { key: "btnPackages", label: "প্যাকেজ বাটনের লেখা" },
          { key: "btnRegistration", label: "রেজিস্ট্রেশন বাটনের লেখা" },
          { key: "heroSubtitle", label: "শিরোনামের নিচের লেখা", kind: "textarea" },
          { key: "introTitle", label: "পরিচিতি শিরোনাম" },
          { key: "sessionLabel", label: "সেশন লেবেল (যেমন ২০২৬ সেশন)" },
          { key: "introText", label: "পরিচিতি লেখা", kind: "textarea" },
          { key: "ctaTitle", label: "নিচের ব্যানার শিরোনাম" },
          { key: "ctaButton", label: "নিচের ব্যানার বাটন" },
          { key: "ctaText", label: "নিচের ব্যানার লেখা", kind: "textarea" },
        ]}
      />
      <CardListEditor
        title="পরিচিতি কার্ড"
        contentKey="introCards"
        tLabel="শিরোনাম"
        dLabel="বিবরণ"
      />
    </div>
  );
}

function AboutTab() {
  return (
    <div className="grid gap-6">
      <ObjectEditor
        title="পরিচিতি পেজ"
        contentKey="about"
        fields={[
          { key: "heroTitle", label: "শিরোনাম" },
          { key: "missionTitle", label: "লক্ষ্য অংশের শিরোনাম" },
          { key: "heroText", label: "শিরোনামের নিচের লেখা", kind: "textarea" },
          { key: "mission1", label: "লক্ষ্য — প্রথম অনুচ্ছেদ", kind: "textarea" },
          { key: "mission2", label: "লক্ষ্য — দ্বিতীয় অনুচ্ছেদ", kind: "textarea" },
          { key: "servicesTitle", label: "সেবা অংশের শিরোনাম" },
        ]}
      />
      <CardListEditor
        title="আমাদের সেবাসমূহ"
        contentKey="services"
        tLabel="সেবার নাম"
        dLabel="বিবরণ"
      />
    </div>
  );
}
