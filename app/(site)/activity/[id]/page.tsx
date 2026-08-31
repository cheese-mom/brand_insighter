import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/CtaBanner";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { getActivity } from "@/lib/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

// 표시용 날짜(2026.05.24) → ISO(2026-05-24). created_at이 있으면 그쪽을 우선.
function toIsoDate(activity: { date: string; created_at?: string }) {
  if (activity.created_at) return activity.created_at;
  const iso = activity.date.replaceAll(".", "-");
  return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const activity = await getActivity(id);
  if (!activity) return {};

  return {
    title: activity.title,
    description: activity.excerpt,
    alternates: { canonical: `/activity/${activity.id}` },
    openGraph: {
      title: `${activity.title} | 박재현`,
      description: activity.excerpt,
      url: `/activity/${activity.id}`,
      type: "article",
      ...(activity.thumbnail ? { images: [activity.thumbnail] } : {}),
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const activity = await getActivity(id);
  if (!activity) notFound();

  const paragraphs = activity.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <ArticleJsonLd
        title={activity.title}
        excerpt={activity.excerpt}
        path={`/activity/${activity.id}`}
        datePublished={toIsoDate(activity)}
        image={activity.thumbnail}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Activity", path: "/activity" },
          { name: activity.title, path: `/activity/${activity.id}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm text-muted">{activity.date}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {activity.title}
        </h1>

        {activity.thumbnail && (
          <div className="mt-10 aspect-[4/3] w-full overflow-hidden bg-placeholder">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activity.thumbnail}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted md:text-base">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <Link
            href="/activity"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
