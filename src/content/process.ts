export type ProcessStep = {
  number: `0${1 | 2 | 3 | 4}`;
  title: string;
  description: string;
};

export type WorkingPrinciple = {
  title: string;
  description?: string;
};

export const processSteps = [
  {
    number: "01",
    title: "Discover & Align",
    description:
      "We begin with the business goal, audience, current evidence and practical limits. Together, we decide what matters now, what can wait and what success should look like.",
  },
  {
    number: "02",
    title: "Shape & Prototype",
    description:
      "We turn assumptions into journeys, messages, systems and prototypes that can be reviewed early—before time is spent polishing the wrong answer.",
  },
  {
    number: "03",
    title: "Build & Launch",
    description:
      "Strategy, design, content and engineering move through one delivery rhythm. You see progress, understand decisions and know what is required for launch.",
  },
  {
    number: "04",
    title: "Measure & Improve",
    description:
      "After launch, we study meaningful signals, fix friction and identify the next valuable move instead of treating launch day as the finish line.",
  },
] as const satisfies readonly ProcessStep[];

export const workingPrinciples = [
  {
    title: "Direct Communication",
    description:
      "Fewer handovers, faster decisions and a shared view of what is happening next.",
  },
  {
    title: "Connected Execution",
    description:
      "Technology, marketing and creative decisions are made with awareness of one another.",
  },
  {
    title: "Built around the outcome",
  },
  {
    title: "Designed to keep working",
  },
] as const satisfies readonly WorkingPrinciple[];
