import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site";

const staticRoutes = [
  "/",
  "/technology",
  "/marketing",
  "/creatives",
  "/case-studies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = caseStudies.map(
    ({ slug }) => `/case-studies/${slug}`,
  );

  return [...staticRoutes, ...caseStudyRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
  }));
}
