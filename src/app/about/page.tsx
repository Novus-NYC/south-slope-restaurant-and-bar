import Image from "next/image";
import type { Metadata } from "next";
import ButtonLink from "@/lib/components/button-link";
import Reveal from "@/lib/components/reveal";
import SectionHeading from "@/lib/components/section-heading";
import { pageMetadata } from "@/lib/metadata";
import { allCategories } from "@/lib/menu";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "South Slope Restaurant & Bar, also known as South Slope Eatery, is an all day American restaurant and bar at 486 5th Avenue in Park Slope, Brooklyn, with outdoor seating, breakfast all day and a full cocktail list.",
  path: "/about",
});

export default function AboutPage() {
  const cocktails = allCategories.find((c) => c.id === "cocktails");
  const cocktailNames = cocktails?.items.slice(0, 6).map((i) => i.name) ?? [];

  return (
    <>
      <section className="mx-auto max-w-site px-4 pt-12 sm:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="About"
          title="A 5th Avenue spot that went fresh."
          lede={
            <>
              {site.name}, also known as {site.alternateName}, is the all day restaurant and bar at{" "}
              {fullAddress()}. Diner breakfast until close, fresh squeezed juice, grain bowls, a
              burger bar, plated entrees and cocktails, all from one kitchen in South Slope.
            </>
          }
        />
      </section>

      {/* Full width photo moment */}
      <Reveal variant="scale" className="mx-auto mt-10 max-w-site px-4 sm:px-6 md:mt-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md md:aspect-[21/9]">
          <Image
            src="/images/outdoor-seating-5th-avenue.jpeg"
            alt="Wooden tables and black metal chairs under umbrellas on the sidewalk setup, with potted palms and string lights"
            fill
            sizes="(min-width: 1216px) 1216px, 100vw"
            className="object-cover object-[50%_70%]"
          />
        </div>
      </Reveal>

      {/* Range */}
      <section className="mx-auto max-w-site px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="The kitchen"
              title="One menu for the whole table."
            />
          </Reveal>
          <Reveal variant="stagger" className="flex flex-col gap-6 text-lg md:col-span-7 md:pt-2">
            <p>
              The menu reads like a neighborhood diner and eats like a juice bar got involved. Two
              eggs any style and a cheeseburger deluxe sit next to a kale-quinoa salad, a Beyond
              Burger and a list of fresh squeezed juices with names like Iron Man and Flu Fighter.
            </p>
            <p>
              Vegan and vegetarian dishes run through every section and are marked on the menu,
              and there are gluten free and keto friendly choices too. If you are picky, or feeding
              someone who is, ask. Any wrap can be made a bowl over brown rice or quinoa.
            </p>
            <p>
              Juices are squeezed and smoothies are blended when you order them, in 16, 20 or 24
              ounce sizes, with protein, flax, chia or granola boosters if you want them.
            </p>
            <div className="pt-2">
              <ButtonLink href="/menu" variant="outline">
                Read the menu
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outside */}
      <section className="bg-cream-deep">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:items-center md:py-24">
          <Reveal className="md:col-span-6">
            <SectionHeading
              eyebrow="Outside"
              title="Umbrellas on the avenue."
              lede="The sidewalk setup out front has wooden tables, umbrellas, string lights and plants, facing the brownstones across 5th Avenue. It is the best seat in the house when the weather allows."
            />
            <p className="mt-6 text-ink-muted">
              Inside, the black awning with the rooster weathervane marks the door at 486. The
              chalkboard out front says it plainly: breakfast, lunch, dinner, juices and smoothies,
              made fresh to order, 7 days.
            </p>
          </Reveal>
          <Reveal variant="scale" className="relative aspect-[4/5] overflow-hidden rounded-md md:col-span-5 md:col-start-8">
            <Image
              src="/images/storefront-486-5th-avenue.jpeg"
              alt="The black awning reading South Slope Eatery with the rooster logo, red brick above and a chalkboard sign on the sidewalk"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Bar */}
      <section className="board text-cream">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:items-center md:py-24">
          <Reveal variant="scale" className="relative aspect-[4/3] overflow-hidden rounded-md md:col-span-5">
            <Image
              src="/images/cocktail-board.jpg"
              alt="The cocktail board: a frozen margarita, a Bulldog with an upturned bottle, a blue Hawaiian and a mojito photographed on black"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_18%]"
            />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7">
            <SectionHeading
              tone="dark"
              eyebrow="The bar"
              title="And a cocktail list for later."
              lede="Frozen or rocks margaritas with seven flavors to pick from, a Bulldog, mojitos, spritzes and the classics, poured 16 ounces at a time."
            />
            {cocktailNames.length ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {cocktailNames.map((name) => (
                  <li key={name} className="rounded-full border border-cream/30 px-3.5 py-1.5 text-sm font-medium">
                    {name}
                  </li>
                ))}
                <li className="rounded-full border border-green-leaf px-3.5 py-1.5 text-sm font-medium text-green-leaf">
                  and more
                </li>
              </ul>
            ) : null}
            <div className="mt-8">
              <ButtonLink href="/menu#cocktails" variant="leaf">
                See the cocktails
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Neighborhood and CTA */}
      <section className="mx-auto max-w-site px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="The neighborhood"
              title="South Slope, Park Slope, Brooklyn."
            />
          </Reveal>
          <Reveal className="flex flex-col gap-6 text-lg md:col-span-7 md:pt-2">
            <p>
              5th Avenue runs the length of Park Slope, and the South Slope stretch is its
              everyday main street. The restaurant sits at 486, with
              breakfast from 9:00 AM seven days a week, lunch and dinner through the evening, and
              pickup and delivery when you would rather stay in.
            </p>
            <p className="text-ink-muted">
              Longtime customers may know the place as {site.alternateName}. Same address, same
              kitchen, same rooster on the awning.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/contact">Hours and directions</ButtonLink>
              <ButtonLink href="/menu" variant="outline">
                View Menu
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
