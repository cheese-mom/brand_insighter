import Link from "next/link";
import { getActivities } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const activities = await getActivities();

  const cards = [
    {
      href: "/admin/content",
      title: "콘텐츠 편집",
      desc: "히어로·Philosophy·Contact 문구, 통계 수치, 푸터 연락처, 이미지를 편집합니다.",
    },
    {
      href: "/admin/activities",
      title: "Activity 관리",
      desc: `활동 게시글을 추가·수정·삭제합니다. (현재 ${activities.length}개)`,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-black tracking-tight">대시보드</h1>
      <p className="mt-2 text-sm text-muted">
        편집한 내용은 저장 즉시 공개 사이트에 반영됩니다.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block border border-line p-6 transition-colors hover:border-ink"
          >
            <h2 className="text-lg font-bold text-ink">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
