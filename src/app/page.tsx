import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ButtonLink from "@/lib/components/button-link";
import HoursTable from "@/lib/components/hours-table";
import RestaurantJsonLd from "@/lib/components/json-ld";
import Reveal from "@/lib/components/reveal";
import SectionHeading from "@/lib/components/section-heading";
import OrderingLinks from "@/lib/components/ordering-links";
import { pageMetadata } from "@/lib/metadata";
import { featured, formatPrice, menuItemCount } from "@/lib/menu";
import { directionsUrl, fullAddress, openingTime, primaryOrder, site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.name,
  description: site.description,
  path: "/",
});

const tickerItems = [
  "Breakfast, lunch and dinner",
  "Fresh squeezed juices",
  "Smoothies",
  "Wraps and bowls",
  "Burgers",
  "Entrees",
  "Cocktails",
  `Open 7 days from ${openingTime()}`,
];

export default function HomePage() {
  const phone = telHref();

  return (
    <>
      <RestaurantJsonLd />

      {/* Hero: the real outdoor setup on 5th Avenue. */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-charcoal text-cream md:min-h-[78vh]">
        <Image
          src="/images/outdoor-seating-5th-avenue.jpeg"
          alt="Outdoor dining tables under cream umbrellas and string lights on 5th Avenue, with brownstones across the street"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_62%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(27,27,25,0.92)_0%,rgba(27,27,25,0.65)_38%,rgba(27,27,25,0.12)_70%,rgba(27,27,25,0)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(27,27,25,0.55)_0%,rgba(27,27,25,0)_60%)]"
        />
        <div className="relative mx-auto w-full max-w-site px-4 pb-12 pt-32 sm:px-6 md:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-leaf sm:text-sm">
            {site.address.street}, {site.address.city}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-bold leading-[0.98] sm:text-6xl md:text-7xl">
            Your all day spot on 5th Avenue.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/90 sm:text-xl">
            Breakfast, lunch and dinner from {openingTime()}. Fresh squeezed juices and smoothies,
            burgers and bowls, and a cocktail list for later. Eat in or order to go.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryOrder.href} external variant="leaf">
              {primaryOrder.label}
            </ButtonLink>
            <ButtonLink href="/menu" variant="outline-light">
              View Menu
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Chalkboard ticker: the brand cue from the restaurant's own boards. */}
      <section className="board overflow-hidden border-y border-cream/10 py-3 text-green-leaf" aria-label="What we serve">
        <ul className="mx-auto flex max-w-site flex-wrap justify-center gap-x-6 gap-y-1 px-4 text-xs font-bold uppercase tracking-[0.18em] sm:px-6 sm:text-[0.8rem]">
          {tickerItems.map((item) => (
            <li key={item} className="flex items-center gap-6">
              {item}
              <span aria-hidden="true" className="text-cream/30">
                •
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* What people come for */}
      <section className="mx-auto max-w-site px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="What people come for"
              title={
                <>
                  Diner classics, <span className="text-green-deep">gone fresh.</span>
                </>
              }
              lede={`A bacon, egg and cheese on a waffle. An 8 oz Angus burger. A kale smoothie or a fresh squeezed juice. ${menuItemCount} things on the menu.`}
            />
            <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-md">
              <Image
                src="/images/nachos-supreme.jpeg"
                alt="A plate of nachos with melted cheese, salsa, sour cream and guacamole on a wooden table"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal variant="stagger" as="ol" className="md:col-span-7 md:pt-2">
            {featured.map(({ item, category, href }, index) => (
              <li key={item.name} className="border-t border-line py-5 first:border-t-2 first:border-charcoal last:border-b">
                <Link href={href} className="group block rounded-md">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-semibold tabular-nums text-green-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-2xl font-bold leading-tight group-hover:text-green-deep sm:text-[1.75rem]">
                      {item.name}
                    </span>
                    {item.price !== undefined ? (
                      <span className="shrink-0 font-display text-xl font-semibold tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1.5 pl-8 sm:pl-9">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-deep">
                      {category}
                    </p>
                    {item.description ? (
                      <p className="mt-1 text-[0.95rem] text-ink-muted">{item.description}</p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/menu" variant="outline">
            See the whole menu
          </ButtonLink>
          <p className="text-sm text-ink-muted">Vegan and vegetarian dishes are marked throughout.</p>
        </Reveal>
      </section>

      {/* Outside on 5th Avenue */}
      <section className="bg-cream-deep">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:items-center md:py-24">
          <Reveal variant="scale" className="relative aspect-[4/5] overflow-hidden rounded-md md:col-span-5 md:aspect-[3/4]">
            <Image
              src="/images/storefront-486-5th-avenue.jpeg"
              alt="The storefront at 486 5th Avenue: a black awning with the South Slope rooster logo under a red brick facade, with a chalkboard sign out front"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7">
            <SectionHeading
              eyebrow="The block"
              title="Tables on the avenue."
              lede="Umbrellas, string lights and plants under the brownstones on 5th Avenue. Inside, the bar and a kitchen that serves breakfast, lunch and dinner."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <li className="border-l-2 border-green-deep pl-4">
                <p className="font-display text-xl font-bold">Open 7 days</p>
                <p className="mt-1 text-[0.95rem] text-ink-muted">From {openingTime()} every morning, with breakfast, lunch and dinner on one menu.</p>
              </li>
              <li className="border-l-2 border-green-deep pl-4">
                <p className="font-display text-xl font-bold">Made to order</p>
                <p className="mt-1 text-[0.95rem] text-ink-muted">Juices and smoothies pressed and blended when you order them.</p>
              </li>
              <li className="border-l-2 border-green-deep pl-4">
                <p className="font-display text-xl font-bold">Something for the table</p>
                <p className="mt-1 text-[0.95rem] text-ink-muted">Vegan and vegetarian dishes in every section, plus wings, steak and shakes.</p>
              </li>
              <li className="border-l-2 border-green-deep pl-4">
                <p className="font-display text-xl font-bold">Pickup and delivery</p>
                <p className="mt-1 text-[0.95rem] text-ink-muted">Order online for pickup or delivery, or through Uber Eats.</p>
              </li>
            </ul>
            <div className="mt-8">
              <ButtonLink href="/about" variant="outline">
                About the place
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hours and address */}
      <section className="bg-green-deep text-cream">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-20">
          <Reveal className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-leaf">Find us</p>
            <h2 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] sm:text-[2.6rem]">
              {site.address.street}
              <br />
              <span className="text-cream/80">
                {site.address.city}, {site.address.state} {site.address.zip}
              </span>
            </h2>
            <p className="mt-4 text-cream/80">{site.address.neighborhood}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={directionsUrl()} external variant="light">
                Directions
              </ButtonLink>
              {phone && site.phone ? (
                <a
                  href={phone}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-cream/60 px-5 py-2.5 text-[0.95rem] font-semibold transition-colors hover:border-cream hover:bg-cream hover:text-charcoal"
                >
                  Call {site.phone}
                </a>
              ) : null}
            </div>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-leaf">Hours</h3>
            <HoursTable tone="dark" className="mt-3 text-base" />
            <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-green-leaf">Order</h3>
            <OrderingLinks tone="dark" className="mt-3" />
          </Reveal>
        </div>
      </section>

      {/* Rating and reviews */}
      {site.rating || site.reviews.length ? (
        <section className="mx-auto max-w-site px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            {site.rating ? (
              <Reveal className="md:col-span-4">
                <p className="font-display text-[5.5rem] font-bold leading-none tracking-tight text-green-deep sm:text-[7rem]">
                  {site.rating.value}
                </p>
                <p className="mt-2 font-display text-xl font-bold">
                  on{" "}
                  <a href={site.rating.href} target="_blank" rel="noreferrer" className="underline decoration-green-leaf decoration-2 underline-offset-4 hover:text-green-deep">
                    {site.rating.source}
                  </a>
                </p>
                <p className="mt-1 text-sm text-ink-muted">{site.rating.count} ratings</p>
              </Reveal>
            ) : null}
            {site.reviews.length ? (
              <Reveal variant="stagger" as="ul" className="grid gap-6 md:col-span-8 md:grid-cols-2">
                {site.reviews.map((review) => (
                  <li key={review.author} className="flex flex-col justify-between rounded-md border border-line bg-white p-6">
                    <blockquote className="font-display text-xl font-semibold leading-snug">
                      “{review.quote}”
                    </blockquote>
                    <p className="mt-5 text-sm text-ink-muted">
                      <span className="font-semibold text-ink">{review.author}</span>, {review.date}, on{" "}
                      {review.source}
                    </p>
                  </li>
                ))}
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <section className="board text-cream">
        <Reveal className="mx-auto flex max-w-site flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-leaf">Hungry now</p>
            <h2 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] sm:text-[2.6rem] md:text-[3rem]">
              Order ahead, or come sit down.
            </h2>
            <p className="mt-3 max-w-lg text-cream/80">{fullAddress()}. Pickup, delivery or a table.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryOrder.href} external variant="leaf">
              {primaryOrder.label}
            </ButtonLink>
            <ButtonLink href="/menu" variant="outline-light">
              View Menu
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
