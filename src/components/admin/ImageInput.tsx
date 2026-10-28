import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-media";
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("শুধু ছবি আপলোড করা যাবে");
  if (file.size > MAX_BYTES) throw new Error("ছবির সাইজ ৫MB-এর কম হতে হবে");

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(`আপলোড ব্যর্থ: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function ImageInput({
  name,
  label,
  defaultValue,
  value,
  onChange,
}: {
  name?: string;
  label: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [inner, setInner] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const current = value ?? inner;
  const set = (v: string) => {
    setInner(v);
    onChange?.(v);
  };

  return (
    <div className="block">
      <span className="mb-1.5 block text-[12px] font-semibold">{label}</span>
      <div className="flex items-center gap-3">
        {current ? (
          <img
            src={current}
            alt=""
            className="size-14 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="grid size-14 shrink-0 place-items-center rounded-lg border border-dashed border-input text-[10px] text-muted-foreground">
            ছবি নেই
          </div>
        )}
        <div className="grid flex-1 gap-2">
          <div className="flex flex-wrap gap-2">
            <label className="w-fit cursor-pointer rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
              {busy ? "আপলোড হচ্ছে…" : "ছবি আপলোড করুন"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy}
                onChange={(e) => {
                  const input = e.target;
                  const file = input.files?.[0];
                  if (!file) return;
                  setBusy(true);
                  uploadImage(file)
                    .then((url) => {
                      set(url);
                      toast.success("ছবি আপলোড হয়েছে — সংরক্ষণ করতে ভুলবেন না");
                    })
                    .catch((err: Error) => {
                      console.error(err);
                      toast.error(err.message);
                    })
                    .finally(() => {
                      setBusy(false);
                      input.value = "";
                    });
                }}
              />
            </label>
            {current && (
              <button
                type="button"
                onClick={() => set("")}
                className="cursor-pointer rounded-lg border border-input px-3 py-1.5 text-xs font-semibold"
              >
                সরান
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="অথবা ছবির লিংক দিন"
            value={current}
            onChange={(e) => set(e.target.value)}
            className="w-full rounded-lg border border-input bg-card px-3 py-1.5 text-xs outline-none focus:border-accent"
          />
        </div>
      </div>
      {name && <input type="hidden" name={name} value={current} />}
    </div>
  );
}
