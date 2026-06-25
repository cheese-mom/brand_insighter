"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MEDIA_BUCKET } from "@/lib/supabase/config";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  /** 미리보기 비율 (tailwind aspect 클래스) */
  aspect?: string;
};

export default function ImageUploader({
  value,
  onChange,
  label = "이미지",
  aspect = "aspect-[4/3]",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch {
      setError("업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <div className="flex items-start gap-4">
        <div className={`${aspect} w-40 shrink-0 overflow-hidden border border-line bg-placeholder`}>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
              없음
            </div>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <label className="inline-block cursor-pointer border border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-paper">
            {uploading ? "업로드 중…" : "이미지 선택"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="block text-muted underline transition-colors hover:text-ink"
            >
              제거
            </button>
          )}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
