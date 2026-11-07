import type { Metadata } from "next";
import ButtonLink from "@/lib/components/button-link";
import MenuJumpBar from "@/lib/components/menu-jump-bar";
import Reveal from "@/lib/components/reveal";
import { pageMetadata } from "@/lib/metadata";
import {
  dietTagLabel,
  formatPrice,
  menuSections,
  seasonal,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu";
import { primaryOrder, site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Menu",
  description:
    "The full menu at South Slope Restaurant & Bar in Park Slope, Brooklyn: breakfast all day, salads, wraps and bowls, sandwiches, burgers, entrees, fresh squeezed juices, smoothies, coffee and cocktails, with prices.",
  path: "/menu",
});

function Tags({ item }: { item: MenuItem }) {
  if (!item.tags?.length) return null;
  return (
    <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
      {item.tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-sm border border-green-deep/40 bg-green-pale px-1.5 py-px text-[0.68rem] font-bold uppercase tracking-[0.12em] text-green-deeper"
        >
          {dietTagLabel[tag]}
        </span>
      ))}
    </span>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="py-3">
      <div className="flex items-baseline gap-3">
        <h4 className="flex-1 text-[1.02rem] font-semibold leading-snug">
          {item.name}
          <Tags item={item} />
        </h4>
        {item.price !== undefined ? (
          <p className="shrink-0 text-right font-display text-[1.05rem] font-semibold tabular-nums">
            {formatPrice(item.price)}
            {item.priceNote ? (
              <span className="block text-xs font-medium text-ink-muted">{item.priceNote}</span>
            ) : null}
          </p>
        ) : null}
      </div>
      {item.description ? (
        <p className="mt-0.5 max-w-prose pr-6 text-[0.92rem] leading-relaxed text-ink-muted">
          {item.description}
        </p>
      ) : null}
    </li>
  );
}

function Category({ category, compact = false }: { category: MenuCategory; compact?: boolean }) {
  return (
    <Reveal as="section" id={category.id} className="border-t-2 border-charcoal pt-5">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4 lg:col-span-3">
          <h3 className="font-display text-2xl font-bold leading-tight text-green-deep">{category.name}</h3>
          {category.notes?.length ? (
            <ul className="mt-2 flex flex-col gap-1 text-sm text-ink-muted">
              {category.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <ul
          className={`mt-4 divide-y divide-line md:col-span-8 md:mt-0 lg:col-span-9 ${
            compact ? "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0" : ""
          }`}
        >
          {category.items.map((item) => (
            <Item key={item.name} item={item} />
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** Short lists with few descriptions read better in two columns. */
const compactCategories = new Set(["sides", "soups", "coffee-bar", "desserts-shakes", "cocktails", "specialty-iced-drinks", "breakfast-bites", "club-sandwiches"]);

export default function MenuPage() {
  const phone = telHref();
  return (
    <>
      <section className="mx-auto max-w-site px-4 pb-10 pt-12 sm:px-6 md:pb-14 md:pt-16">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">Menu</p>
            <h1 className="mt-3 font-display text-[2.6rem] font-bold leading-[0.98] sm:text-6xl md:text-7xl">
              Everything,
              <br />
              <span className="text-green-deep">all day.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">
              Breakfast is served until close. Vegan and vegetarian dishes are marked. Prices are
              in dollars and can change; tax is not included.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink href={primaryOrder.href} external>
              {primaryOrder.label}
            </ButtonLink>
            {phone && site.phone ? (
              <a
                href={phone}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border-2 border-charcoal px-5 py-2.5 text-[0.95rem] font-semibold transition-colors hover:bg-charcoal hover:text-cream"
              >
                Call to order
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <MenuJumpBar sections={menuSections} />

      <div className="mx-auto max-w-site px-4 sm:px-6">
        {menuSections.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} className={sectionIndex === 0 ? "pt-10 md:pt-14" : "pt-16 md:pt-24"}>
            <Reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
                  Part {sectionIndex + 1} of {menuSections.length}
                </p>
                <h2 className="mt-2 font-display text-[2.2rem] font-bold leading-none sm:text-5xl">
                  {section.name}
                </h2>
              </div>
              <p className="max-w-md text-[0.95rem] text-ink-muted">{section.blurb}</p>
            </Reveal>
            <div className="flex flex-col gap-12">
              {section.categories.map((category) => (
                <Category key={category.id} category={category} compact={compactCategories.has(category.id)} />
              ))}
            </div>
          </section>
        ))}

        <section id={seasonal.id} className="pt-16 md:pt-24">
          <Reveal className="rounded-md border-2 border-line bg-cream-deep p-6 sm:p-8">
            <div className="md:grid md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4 lg:col-span-3">
                <h2 className="font-display text-2xl font-bold leading-tight">{seasonal.name}</h2>
                {seasonal.notes?.map((note) => (
                  <p key={note} className="mt-2 text-sm text-ink-muted">
                    {note}
                  </p>
                ))}
              </div>
              <ul className="mt-4 divide-y divide-line md:col-span-8 md:mt-0 lg:col-span-9">
                {seasonal.items.map((item) => (
                  <Item key={item.name} item={item} />
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <Reveal className="my-16 flex flex-col gap-6 border-t-2 border-charcoal pt-8 md:my-24 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Ready to order?</h2>
            <p className="mt-1 text-ink-muted">Pickup or delivery online, or call the restaurant.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryOrder.href} external>
              {primaryOrder.label}
            </ButtonLink>
            <ButtonLink href="/contact#order" variant="outline">
              All ways to order
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
