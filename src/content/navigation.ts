export type NavigationItem = {
  label: string;
  href: "/" | "/technology" | "/marketing" | "/creatives" | "/case-studies";
};

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Technology", href: "/technology" },
  { label: "Marketing", href: "/marketing" },
  { label: "Creatives", href: "/creatives" },
  { label: "Case Studies", href: "/case-studies" },
] as const satisfies readonly NavigationItem[];
