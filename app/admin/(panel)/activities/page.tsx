import Link from "next/link";
import { getAdminActivities } from "@/lib/admin-activities";
import { ACTIVITY_CATEGORIES } from "@/lib/activity-categories";

export const dynamic = "force-dynamic";

export default async function ActivitiesAdminPage({ searchParams }: { searchParams: Promise<{ status?: string; category?: string }> }) {
  const all = await getAdminActivities();
  const { status = "draft", category = "전체" } = await searchParams;
  const activities = all.filter((a) => (status === "all" || a.status === status) && (category === "전체" || a.category === category));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-black tracking-tight">
          Activity 관리
        </h1>
        <Link
          href="/admin/activities/new"
          className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-opacity hover:opacity-85"
        >
          + 새 활동
        </Link>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="발행 상태">
        {([["draft", "발행대기"], ["published", "발행됨"], ["all", "전체"]] as const).map(([value, label]) => <Link key={value} aria-current={status === value ? "page" : undefined} href={`?status=${value}&category=${encodeURIComponent(category)}`} className={`border px-4 py-2 text-sm ${status === value ? "bg-ink text-paper" : "border-line"}`}>{label} ({all.filter((a) => value === "all" || a.status === value).length})</Link>)}
      </nav>
      <nav className="mt-4 flex flex-wrap gap-2" aria-label="카테고리">
        {["전체", ...ACTIVITY_CATEGORIES].map((c) => <Link key={c} aria-current={category === c ? "page" : undefined} href={`?status=${status}&category=${encodeURIComponent(c)}`} className={`rounded-full border px-4 py-2 text-sm ${category === c ? "border-ink bg-neutral-100" : "border-line"}`}>{c}</Link>)}
      </nav>
      <p className="mt-5 text-sm text-muted">{activities.length}개 · 발행대기 글은 관리자에게만 표시됩니다.</p>
      <div className="mt-5 divide-y divide-line border-y border-line">
        {activities.length === 0 && (
          <p className="py-8 text-sm text-muted">등록된 활동이 없습니다.</p>
        )}
        {activities.map((a) => (
          <Link
            key={a.id}
            href={`/admin/activities/${a.id}`}
            className="flex items-center gap-4 py-4 transition-colors hover:bg-neutral-50"
          >
            <div className="h-14 w-16 shrink-0 overflow-hidden bg-placeholder">
              {a.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.thumbnail} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted">{a.category} · {a.status === "draft" ? "발행대기" : "발행됨"} {a.date}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{a.title}</p>
              {a.geo_questions && <p className="mt-2 whitespace-pre-line text-sm text-muted">GEO 질문 · {a.geo_questions}</p>}
              {a.content_outline && <p className="mt-2 text-sm text-muted">내용 · {a.content_outline}</p>}
              {a.editorial_notes && <p className="mt-2 text-xs text-muted">확인 사항 · {a.editorial_notes}</p>}
            </div>
            <span className="shrink-0 text-sm text-muted">수정 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
