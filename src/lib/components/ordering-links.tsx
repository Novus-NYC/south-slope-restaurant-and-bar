import { site } from "@/lib/site";

export interface OrderingLinksProps {
  tone?: "light" | "dark";
  className?: string;
}

export default function OrderingLinks({ tone = "light", className = "" }: OrderingLinksProps) {
  const card =
    tone === "dark"
      ? "border-cream/20 hover:border-green-leaf"
      : "border-line bg-white hover:border-green-deep";
  const note = tone === "dark" ? "text-cream/70" : "text-ink-muted";
  return (
    <ul className={`grid gap-3 lg:grid-cols-2 ${className}`}>
      {site.ordering.map((order) => (
        <li key={order.id}>
          <a
            href={order.href}
            target="_blank"
            rel="noreferrer"
            className={`flex min-h-[44px] flex-col rounded-md border-2 px-5 py-4 transition-colors ${card}`}
          >
            <span className="flex items-center justify-between font-display text-xl font-bold">
              {order.shortLabel}
              <span aria-hidden="true" className="text-green-leaf">
                ↗
              </span>
            </span>
            <span className={`mt-1 text-sm ${note}`}>{order.note}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
