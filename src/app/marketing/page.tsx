import type { Metadata } from "next";

import { BlurText } from "@/components/ui/blur-text";

export const metadata: Metadata = {
  title: "Marketing",
  alternates: {
    canonical: "/marketing",
  },
};

export default function MarketingPage() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <p className="mb-4 text-sm font-medium text-muted">Route: /marketing</p>
        <h1 className="text-5xl text-balance">
          <BlurText text="Marketing" delay={90} direction="bottom" />
        </h1>
        <p className="mt-6 max-w-2xl text-lg">
          The approved design for this page will be implemented in a later task.
        </p>
      </div>
    </section>
  );
}
