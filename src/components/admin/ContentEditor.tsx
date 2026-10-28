import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { ImageInput } from "@/components/admin/ImageInput";
import { mergeContent, siteContentQuery, type Card, type ContentKey } from "@/lib/site-content";

const inputClass =
  "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-accent";

export type ObjField = { key: string; label: string; kind?: "text" | "textarea" | "image" };

function useSave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: ContentKey; value: Json }) => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, value, updated_at: new Date().toISOString() });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: siteContentQuery.queryKey });
      toast.success("সংরক্ষণ হয়েছে — ওয়েবসাইটে আপডেট হয়েছে");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

function Box({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-bold text-primary">{title}</h2>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ObjectEditor({
  title,
  hint,
  contentKey,
  fields,
}: {
  title: string;
  hint?: string;
  contentKey: ContentKey;
  fields: ObjField[];
}) {
  const { data, isSuccess } = useQuery(siteContentQuery);
  const save = useSave();
  const [state, setState] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (isSuccess && state === null) {
      setState({ ...(mergeContent(data)[contentKey] as unknown as Record<string, string>) });
    }
  }, [isSuccess, data, contentKey, state]);

  if (!state) return <Box title={title}>লোড হচ্ছে…</Box>;

  return (
    <Box title={title} {...(hint ? { hint } : {})}>
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate({ key: contentKey, value: state });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) =>
            f.kind === "image" ? (
              <div key={f.key} className="sm:col-span-2">
                <ImageInput
                  label={f.label}
                  value={state[f.key] ?? ""}
                  onChange={(v) => setState({ ...state, [f.key]: v })}
                />
              </div>
            ) : (
              <label
                key={f.key}
                className={"block " + (f.kind === "textarea" ? "sm:col-span-2" : "")}
              >
                <span className="mb-1.5 block text-[12px] font-semibold">{f.label}</span>
                {f.kind === "textarea" ? (
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={state[f.key] ?? ""}
                    onChange={(e) => setState({ ...state, [f.key]: e.target.value })}
                  />
                ) : (
                  <input
                    className={inputClass}
                    value={state[f.key] ?? ""}
                    onChange={(e) => setState({ ...state, [f.key]: e.target.value })}
                  />
                )}
              </label>
            ),
          )}
        </div>
        <button
          type="submit"
          disabled={save.isPending}
          className="w-fit cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          সংরক্ষণ করুন
        </button>
      </form>
    </Box>
  );
}

export function CardListEditor({
  title,
  hint,
  contentKey,
  tLabel,
  dLabel,
  dTextarea = true,
}: {
  title: string;
  hint?: string;
  contentKey: ContentKey;
  tLabel: string;
  dLabel: string;
  dTextarea?: boolean;
}) {
  const { data, isSuccess } = useQuery(siteContentQuery);
  const save = useSave();
  const [items, setItems] = useState<Card[] | null>(null);

  useEffect(() => {
    if (isSuccess && items === null) {
      setItems([...(mergeContent(data)[contentKey] as Card[])]);
    }
  }, [isSuccess, data, contentKey, items]);

  if (!items) return <Box title={title}>লোড হচ্ছে…</Box>;

  const update = (i: number, patch: Partial<Card>) =>
    setItems(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j]!, next[i]!];
    setItems(next);
  };

  return (
    <Box title={title} {...(hint ? { hint } : {})}>
      <div className="grid gap-3">
        {items.map((it, i) => (
          <div key={i} className="grid gap-3 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-accent">#{i + 1}</span>
              <div className="flex gap-1.5">
                <SmallBtn onClick={() => move(i, -1)} label="উপরে">
                  ↑
                </SmallBtn>
                <SmallBtn onClick={() => move(i, 1)} label="নিচে">
                  ↓
                </SmallBtn>
                <SmallBtn
                  danger
                  onClick={() => setItems(items.filter((_, j) => j !== i))}
                  label="মুছুন"
                >
                  ✕
                </SmallBtn>
              </div>
            </div>
            <input
              className={inputClass}
              placeholder={tLabel}
              value={it.t}
              onChange={(e) => update(i, { t: e.target.value })}
            />
            {dTextarea ? (
              <textarea
                rows={2}
                className={inputClass}
                placeholder={dLabel}
                value={it.d}
                onChange={(e) => update(i, { d: e.target.value })}
              />
            ) : (
              <input
                className={inputClass}
                placeholder={dLabel}
                value={it.d}
                onChange={(e) => update(i, { d: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setItems([...items, { t: "", d: "" }])}
          className="cursor-pointer rounded-xl border border-input px-4 py-2.5 text-sm font-semibold"
        >
          + নতুন যোগ করুন
        </button>
        <button
          type="button"
          disabled={save.isPending}
          onClick={() =>
            save.mutate({
              key: contentKey,
              value: items.filter((x) => x.t.trim()) as unknown as Json,
            })
          }
          className="cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60"
        >
          সংরক্ষণ করুন
        </button>
      </div>
    </Box>
  );
}

export function SmallBtn({
  children,
  onClick,
  label,
  danger,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={
        "grid size-8 cursor-pointer place-items-center rounded-lg border text-xs font-bold " +
        (danger ? "border-destructive/40 text-destructive" : "border-input text-foreground/75")
      }
    >
      {children}
    </button>
  );
}
