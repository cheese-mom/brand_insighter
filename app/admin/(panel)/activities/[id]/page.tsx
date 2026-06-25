import { notFound } from "next/navigation";
import ActivityForm from "@/components/admin/ActivityForm";
import { getActivity } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivity(id);
  if (!activity) notFound();
  return <ActivityForm activity={activity} />;
}
