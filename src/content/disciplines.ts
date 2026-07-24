export type DisciplineCard = {
  label: "Technology" | "Marketing" | "Creatives";
  href: "/technology" | "/marketing" | "/creatives";
  videoSrc: `/videos/${string}`;
  heading: string;
  copy: string;
  capabilities: string;
};

export const disciplineCards = [
  {
    label: "Technology",
    href: "/technology",
    videoSrc: "/videos/technology.mp4",
    heading: "Build what moves the business forward.",
    copy: "From focused MVPs and websites to internal systems, AI-enabled workflows and reliable cloud infrastructure, we turn complex requirements into products people can actually use.",
    capabilities:
      "Product strategy · UX/UI · Web development · SaaS · Automation · AI integration · Cloud and DevOps",
  },
  {
    label: "Marketing",
    href: "/marketing",
    videoSrc: "/videos/marketing.mp4",
    heading: "Turn attention into meaningful growth.",
    copy: "We clarify the offer, map the customer journey and build a practical system for content, distribution, lead handling and measurement—so marketing can explain what it is achieving.",
    capabilities:
      "Positioning · Growth strategy · Social media · Campaigns · Paid media · SEO · Analytics",
  },
  {
    label: "Creatives",
    href: "/creatives",
    videoSrc: "/videos/creative.mp4",
    heading: "Give the idea a form people remember.",
    copy: "We create brand identities, campaigns and visual content with enough personality to earn attention and enough structure to remain recognisable wherever the brand appears.",
    capabilities:
      "Brand identity · Art direction · Social design · Photography · Video · Motion",
  },
] as const satisfies readonly DisciplineCard[];
