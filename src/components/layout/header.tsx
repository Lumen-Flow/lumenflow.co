import Link from "next/link";

import { Navigation } from "@/components/layout/navigation";
import { siteConfig } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container-page flex min-h-20 flex-wrap items-center justify-between gap-5 py-4">
        <Link
          className="focus-ring font-display text-xl leading-none"
          href="/"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
