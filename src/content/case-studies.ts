export type CaseStudyDiscipline = "Technology" | "Marketing" | "Creative";

export type CaseStudy = {
  slug: "apidenna" | "battery-house";
  name: string;
  disciplines: readonly CaseStudyDiscipline[];
  url?: string;
  companyDetail?: string;
};

export const caseStudies = [
  {
    slug: "apidenna",
    name: "Apidenna",
    url: "https://apidenna.com",
    companyDetail: "UK-registered company",
    disciplines: ["Technology", "Creative"],
  },
  {
    slug: "battery-house",
    name: "Battery House",
    disciplines: ["Marketing", "Creative"],
  },
] as const satisfies readonly CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
