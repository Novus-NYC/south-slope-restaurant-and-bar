import type { Metadata } from "next";
import ButtonLink from "@/lib/components/button-link";
import ContactForm from "@/lib/components/contact-form";
import Eyebrow from "@/lib/components/eyebrow";
import HoursTable from "@/lib/components/hours-table";
import OrderingLinks from "@/lib/components/ordering-links";
import Reveal from "@/lib/components/reveal";
import SectionHeading from "@/lib/components/section-heading";
import { pageMetadata } from "@/lib/metadata";
import { directionsUrl, fullAddress, mailHref, openingTime, site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact and Hours",
  description: `Visit South Slope Restaurant & Bar at ${fullAddress()}. Hours, directions, phone, email and online ordering for pickup and delivery.`,
  path: "/contact",
});

export default function ContactPage() {
  const phone = telHref();
  const mail = mailHref();

  return (
    <>
      <section className="mx-auto max-w-site px-4 pt-12 sm:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Come by, call, or order ahead."
          lede={`We are on 5th Avenue in South Slope, open seven days a week from ${openingTime()}.`}
        />
      </section>

      <section className="mx-auto max-w-site px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Visit */}
          <Reveal className="md:col-span-5">
            <Eyebrow as="h2">Visit</Eyebrow>
            <address className="mt-3 not-italic">
              <p className="font-display text-3xl font-bold leading-tight">{site.address.street}</p>
              <p className="mt-1 text-lg text-ink-muted">
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p className="text-ink-muted">{site.address.neighborhood}</p>
            </address>
            <div className="mt-5">
              <ButtonLink href={directionsUrl()} external>
                Get directions
              </ButtonLink>
            </div>

            <dl className="mt-10 flex flex-col gap-5">
              {phone && site.phone ? (
                <div>
                  <Eyebrow as="dt">Phone</Eyebrow>
                  <dd className="mt-1">
                    <a href={phone} className="font-display text-2xl font-bold hover:text-green-deep">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {mail && site.email ? (
                <div>
                  <Eyebrow as="dt">Email</Eyebrow>
                  <dd className="mt-1">
                    <a href={mail} className="break-all text-lg font-semibold underline decoration-green-leaf decoration-2 underline-offset-4 hover:text-green-deep">
                      {site.email}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <Eyebrow as="h2" className="mt-10">
              Hours
            </Eyebrow>
            <HoursTable className="mt-3 max-w-sm text-base" />
            <p className="mt-3 text-sm text-ink-muted">Holiday hours may differ; call ahead.</p>
          </Reveal>

          {/* Order and message */}
          <div className="flex flex-col gap-12 md:col-span-6 md:col-start-7">
            <Reveal as="section" id="order" className="rounded-md border-2 border-charcoal bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold">Order online</h2>
              <p className="mt-2 text-ink-muted">
                Pickup or delivery straight from the restaurant ($10 minimum), or through Uber Eats.
              </p>
              <OrderingLinks className="mt-5" />
              {phone && site.phone ? (
                <p className="mt-5 text-sm text-ink-muted">
                  Prefer to call it in? <a href={phone} className="font-semibold text-ink underline decoration-green-leaf decoration-2 underline-offset-4">{site.phone}</a>
                </p>
              ) : null}
            </Reveal>

            {site.email ? (
              <Reveal as="section">
                <h2 id="message-heading" className="font-display text-2xl font-bold">
                  Send a message
                </h2>
                <p className="mt-2 text-ink-muted">
                  Questions, catering, feedback. For an order, please call or use the links above.
                </p>
                <div className="mt-5">
                  <ContactForm />
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
