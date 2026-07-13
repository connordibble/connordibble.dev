import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const siteName = "connordibble.dev";
export const siteTitle =
  "Connor Dibble | Senior Software Engineer, Design Systems & Platform Engineering";
export const siteDescription =
  "Senior software engineer leading enterprise design systems, web platforms, and AI tooling for software people can still reason about.";

export const socialImageAlt =
  "Connor Dibble | Design systems, platform engineering, and AI tooling";

function socialImages(path = "/opengraph-image", alt = socialImageAlt) {
  return {
    openGraph: {
      url: path,
      width: 1200,
      height: 630,
      alt,
    },
    twitter: {
      url: path === "/opengraph-image" ? "/twitter-image" : path,
      alt,
    },
  };
}

const personNode = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Connor Dibble",
  url: SITE_URL,
  jobTitle: "Senior Technology Engineer",
  worksFor: {
    "@type": "Organization",
    name: "State Farm",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Utah State University",
  },
  email: "mailto:dibbleconnor@gmail.com",
  sameAs: [
    "https://github.com/connordibble",
    "https://www.linkedin.com/in/connor-j-dibble",
  ],
  knowsAbout: [
    "Platform engineering",
    "Design systems",
    "AI tooling",
    "Frontend architecture",
    "Developer experience",
  ],
};

const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: siteName,
  url: SITE_URL,
  description: siteDescription,
  inLanguage: "en-US",
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
};

/**
 * A bare top-level array (`[personJsonLd, websiteJsonLd]`) has no root
 * "@context", which breaks any consumer that reads `data["@context"]` off
 * the parsed script content. `@graph` is the standard JSON-LD shape for
 * multiple nodes under one script tag: a single root object, one "@context".
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personNode, websiteNode],
};

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function pageMetadata({
  title,
  description,
  path,
  imagePath,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
}): Metadata {
  const images = socialImages(imagePath, imageAlt);
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type: "website",
      images: [images.openGraph],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images.twitter],
    },
  };
}

export function articleMetadata({
  title,
  description,
  path,
  publishedTime,
  tags,
  imagePath,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  tags: string[];
  imagePath?: string;
  imageAlt?: string;
}): Metadata {
  const images = socialImages(imagePath, imageAlt);
  return {
    ...pageMetadata({ title, description, path, imagePath, imageAlt }),
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type: "article",
      publishedTime,
      authors: ["Connor Dibble"],
      tags,
      images: [images.openGraph],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images.twitter],
    },
  };
}
