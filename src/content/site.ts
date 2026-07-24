import { navigationItems, type NavigationItem } from "@/content/navigation";

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  url: string;
  description: string;
  navigation: readonly NavigationItem[];
  contactEmail: string;
  socialLinks: readonly SocialLink[];
};

const socialLinks: readonly SocialLink[] = [];

export const siteConfig = {
  name: "Lumen&Flow",
  title: "Lumen&Flow — Technology, Marketing & Creative",
  url: "https://lumenandflow.co",
  description:
    "Lumen&Flow is a technology, marketing and creative company that turns ideas into reliable digital products, campaigns and brand experiences.",
  navigation: navigationItems,
  contactEmail: "",
  socialLinks,
} as const satisfies SiteConfig;
