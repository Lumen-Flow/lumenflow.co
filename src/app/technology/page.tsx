import type { Metadata } from "next";

import { BlurText } from "@/components/ui/blur-text";

export const metadata: Metadata = {
  title: "Technology",
  alternates: {
    canonical: "/technology",
  },
};

export default function TechnologyPage() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <p className="mb-4 text-sm font-medium text-muted">
          Route: /technology
        </p>
        <h1 className="text-5xl text-balance">
          <BlurText text="Technology" delay={90} direction="bottom" />
        </h1>
        <p className="mt-6 max-w-2xl text-lg">
          The approved design for this page will be implemented in a later task.
        </p>
      </div>
    </section>
  );
}
