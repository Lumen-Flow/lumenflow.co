export type HomeCaseStudyImage = {
  src: `/images/${string}`;
  alt: string;
  objectPosition?: string;
};

export type HomeCaseStudy = {
  slug: "apidenna" | "battery-house";
  title: string;
  titleColor: `#${string}`;
  client: string;
  disciplines: readonly string[];
  description: string;
  linkLabel: string;
  images: readonly [HomeCaseStudyImage, HomeCaseStudyImage];
};

export const homeCaseStudies = [
  {
    slug: "apidenna",
    title: "Engineering trust into modern matrimony.",
    titleColor: "#ff4f7b",
    client: "Apidenna.com LTD",
    disciplines: ["Technology", "Creative"],
    description:
      "Apidenna.com LTD is a UK-registered company building a privacy-first matrimony platform around safer introductions, verified identities and meaningful connections. We brought the product architecture and creative experience together across onboarding, discovery, matching, messaging and subscriptions.",
    linkLabel: "Explore the Apidenna Case Study",
    images: [
      {
        src: "/images/apidennacase2.png",
        alt: "Apidenna matrimony platform displayed on a laptop",
        objectPosition: "center 38%",
      },
      {
        src: "/images/apidennacase1.png",
        alt: "Apidenna website experience on a laptop against a pink setting",
        objectPosition: "center",
      },
    ],
  },
  {
    slug: "battery-house",
    title: "Turning workshop expertise into a brand people recognise.",
    titleColor: "#8fdd2c",
    client: "Batteryhouse.co",
    disciplines: ["Marketing", "Creative"],
    description:
      "We transformed Battery House's technical knowledge and day-to-day workshop activity into a clearer digital presence—supported by ongoing content strategy, campaign creatives and customer-focused automotive storytelling.",
    linkLabel: "Explore the Battery House Case Study",
    images: [
      {
        src: "/images/batteryhousecase1.png",
        alt: "Battery House website project detail",
        objectPosition: "center 18%",
      },
      {
        src: "/images/batteryhousecase2.png",
        alt: "Battery House services website shown on a laptop",
        objectPosition: "center",
      },
    ],
  },
] as const satisfies readonly HomeCaseStudy[];
