import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CaseStudiesButton() {
  return (
    <Link
      className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-cool-frost/70 px-5 text-sm font-medium text-cool-frost transition-colors hover:border-volt-time hover:text-volt-time"
      href="/case-studies"
      data-hero-cta
    >
      Case Studies
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </Link>
  );
}
