import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creatives",
  alternates: {
    canonical: "/creatives",
  },
};

export default function CreativesPage() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <p className="mb-4 text-sm font-medium text-muted">Route: /creatives</p>
        <h1 className="text-5xl text-balance">Creatives</h1>
        <p className="mt-6 max-w-2xl text-lg">
          The approved design for this page will be implemented in a later task.
        </p>
      </div>
    </section>
  );
}
