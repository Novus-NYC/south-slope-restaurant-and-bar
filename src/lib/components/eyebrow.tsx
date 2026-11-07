import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  /** Element to render. Headings keep the outline honest when the eyebrow titles a block. */
  as?: "p" | "h2" | "h3" | "dt" | "span";
  /** "dark" for the boards and the green band. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * The small uppercase label that opens sections, columns and definition
 * rows. One size and one tracking (tokens `text-eyebrow`, `tracking-eyebrow`)
 * so the pattern cannot drift between pages.
 */
export default function Eyebrow({ children, as: Tag = "p", tone = "light", className = "" }: EyebrowProps) {
  const color = tone === "dark" ? "text-green-leaf" : "text-green-deep";
  return (
    <Tag className={`text-eyebrow font-semibold uppercase tracking-eyebrow ${color} ${className}`}>
      {children}
    </Tag>
  );
}
