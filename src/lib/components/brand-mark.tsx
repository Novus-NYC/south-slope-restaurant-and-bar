/**
 * Weathervane mark derived from the restaurant's rooster logo: double ring,
 * arrow with a fork head, and compass letters. Used for the favicon, app
 * icons, the Open Graph image and on dark surfaces where the JPEG logo
 * (black on white) does not sit well.
 */
export interface BrandMarkProps {
  className?: string;
  /** Stroke and fill color. Defaults to currentColor. */
  color?: string;
  title?: string;
}

export default function BrandMark({ className, color = "currentColor", title }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="46" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="40" strokeWidth="1.6" />
        {/* post */}
        <line x1="50" y1="28" x2="50" y2="80" strokeWidth="3" />
        {/* arrow shaft */}
        <line x1="26" y1="40" x2="70" y2="40" strokeWidth="3" />
        {/* fork tines */}
        <line x1="70" y1="40" x2="84" y2="40" strokeWidth="2.4" />
        <line x1="72" y1="34.5" x2="84" y2="34.5" strokeWidth="2.4" />
        <line x1="72" y1="45.5" x2="84" y2="45.5" strokeWidth="2.4" />
        <line x1="72" y1="34.5" x2="72" y2="45.5" strokeWidth="2.4" />
        {/* compass cross */}
        <line x1="34" y1="54" x2="66" y2="70" strokeWidth="2" />
        <line x1="34" y1="70" x2="66" y2="54" strokeWidth="2" />
      </g>
      <g fill={color}>
        {/* arrow head */}
        <polygon points="14,40 28,33 28,47" />
        {/* finial */}
        <circle cx="50" cy="83" r="3.2" />
        {/* rooster perch */}
        <rect x="42" y="26" width="16" height="3.2" rx="1" />
      </g>
      <g
        fill={color}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="9"
        textAnchor="middle"
      >
        <text x="69" y="54">N</text>
        <text x="31" y="54">W</text>
        <text x="69" y="78">E</text>
        <text x="31" y="78">S</text>
      </g>
    </svg>
  );
}
