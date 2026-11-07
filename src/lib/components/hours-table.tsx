import { formatRange, site } from "@/lib/site";

export interface HoursTableProps {
  tone?: "light" | "dark";
  className?: string;
}

export default function HoursTable({ tone = "light", className = "" }: HoursTableProps) {
  const border = tone === "dark" ? "border-cream/15" : "border-line";
  const muted = tone === "dark" ? "text-cream/70" : "text-ink-muted";
  return (
    <table className={`w-full border-collapse text-[0.95rem] ${className}`}>
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {site.hours.map((row) => (
          <tr key={row.label} className={`border-b ${border}`}>
            <th scope="row" className={`whitespace-nowrap py-2 pr-4 text-left font-medium ${muted}`}>
              {row.label}
            </th>
            <td className="whitespace-nowrap py-2 text-right font-semibold tabular-nums">
              {formatRange(row.range)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
