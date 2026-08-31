"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, HEADER } from "@/lib/defaults";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-[50px] md:py-[15px]">
        <Link href="/" className="block" aria-label={`${HEADER.name} 홈`}>
          <Image
            src="/logo.png"
            alt={`${HEADER.roleSmall} ${HEADER.name}`}
            width={368}
            height={185}
            priority
            className="h-10 w-auto md:h-[66px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden w-[500px] items-center justify-between md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-[15px] transition-colors hover:text-ink ${
                isActive(item.href)
                  ? "font-semibold text-ink"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line md:hidden">
          <ul className="mx-auto max-w-6xl px-5">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-sm ${
                    isActive(item.href)
                      ? "font-semibold text-ink"
                      : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
