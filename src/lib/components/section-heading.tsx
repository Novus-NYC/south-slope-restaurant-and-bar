import type { ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const eyebrowColor = tone === "dark" ? "text-green-leaf" : "text-green-deep";
  const ledeColor = tone === "dark" ? "text-cream/80" : "text-ink-muted";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow ? (
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}>{eyebrow}</p>
      ) : null}
      <Tag
        className={`mt-3 font-display text-[2rem] font-bold leading-[1.05] sm:text-[2.6rem] ${
          Tag === "h1" ? "md:text-[3.4rem]" : "md:text-[3rem]"
        }`}
      >
        {title}
      </Tag>
      {lede ? <p className={`mt-5 text-lg ${ledeColor}`}>{lede}</p> : null}
    </div>
  );
}
