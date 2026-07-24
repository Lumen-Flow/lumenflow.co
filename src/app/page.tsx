import type { Metadata } from "next";

import { ClientLogoGrid } from "@/components/sections/client-logo-grid";
import { ConnectedProductsSection } from "@/components/sections/connected-products-section";
import { DisciplineCardsSection } from "@/components/sections/discipline-cards-section";
import { HomeCaseStudiesSection } from "@/components/sections/home-case-studies-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ClosingSection } from "@/components/sections/closing-section";
import  ColorBends  from "@/components/ui/color-bends";
import { BookACallButton } from "@/components/ui/book-a-call-button";
import { BlurText } from "@/components/ui/blur-text";
import { CaseStudiesButton } from "@/components/ui/case-studies-button";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
};

export default function HomePage() {
  return (
    <>
      <section className="relative m-2 min-h-[calc(100svh-1rem)] overflow-hidden rounded-[1.25rem] bg-black text-cool-frost">
      <ColorBends
        className="absolute inset-0"
        colors={["#081c30", "#C4D931","#c8ff00" ]}
        rotation={90}
        speed={0.2}
        scale={1}
        frequency={0.9}
        warpStrength={1}
        mouseInfluence={2}
        noise={0.9}
        parallax={0.5}
        iterations={1}
        intensity={1.5}
        bandWidth={5}
        transparent
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[calc(100svh-1rem)] items-end px-[clamp(1.25rem,5vw,5rem)] pt-32 pb-[clamp(1.5rem,5vw,5rem)]">
        <div className="relative w-full">
          <div>
            <h1 className="text-[clamp(1.5rem,6.5vw,2rem)] leading-[1.1]  sm:text-[clamp(2.5rem,5.75vw,10rem)]">
              <span className="block whitespace-nowrap">
                <BlurText
                  text="Technology, Marketing &"
                  delay={85}
                  direction="bottom"
                  wrap={false}
                />
              </span>
              <span className="block whitespace-nowrap">
                <BlurText
                  text="Creative built to move as one."
                  delay={85}
                  direction="bottom"
                  wrap={false}
                />
              </span>
            </h1>

            <div className="mt-7 flex flex-wrap gap-3">
              <BookACallButton />
              <CaseStudiesButton />
            </div>
          </div>

          <p
            id="contact"
            className="mt-8 max-w-[16rem] text-[clamp(0.625rem,0.85vw,1.5rem)] leading-[1.35] text-cool-frost/80 md:absolute md:-top-8 md:right-65 md:mt-0"
          >
            We help ambitious businesses turn ideas into useful products, clear
            brands and growth systems that work together—not as disconnected
            deliverables.
          </p>
        </div>
      </div>
      </section>

      <ClientLogoGrid />
      <ConnectedProductsSection />
      <DisciplineCardsSection />
      <HomeCaseStudiesSection />
      <ProcessSection />
      {/* <TestimonialsSection /> */}
      
    </>
  );
}
