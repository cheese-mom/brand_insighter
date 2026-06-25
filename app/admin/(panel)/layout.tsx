import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../actions";

const ADMIN_NAV = [
  { label: "대시보드", href: "/admin" },
  { label: "콘텐츠 편집", href: "/admin/content" },
  { label: "Activity 관리", href: "/admin/activities" },
  { label: "문의 내역", href: "/admin/contacts" },
];

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/admin"
              className="font-display text-lg font-black tracking-tight transition-opacity hover:opacity-70"
            >
              ADMIN
            </Link>
            <nav className="flex flex-wrap gap-5 text-sm">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              target="_blank"
              className="text-muted transition-colors hover:text-ink"
            >
              사이트 보기 ↗
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-muted transition-colors hover:text-ink"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-4 py-10 lg:px-8">{children}</main>
    </div>
  );
}
