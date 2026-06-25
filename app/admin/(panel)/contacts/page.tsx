import { createClient } from "@/lib/supabase/server";
import ContactList from "@/components/admin/ContactList";
import type { ContactSubmission } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ContactsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  const items = (data ?? []) as ContactSubmission[];
  const unread = items.filter((i) => !i.is_read).length;

  return (
    <div>
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl font-black tracking-tight">문의 내역</h1>
        <span className="text-sm text-muted">
          전체 {items.length}건{unread > 0 && ` · 안읽음 ${unread}건`}
        </span>
      </div>
      <ContactList items={items} />
    </div>
  );
}
