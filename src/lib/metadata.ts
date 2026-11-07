import type { Metadata } from "next";
import { site, siteUrl } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path beginning with "/" */
  path: string;
  /** Absolute or site-relative image URL. Defaults to the generated OG image. */
  image?: string;
}

export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
  const fullTitle = path === "/" ? `${site.name} | Park Slope, Brooklyn` : `${title} | ${site.name}`;
  const ogImage = image ?? `${siteUrl}/opengraph-image`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
