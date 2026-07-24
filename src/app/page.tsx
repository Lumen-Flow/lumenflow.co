import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
};

export default function HomePage() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <p className="mb-4 text-sm font-medium text-muted">Route: /</p>
        <h1 className="text-5xl text-balance">{siteConfig.name}</h1>
        <p className="mt-6 max-w-2xl text-lg">
          The approved design for this page will be implemented in a later task.
        </p>
      </div>
    </section>
  );
}
