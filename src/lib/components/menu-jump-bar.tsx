"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuSection } from "@/lib/menu";

export interface MenuJumpBarProps {
  sections: Pick<MenuSection, "id" | "name" | "categories">[];
}

/**
 * Sticky category bar under the site header. Scrolls horizontally on every
 * width, highlights the category currently in view and keeps that chip
 * visible inside the bar. The anchor offset itself lives on `html`
 * (scroll-padding-top in globals.css), not here.
 */
export default function MenuJumpBar({ sections }: MenuJumpBarProps) {
  const [active, setActive] = useState<string>(sections[0]?.categories[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);
  const ids = sections.flatMap((s) => s.categories.map((c) => c.id));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const offset =
        parseFloat(getComputedStyle(root).scrollPaddingTop || "0") + 24;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
    // ids is derived from static props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the active chip in view inside the bar without scrolling the page.
  useEffect(() => {
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!bar || !chip) return;
    const target = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bar.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      id="menu-jump-bar"
      aria-label="Menu categories"
      className="sticky top-[var(--header-h)] z-30 h-[var(--jump-h)] border-b border-line bg-cream"
    >
      <div
        ref={barRef}
        className="scrollbar-none mx-auto flex h-full max-w-site items-center gap-1 overflow-x-auto px-4 sm:px-6"
      >
        {sections.map((section) => (
          <div key={section.id} className="flex shrink-0 items-center gap-1">
            <a
              href={`#${section.id}`}
              className="mr-1 inline-flex h-9 items-center whitespace-nowrap pl-1 pr-2 text-xs font-bold uppercase tracking-[0.16em] text-green-deep"
            >
              {section.name}
            </a>
            {section.categories.map((category) => {
              const isActive = category.id === active;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  data-id={category.id}
                  aria-current={isActive ? "location" : undefined}
                  className={`inline-flex h-9 items-center whitespace-nowrap rounded-full border px-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-charcoal bg-charcoal text-cream"
                      : "border-transparent text-charcoal hover:border-line hover:bg-white"
                  }`}
                >
                  {category.name}
                </a>
              );
            })}
            <span aria-hidden="true" className="mx-2 h-5 w-px bg-line last:hidden" />
          </div>
        ))}
      </div>
    </nav>
  );
}
