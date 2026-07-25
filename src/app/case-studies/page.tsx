import type { Metadata } from "next";

import { BlurText } from "@/components/ui/blur-text";
import Link from "next/link";

import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  alternates: {
    canonical: "/case-studies",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CaseStudiesPage() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <p className="mb-4 text-sm font-medium text-muted">
          Route: /case-studies
        </p>
        <h1 className="text-5xl text-balance">
          <BlurText text="Case Studies" delay={90} direction="bottom" />
        </h1>
        <p className="mt-6 max-w-2xl text-lg">
          The approved design for this page will be implemented in a later task.
        </p>
        <ul className="mt-8 flex flex-wrap gap-6">
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <Link
                className="focus-ring font-medium underline underline-offset-4"
                href={`/case-studies/${caseStudy.slug}`}
              >
                {caseStudy.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
