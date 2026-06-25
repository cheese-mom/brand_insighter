import Link from "next/link";
import { getActivities } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ActivitiesAdminPage() {
  const activities = await getActivities();

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

      <div className="mt-8 divide-y divide-line border-y border-line">
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
              <p className="text-xs text-muted">{a.date}</p>
              <p className="truncate text-sm font-semibold text-ink">{a.title}</p>
            </div>
            <span className="shrink-0 text-sm text-muted">수정 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
