export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

/**
 * These entries are intentionally marked as placeholders so the site does not
 * publish invented client claims. Replace them with approved client wording;
 * the section layout does not need to change.
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-01",
    quote: "Approved client testimonial copy will appear here.",
    name: "Client name",
    role: "Role",
    company: "Company",
  },
  {
    id: "testimonial-02",
    quote: "A second approved client perspective will appear here.",
    name: "Client name",
    role: "Role",
    company: "Company",
  },
  {
    id: "testimonial-03",
    quote: "A third approved client perspective will appear here.",
    name: "Client name",
    role: "Role",
    company: "Company",
  },
];
