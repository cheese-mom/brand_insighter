import { getSiteContent } from "@/lib/content";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" />
    </svg>
  );
}

export default async function Footer() {
  const { footer: SITE } = await getSiteContent();

  return (
    <footer className="bg-dark text-neutral-400">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center md:px-8">
        <p className="text-base font-semibold text-white">{SITE.org}</p>

        <dl className="mt-5 space-y-1.5 text-[13px] leading-relaxed">
          <p>
            <span className="font-semibold text-neutral-200">대표</span>
            <span className="mx-2 text-neutral-600">|</span>
            {SITE.ceo}
          </p>
          <p>
            <span className="font-semibold text-neutral-200">Address</span>
            <span className="mx-2 text-neutral-600">|</span>
            {SITE.address}
          </p>
          <p>
            <span className="font-semibold text-neutral-200">전화번호</span>
            <span className="mx-2 text-neutral-600">|</span>
            <a href={`tel:${SITE.tel.replace(/-/g, "")}`} className="hover:text-white">
              {SITE.tel}
            </a>
          </p>
          <p>
            <span className="font-semibold text-neutral-200">이메일</span>
            <span className="mx-2 text-neutral-600">|</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-white">
              {SITE.email}
            </a>
          </p>
        </dl>

        <div className="mt-7 flex items-center justify-center gap-5">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            <InstagramIcon />
          </a>
          <a
            href={SITE.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
