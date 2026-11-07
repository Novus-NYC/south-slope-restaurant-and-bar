import { fullAddress, openingHoursSpecification, site, siteUrl } from "@/lib/site";

export default function RestaurantJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    alternateName: site.alternateName,
    url: siteUrl,
    image: `${siteUrl}/images/storefront-486-5th-avenue.jpeg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    servesCuisine: site.cuisine,
    openingHoursSpecification: openingHoursSpecification(),
    menu: `${siteUrl}/menu`,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
  };
  if (site.phone) data.telephone = `+1-${site.phone}`;
  if (site.email) data.email = site.email;
  if (site.priceRange) data.priceRange = site.priceRange;
  if (site.ordering.length) data.sameAs = site.ordering.map((o) => o.href);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
