import type { Metadata } from "next";
import BrandMark from "@/lib/components/brand-mark";
import ButtonLink from "@/lib/components/button-link";
import Eyebrow from "@/lib/components/eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on the menu. Head back to the home page or the full menu.",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-site flex-col items-start px-4 py-20 sm:px-6 md:py-28">
      <BrandMark className="h-16 w-16 text-green-deep" />
      <Eyebrow className="mt-8">404</Eyebrow>
      <h1 className="mt-3 font-display text-[2.6rem] font-bold leading-[0.98] sm:text-6xl">
        That page is not on the menu.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-ink-muted">
        The link may be old. Everything we serve is on the menu page, and the home page has hours,
        directions and ordering.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/menu">View Menu</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back home
        </ButtonLink>
      </div>
    </section>
  );
}
