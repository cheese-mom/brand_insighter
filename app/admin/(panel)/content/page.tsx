import ContentEditor from "@/components/admin/ContentEditor";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const content = await getSiteContent();
  return <ContentEditor initial={content} />;
}
