import type { Metadata } from "next";
import ActivityList from "@/components/ActivityList";
import CtaBanner from "@/components/CtaBanner";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getActivities } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Activity",
  description:
    "브랜드 아카데미 현장 스케치와 강연·컨설팅 활동 기록. 사람의 기억에 남는 브랜드를 만드는 현장의 이야기.",
  alternates: { canonical: "/activity" },
  openGraph: {
    title: "Activity | 박재현",
    description:
      "브랜드 아카데미 현장 스케치와 강연·컨설팅 활동 기록. 사람의 기억에 남는 브랜드를 만드는 현장의 이야기.",
    url: "/activity",
  },
};

export default async function ActivityPage() {
  const activities = await getActivities();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Activity", path: "/activity" }]} />
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="font-display text-5xl font-black tracking-tight md:text-6xl">
          Activity
        </h1>

        <ActivityList items={activities} />
      </section>

      <CtaBanner />
    </>
  );
}
