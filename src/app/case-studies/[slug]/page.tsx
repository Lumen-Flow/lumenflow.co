import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return {
    title: caseStudy.name,
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <section className="section-spacing">
      <div className="container-page">
        <p className="mb-4 text-sm font-medium text-muted">
          Route: /case-studies/{caseStudy.slug}
        </p>
        <h1 className="text-5xl text-balance">{caseStudy.name}</h1>
        <p className="mt-6 max-w-2xl text-lg">
          The approved design for this case study will be implemented in a later
          task.
        </p>
      </div>
    </section>
  );
}
