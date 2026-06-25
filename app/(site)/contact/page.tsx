import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CtaBanner from "@/components/CtaBanner";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | 박재현",
  description:
    "브랜드 전략, 네이밍, 강연 및 아카데미 관련 문의. 한국브랜드마케팅연구소로 문의를 남겨주세요.",
};

export default async function ContactPage() {
  const { contact } = await getSiteContent();

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_20rem] md:gap-16">
          <div>
            <h1 className="font-display text-5xl font-black tracking-tight md:text-6xl">
              Contact
            </h1>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>

          {/* 안내 문구 */}
          <aside className="space-y-6 text-sm leading-relaxed text-muted md:pt-4">
            {contact.paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </aside>
        </div>
      </section>

      <CtaBanner variant="plain" />
    </>
  );
}
