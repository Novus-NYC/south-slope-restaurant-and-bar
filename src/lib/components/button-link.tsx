import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "outline" | "outline-light" | "leaf";

export interface ButtonLinkProps {
  /** Route, URL, or a tel: / mailto: link (rendered as a plain same-tab anchor). */
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab with an arrow glyph. Not for tel: or mailto:. */
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-2.5 text-body font-semibold tracking-tight transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-green-deep text-cream hover:bg-green-deeper",
  leaf: "bg-green-leaf text-charcoal hover:bg-[#62d67d]",
  light: "bg-cream text-charcoal hover:bg-white",
  outline: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
  "outline-light": "border-2 border-cream/70 text-cream hover:border-cream hover:bg-cream hover:text-charcoal",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  onClick,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (/^(tel|mailto):/i.test(href)) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} onClick={onClick}>
        {children}
        <span aria-hidden="true" className="text-[0.8em] opacity-80">
          ↗
        </span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
