"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createActivity,
  updateActivity,
  deleteActivity,
  type ActivityInput,
} from "@/app/admin/actions";
import type { Activity } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import ActivityCard from "@/components/ActivityCard";

export default function ActivityForm({ activity }: { activity?: Activity }) {
  const router = useRouter();
  const isEdit = Boolean(activity);

  const [form, setForm] = useState<ActivityInput>({
    date: activity?.date ?? "",
    title: activity?.title ?? "",
    excerpt: activity?.excerpt ?? "",
    body: activity?.body ?? "",
    thumbnail: activity?.thumbnail ?? null,
    sort_order: activity?.sort_order ?? 0,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "deleting">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (patch: Partial<ActivityInput>) =>
    setForm((f) => ({ ...f, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    const res =
      isEdit && activity
        ? await updateActivity(activity.id, form)
        : await createActivity(form);
    if (res.ok) {
      router.push("/admin/activities");
      router.refresh();
    } else {
      setError(res.error ?? "저장 실패");
      setStatus("idle");
    }
  };

  const remove = async () => {
    if (!activity) return;
    if (!confirm("이 활동을 삭제할까요?")) return;
    setStatus("deleting");
    const res = await deleteActivity(activity.id);
    if (res.ok) {
      router.push("/admin/activities");
      router.refresh();
    } else {
      setError(res.error ?? "삭제 실패");
      setStatus("idle");
    }
  };

  const input =
    "w-full border-b border-ink/70 bg-transparent pb-1.5 text-sm focus:outline-none";

  // 작성 중인 폼 내용을 공개 화면 형태로 미리보기
  const previewItem: Activity = {
    id: activity?.id ?? "preview",
    date: form.date || "0000.00.00",
    title: form.title || "(제목 없음)",
    excerpt: form.excerpt,
    body: form.body,
    thumbnail: form.thumbnail,
    sort_order: form.sort_order,
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
    <form onSubmit={submit} className="min-w-0 flex-1 space-y-6 pb-10">
      <h1 className="font-display text-3xl font-black tracking-tight">
        {isEdit ? "활동 수정" : "새 활동"}
      </h1>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">날짜 (표시용)</span>
        <input
          value={form.date}
          onChange={(e) => update({ date: e.target.value })}
          placeholder="2026.05.24"
          className={input}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">제목 *</span>
        <input
          required
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
          className={input}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">
          요약 (카드에 표시)
        </span>
        <textarea
          value={form.excerpt}
          onChange={(e) => update({ excerpt: e.target.value })}
          rows={3}
          className="w-full border border-line bg-neutral-50 p-3 text-sm focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">본문</span>
        <textarea
          value={form.body}
          onChange={(e) => update({ body: e.target.value })}
          rows={6}
          className="w-full border border-line bg-neutral-50 p-3 text-sm focus:outline-none"
        />
      </label>

      <ImageUploader
        label="썸네일"
        aspect="aspect-[4/3]"
        value={form.thumbnail}
        onChange={(thumbnail) => update({ thumbnail })}
      />

      <label className="block w-40">
        <span className="mb-1.5 block text-sm font-medium text-ink">정렬 순서</span>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => update({ sort_order: Number(e.target.value) })}
          className={input}
        />
        <span className="mt-1 block text-xs text-muted">숫자가 작을수록 먼저</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status !== "idle"}
          className="border border-ink bg-ink px-8 py-2.5 text-sm text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === "saving" ? "저장 중…" : "저장"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/activities")}
          className="border border-ink px-6 py-2.5 text-sm transition-colors hover:bg-neutral-100"
        >
          취소
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={remove}
            disabled={status !== "idle"}
            className="ml-auto text-sm text-red-600 underline disabled:opacity-50"
          >
            {status === "deleting" ? "삭제 중…" : "삭제"}
          </button>
        )}
      </div>
    </form>

      {/* 우측: 실시간 미리보기 */}
      <aside className="shrink-0 lg:sticky lg:top-6 lg:w-1/2 xl:w-[56%]">
        <span className="mb-3 block text-sm font-medium text-ink">미리보기</span>

        {/* 목록(Activity 페이지)에 보이는 카드 모습 */}
        <div className="border border-line bg-white p-6">
          <p className="mb-4 text-xs uppercase tracking-wide text-muted">
            목록 카드
          </p>
          <div className="mx-auto max-w-[300px]">
            <ActivityCard item={previewItem} />
          </div>
        </div>

        {/* 본문 전문 */}
        <div className="mt-4 border border-line bg-white p-6">
          <p className="mb-4 text-xs uppercase tracking-wide text-muted">본문</p>
          <article>
            <p className="text-xs text-muted">{previewItem.date}</p>
            <h2 className="mt-1 text-xl font-bold text-ink">{previewItem.title}</h2>
            {form.body ? (
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/90">
                {form.body}
              </div>
            ) : (
              <p className="mt-4 text-sm text-neutral-400">(본문 없음)</p>
            )}
          </article>
        </div>
      </aside>
    </div>
  );
}
