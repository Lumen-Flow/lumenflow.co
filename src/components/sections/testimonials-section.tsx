"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";

import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const element = testimonialRef.current;

    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(element, { clearProps: "all" });
      return;
    }

    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
    );

    return () => {
      animation.kill();
    };
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="page-gutter bg-white py-[clamp(5rem,10vw,8rem)] text-abyss-navy"
    >
      <div className="mx-auto w-full max-w-[96rem]">
        <div className="flex items-center justify-between gap-8 border-b border-abyss-navy/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-volt-time"
            />
            <h2
              id="testimonials-heading"
              className="text-sm font-medium text-abyss-navy"
            >
              Client perspectives
            </h2>
          </div>

          <p className="text-xs tabular-nums text-abyss-navy/45">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </p>
        </div>

        <div className="grid gap-8 py-[clamp(3rem,7vw,6rem)] lg:grid-cols-12">
          <p className="max-w-xs text-sm leading-relaxed text-abyss-navy/55 lg:col-span-3">
            A reserved space for feedback from the people closest to the work.
          </p>
          <div
            key={activeTestimonial.id}
            ref={testimonialRef}
            className="lg:col-span-8 lg:col-start-5"
          >
            <blockquote>
              <p className="max-w-5xl font-heading text-[clamp(1.9rem,3.6vw,4rem)] leading-[1.06] tracking-[-0.035em]">
                {activeTestimonial.quote}
              </p>

              <footer className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <cite className="not-italic font-medium text-abyss-navy">
                  {activeTestimonial.name}
                </cite>
                <span aria-hidden="true" className="text-abyss-navy/25">
                  —
                </span>
                <span className="text-abyss-navy/50">
                  {activeTestimonial.role} · {activeTestimonial.company}
                </span>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-abyss-navy/15 pt-4">
          <div className="flex gap-2" aria-label="Choose a testimonial">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={`h-px transition-[width,background-color] duration-500 ${
                  activeIndex === index
                    ? "w-10 bg-abyss-navy"
                    : "w-5 bg-abyss-navy/20 hover:bg-abyss-navy/50"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Show previous testimonial"
              className="focus-ring inline-flex size-9 items-center justify-center text-abyss-navy/50 transition-colors hover:text-abyss-navy"
              onClick={showPrevious}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Show next testimonial"
              className="focus-ring inline-flex size-9 items-center justify-center text-abyss-navy transition-transform hover:translate-x-0.5"
              onClick={showNext}
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
