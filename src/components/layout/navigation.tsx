import Link from "next/link";
import type { CSSProperties } from "react";

import { navigationItems } from "@/content/navigation";

type NavigationProps = {
  isScrolled?: boolean;
};

export function Navigation({ isScrolled = false }: NavigationProps) {
  return (
    <nav aria-label="Primary navigation" data-scrolled={isScrolled}>
      <ul className="flex items-center gap-4 text-lg font-medium text-cool-frost xl:gap-6">
        {navigationItems
          .filter((item) => item.href !== "/")
          .map((item, index) => (
            <li
              className="site-nav-item"
              key={item.href}
              style={{ "--nav-index": index } as CSSProperties}
            >
              <Link
                className="focus-ring rounded-sm underline-offset-4 transition-colors hover:text-volt-time"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
