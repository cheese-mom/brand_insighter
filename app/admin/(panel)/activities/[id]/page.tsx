import { notFound } from "next/navigation";
import ActivityForm from "@/components/admin/ActivityForm";
import { getAdminActivity } from "@/lib/admin-activities";

export const dynamic = "force-dynamic";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getAdminActivity(id);
  if (!activity) notFound();
  return <ActivityForm activity={activity} />;
}
