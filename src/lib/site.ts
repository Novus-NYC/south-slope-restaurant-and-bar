/**
 * Central business configuration. Every page, the footer, the JSON-LD and
 * the metadata derive from this file. Unknown facts are typed `null` and the
 * UI that depends on them hides itself. See BUILD_NOTES.md for sources.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface HoursRange {
  /** 24 hour clock, "HH:MM" */
  open: string;
  close: string;
}

export interface HoursRow {
  /** Human label, for example "Mon to Sat" */
  label: string;
  days: DayKey[];
  range: HoursRange | null;
}

export interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderingLink {
  id: "wix" | "ubereats";
  label: string;
  href: string;
  /** Short line shown under the label */
  note: string;
}

export interface Review {
  author: string;
  date: string;
  quote: string;
  source: string;
}

export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";

export const site = {
  name: "South Slope Restaurant & Bar",
  shortName: "South Slope",
  alternateName: "South Slope Eatery",
  legalName: null as string | null,
  tagline: "Breakfast all day, fresh juices and smoothies, burgers and bowls, and a full bar on 5th Avenue.",
  description:
    "South Slope Restaurant & Bar (also known as South Slope Eatery) is an all day American restaurant and bar at 486 5th Avenue in Park Slope, Brooklyn. Breakfast all day, fresh squeezed juices, smoothies, wraps, bowls, burgers, entrees and cocktails, with outdoor seating.",
  address: {
    street: "486 5th Avenue",
    neighborhood: "South Slope, Park Slope",
    city: "Brooklyn",
    state: "NY",
    zip: "11215",
    country: "US",
  } as Address,
  phone: "718-499-0005" as string | null,
  email: "greenkitchen486@gmail.com" as string | null,
  hours: [
    {
      label: "Mon to Sat",
      days: ["mon", "tue", "wed", "thu", "fri", "sat"],
      range: { open: "09:00", close: "21:00" },
    },
    { label: "Sun", days: ["sun"], range: { open: "09:00", close: "19:00" } },
  ] as HoursRow[],
  ordering: [
    {
      id: "wix",
      label: "Order Online",
      href: "https://www.southslopeeatery486.com/online-ordering-1",
      note: "Pickup or delivery, $10 minimum",
    },
    {
      id: "ubereats",
      label: "Uber Eats",
      href: "https://www.ubereats.com/store/south-slope-restaurant-%26-bar/L-jzii5-Slq99zAaYMphkA",
      note: "Delivery through Uber Eats",
    },
  ] as OrderingLink[],
  /** Third party rating, shown with attribution only. */
  rating: {
    value: "4.8",
    count: "1,000+",
    source: "Uber Eats",
    href: "https://www.ubereats.com/store/south-slope-restaurant-%26-bar/L-jzii5-Slq99zAaYMphkA",
  } as { value: string; count: string; source: string; href: string } | null,
  reviews: [
    {
      author: "Candi W.",
      date: "July 20, 2023",
      quote: "Definitely my favorite Breakfast restaurant! Amazing!",
      source: "Uber Eats",
    },
    {
      author: "Iteyana H.",
      date: "June 22, 2023",
      quote:
        "The Park Slope BEC is an absolute fave. They get it right every time and you get your money's worth.",
      source: "Uber Eats",
    },
  ] as Review[],
  socials: {
    instagram: null as string | null,
    facebook: null as string | null,
  },
  /** Old Wix site, kept for reference and redirects. */
  legacyUrl: "https://www.southslopeeatery486.com/",
  priceRange: null as string | null,
  founded: null as string | null,
  cuisine: ["American", "Breakfast and Brunch", "Diner", "Burgers", "Sandwiches"],
};

export type Site = typeof site;

export const primaryOrder: OrderingLink = site.ordering[0];

export function fullAddress(): string {
  const a = site.address;
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
}

export function directionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${fullAddress()}`,
  )}`;
}

export function telHref(): string | null {
  if (!site.phone) return null;
  return `tel:+1${site.phone.replace(/\D/g, "")}`;
}

export function mailHref(subject?: string, body?: string): string | null {
  if (!site.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${query ? `?${query}` : ""}`;
}

/** "9:00 AM" from "09:00". No leading zeroes in visible copy. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function formatRange(range: HoursRange | null): string {
  if (!range) return "Closed";
  return `${formatTime(range.open)} to ${formatTime(range.close)}`;
}

/** One line summary, for example "Mon to Sat 9:00 AM to 9:00 PM, Sun 9:00 AM to 7:00 PM". */
export function hoursSummary(): string {
  return site.hours.map((row) => `${row.label} ${formatRange(row.range)}`).join(", ");
}

const dayNames: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export function openingHoursSpecification() {
  return site.hours
    .filter((row) => row.range)
    .map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days.map((d) => dayNames[d]),
      opens: row.range?.open,
      closes: row.range?.close,
    }));
}
