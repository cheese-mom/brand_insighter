import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import CtaBanner from "@/components/CtaBanner";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import ActivityThumbnail from "@/components/ActivityThumbnail";
import { getActivity } from "@/lib/content";
import { getActivityPath } from "@/lib/activity-url";

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
  const path = getActivityPath(activity);

  return {
    title: activity.title,
    description: activity.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title: `${activity.title} | 박재현`,
      description: activity.excerpt,
      url: path,
      type: "article",
      publishedTime: toIsoDate(activity),
      modifiedTime: activity.updated_at,
      section: activity.category,
      ...(activity.thumbnail ? { images: [activity.thumbnail] } : {}),
    },
    twitter: {
      card: activity.thumbnail ? "summary_large_image" : "summary",
      title: `${activity.title} | 박재현`,
      description: activity.excerpt,
      ...(activity.thumbnail ? { images: [activity.thumbnail] } : {}),
    },
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const activity = await getActivity(id);
  if (!activity) notFound();
  const path = getActivityPath(activity);
  if (activity.slug && id !== activity.slug) permanentRedirect(path);
  const faqItems = (activity.faq_items ?? []).filter(
    (item) => item.question.trim() && item.answer.trim(),
  );
  const faqAlreadyInBody = faqItems.length > 0 && faqItems.every(
    (item) => activity.body.includes(item.question) && activity.body.includes(item.answer),
  );

  const paragraphs = activity.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <ArticleJsonLd
        title={activity.title}
        excerpt={activity.excerpt}
        path={path}
        datePublished={toIsoDate(activity)}
        dateModified={activity.updated_at}
        category={activity.category}
        image={activity.thumbnail}
      />
      <FaqJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Activity", path: "/activity" },
          { name: activity.title, path },
        ]}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm text-muted">{activity.date}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {activity.title}
        </h1>

        <div className="mt-10 aspect-[3/2] w-full overflow-hidden bg-placeholder">
          {activity.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activity.thumbnail}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ActivityThumbnail title={activity.title} category={activity.category} />
          )}
        </div>

        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted md:text-base">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        {faqItems.length > 0 && !faqAlreadyInBody && (
          <section className="mt-14 border-t border-line pt-10" aria-labelledby="activity-faq-title">
            <h2 id="activity-faq-title" className="text-2xl font-bold text-ink">자주 묻는 질문</h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-semibold text-ink">{item.question}</h3>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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
