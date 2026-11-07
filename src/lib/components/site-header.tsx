"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryOrder, site, telHref, hoursSummary } from "@/lib/site";
import ButtonLink from "@/lib/components/button-link";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  const pathname = usePathname();
  const phone = telHref();

  // Focus goes back to the toggle from the effect below, after the rest of
  // the page has stopped being inert; an inert button cannot take focus.
  const close = useCallback((shouldReturnFocus = true) => {
    returnFocus.current = shouldReturnFocus;
    setOpen(false);
  }, []);

  // Surface change once content scrolls underneath the header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock, focus into the panel, everything else inert so Tab
  // cannot leave the dialog, Escape to close, close on resize.
  useEffect(() => {
    if (!open) {
      document.body.classList.remove("menu-open");
      if (returnFocus.current) {
        returnFocus.current = false;
        toggleRef.current?.focus();
      }
      return;
    }
    document.body.classList.add("menu-open");
    closeRef.current?.focus();

    // Skip link, header, main and footer are all direct children of body.
    const others = Array.from(document.body.children).filter(
      (el) => el.id !== "mobile-menu" && !el.hasAttribute("inert"),
    );
    for (const el of others) el.setAttribute("inert", "");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const media = window.matchMedia("(min-width: 768px)");
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) close(false);
    };
    document.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
      for (const el of others) el.removeAttribute("inert");
      document.body.classList.remove("menu-open");
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-[var(--header-h)] border-b transition-colors duration-300 ${
          scrolled ? "border-line bg-cream" : "border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto flex h-full max-w-site items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-3 rounded-md"
            aria-label={`${site.name}, home`}
          >
            <Image
              src="/images/logo-rooster.jpeg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 mix-blend-multiply"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.35rem] font-bold text-charcoal">
                South Slope
              </span>
              <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-green-deep">
                Restaurant &amp; Bar
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-md px-3 text-[0.95rem] font-semibold transition-colors hover:text-green-deep ${
                  isActive(link.href) ? "text-green-deep underline decoration-2 underline-offset-8" : "text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href={primaryOrder.href} external className="ml-3">
              {primaryOrder.label}
            </ButtonLink>
          </nav>

          {/* Not labelled "Menu": on a restaurant site that means the food. */}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-md px-2 text-sm font-semibold text-charcoal md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span>Pages</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu panel. A sibling of the header, never a child, so the
          sticky header cannot become its containing block. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
        className={`board fixed inset-0 z-50 flex flex-col text-cream transition-[opacity,transform] duration-300 md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-4 sm:px-6">
          <span className="font-display text-[1.35rem] font-bold">South Slope</span>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-md px-2 text-sm font-semibold"
            onClick={() => close()}
          >
            <span>Close</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none">
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-4 pb-10 pt-4 sm:px-6">
          <ul className="flex flex-col border-t border-cream/15">
            {[{ href: "/", label: "Home" }, ...links].map((link) => (
              <li key={link.href} className="border-b border-cream/15">
                <Link
                  href={link.href}
                  onClick={() => close(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex min-h-[64px] items-center justify-between py-3 font-display text-3xl font-bold"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-green-leaf">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href={primaryOrder.href} external variant="leaf" onClick={() => close(false)}>
              {primaryOrder.label}
            </ButtonLink>
            {phone && site.phone ? (
              <a
                href={phone}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-cream/40 px-5 font-semibold"
                onClick={() => close(false)}
              >
                Call {site.phone}
              </a>
            ) : null}
          </div>
          <p className="mt-8 text-sm text-cream/70">
            {site.address.street}, {site.address.city}
            <br />
            {hoursSummary()}
          </p>
        </nav>
      </div>
    </>
  );
}
