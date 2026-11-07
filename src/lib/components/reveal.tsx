"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Variant = "up" | "scale" | "stagger";

export interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  className?: string;
  id?: string;
}

const variantClass: Record<Variant, string> = {
  up: "reveal",
  scale: "reveal-scale",
  stagger: "reveal-stagger",
};

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
  }
  return observer;
}

/**
 * Adds `.is-visible` once the element scrolls into view. The hidden initial
 * state only applies under `html.js` (see globals.css), so content stays
 * visible without JavaScript, when printed and with reduced motion.
 */
export default function Reveal({ children, as, variant = "up", className = "", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag: ElementType = as ?? "div";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = getObserver();
    if (!io) {
      node.classList.add("is-visible");
      return;
    }
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag ref={ref} id={id} className={`${variantClass[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
