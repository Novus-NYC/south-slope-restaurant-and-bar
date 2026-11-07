"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { MenuSection } from "@/lib/menu";

export interface MenuJumpBarProps {
  sections: Pick<MenuSection, "id" | "name" | "categories">[];
}

/**
 * Sticky category bar under the site header. Below md it is one row that
 * scrolls sideways; from md up the chips wrap so every category is reachable
 * with a mouse. The bar measures its own height into `--jump-h` so the one
 * anchor offset on `html` (scroll-padding-top in globals.css) stays correct.
 * It also highlights the category currently in view.
 */
export default function MenuJumpBar({ sections }: MenuJumpBarProps) {
  const [active, setActive] = useState<string>(sections[0]?.categories[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ids = sections.flatMap((s) => s.categories.map((c) => c.id));

  // Publish the real bar height for the anchor offset.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const root = document.documentElement;
    const measure = () => root.style.setProperty("--jump-h", `${nav.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--jump-h");
    };
  }, []);

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
  // A no-op once the chips wrap, because nothing overflows then.
  useEffect(() => {
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!bar || !chip || bar.scrollWidth <= bar.clientWidth) return;
    const target = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bar.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      ref={navRef}
      id="menu-jump-bar"
      aria-label="Menu categories"
      className="sticky top-[var(--header-h)] z-30 border-b border-line bg-cream"
    >
      <div
        ref={barRef}
        className="scrollbar-none mx-auto flex h-[3.25rem] max-w-site items-center gap-x-1 overflow-x-auto px-4 sm:px-6 md:h-auto md:flex-wrap md:overflow-visible md:py-1.5"
      >
        {sections.map((section, sectionIndex) => (
          <Fragment key={section.id}>
            <a
              href={`#${section.id}`}
              className="mr-1 inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-md pl-1 pr-2 text-xs font-bold uppercase tracking-[0.16em] text-green-deep"
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
                  className="group inline-flex min-h-[44px] shrink-0 items-center rounded-full"
                >
                  <span
                    className={`inline-flex h-9 items-center whitespace-nowrap rounded-full border px-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-transparent text-charcoal group-hover:border-line group-hover:bg-white"
                    }`}
                  >
                    {category.name}
                  </span>
                </a>
              );
            })}
            {sectionIndex < sections.length - 1 ? (
              <span aria-hidden="true" className="mx-2 h-5 w-px shrink-0 bg-line" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
