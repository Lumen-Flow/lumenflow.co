import Link from "next/link";

import { navigationItems } from "@/content/navigation";

export function Navigation() {
  return (
    <nav aria-label="Primary navigation">
      <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm font-medium">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              className="focus-ring underline-offset-4 hover:underline"
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
