import Link from "next/link";
import BrandMark from "@/lib/components/brand-mark";
import HoursTable from "@/lib/components/hours-table";
import { directionsUrl, fullAddress, mailHref, openingTime, site, telHref } from "@/lib/site";

const pageLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#order", label: "Order online" },
];

export default function Footer() {
  const phone = telHref();
  const mail = mailHref();

  return (
    <footer className="board mt-auto text-cream">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <BrandMark className="h-12 w-12 text-green-leaf" />
            <div className="leading-tight">
              <p className="font-display text-2xl font-bold">{site.name}</p>
              <p className="text-sm text-cream/70">Also known as {site.alternateName}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[0.95rem] text-cream/80">{site.tagline}</p>
          <address className="mt-6 not-italic text-[0.95rem] leading-7 text-cream/85">
            <a href={directionsUrl()} target="_blank" rel="noreferrer" className="hover:text-green-leaf">
              {fullAddress()}
            </a>
            <br />
            {phone && site.phone ? (
              <a href={phone} className="hover:text-green-leaf">
                {site.phone}
              </a>
            ) : null}
            {phone && mail ? <br /> : null}
            {mail && site.email ? (
              <a href={mail} className="break-all hover:text-green-leaf">
                {site.email}
              </a>
            ) : null}
          </address>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-green-leaf">Hours</h2>
          <HoursTable tone="dark" className="mt-3" />
          <p className="mt-3 text-sm text-cream/60">Breakfast, lunch and dinner from {openingTime()}.</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-green-leaf">Pages</h2>
          <ul className="mt-3 flex flex-col">
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[40px] items-center text-[0.95rem] font-medium hover:text-green-leaf"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {site.ordering.map((order) => (
              <li key={order.id}>
                <a
                  href={order.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[40px] items-center text-[0.95rem] font-medium hover:text-green-leaf"
                >
                  {order.id === "wix" ? "Pickup and delivery" : order.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-5 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href="https://novusnyc.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center font-semibold text-cream/80 hover:text-green-leaf sm:min-h-0"
          >
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  );
}
