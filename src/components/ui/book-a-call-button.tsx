import Link from "next/link";

export function BookACallButton() {
  return (
    <Link
      className="focus-ring inline-flex min-h-11 items-center rounded-full bg-volt-time px-5 text-sm font-medium text-[#000] transition-transform hover:-translate-y-0.5"
      href="/#contact"
      data-hero-cta
      style={{ color: "var(--abyss-navy)" }}
    >
      Book a call
    </Link>
  );
}
