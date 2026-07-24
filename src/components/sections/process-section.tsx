"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { BookACallButton } from "@/components/ui/book-a-call-button";
import { BlurText } from "@/components/ui/blur-text";
import { processSteps, workingPrinciples } from "@/content/process";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const process = processRef.current;

    if (!section || !process) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fill = process.querySelector<HTMLElement>("[data-process-fill]");
    const steps = gsap.utils.toArray<HTMLElement>(
      "[data-process-step]",
      process,
    );

    if (!fill || steps.length === 0) {
      return;
    }

    if (reduceMotion) {
      gsap.set(fill, { scaleY: 1 });
      gsap.set(steps, { autoAlpha: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(steps, { autoAlpha: 0.22, y: 22 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: process,
          start: "top 68%",
          end: "bottom 32%",
          scrub: 0.65,
        },
      });

      timeline.to(
        fill,
        {
          scaleY: 1,
          duration: processSteps.length,
          ease: "none",
        },
        0,
      );

      steps.forEach((step, index) => {
        const marker = step.querySelector<HTMLElement>(
          "[data-process-marker]",
        );

        timeline.to(
          step,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          index,
        );

        if (marker) {
          timeline.to(
            marker,
            {
              backgroundColor: "var(--volt-time)",
              color: "var(--abyss-navy)",
              duration: 0.35,
            },
            index,
          );
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[175vh] bg-cool-frost text-abyss-navy"
    >
      <div className="page-gutter">
        <div
          ref={processRef}
          className="grid min-h-[87.5vh] grid-cols-1 gap-[clamp(3rem,8vw,9rem)] py-[clamp(4rem,9vh,8rem)] lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.45fr)]"
        >
          <div className="flex flex-col items-start">
            <h2 className="max-w-[10ch] text-[clamp(3rem,6vw,6.25rem)] leading-[0.95] tracking-[-0.045em]">
              <BlurText
                text="Clarity before velocity."
                delay={80}
                direction="bottom"
              />
            </h2>
            <p className="mt-8 max-w-[34rem] text-sm leading-[1.7] sm:text-base">
              Moving quickly matters, but only after the problem, priority and
              definition of success are clear. Our process keeps decisions
              visible and the work close to the people responsible for
              delivering it.
            </p>
            <div className="mt-10">
              <BookACallButton />
            </div>
          </div>

          <div className="relative pl-14 sm:pl-20">
            <span
              className="absolute top-5 bottom-5 left-[1.05rem] w-px bg-abyss-navy/20 sm:left-[1.55rem]"
              aria-hidden="true"
            />
            <span
              data-process-fill
              className="absolute top-5 bottom-5 left-[1.05rem] w-0.5 bg-volt-time sm:left-[1.55rem]"
              aria-hidden="true"
            />

            <ol className="flex h-full flex-col justify-between gap-12">
              {processSteps.map((step) => (
                <li
                  data-process-step
                  className="relative"
                  key={step.number}
                >
                  <span
                    data-process-marker
                    className="absolute top-0 -left-14 flex size-9 items-center justify-center bg-abyss-navy font-mono text-xs text-volt-time sm:-left-20"
                  >
                    {step.number}
                  </span>
                  <h3 className="text-[clamp(1.65rem,3vw,3rem)] leading-none tracking-[-0.03em]">
                    <BlurText
                      text={step.title}
                      delay={55}
                      direction="bottom"
                    />
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-[1.6] sm:text-base">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid min-h-[87.5vh] grid-cols-1 gap-[clamp(3rem,8vw,9rem)] py-[clamp(4rem,9vh,8rem)] lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.45fr)]">
          <div className="flex flex-col items-start">
            <h2 className="max-w-[11ch] text-[clamp(3rem,6vw,6.25rem)] leading-[0.95] tracking-[-0.045em]">
              <BlurText
                text="Senior thinking stays close to the work."
                delay={75}
                direction="bottom"
              />
            </h2>
            <p className="mt-8 max-w-[36rem] text-sm leading-[1.7] sm:text-base">
              Lumen &amp; Flow is intentionally compact. You work directly with
              the people shaping the strategy and making the product—not
              through layers of account management. When a project needs a
              wider skill set, we bring in trusted specialists around the
              problem while keeping ownership clear.
            </p>
            <Link
              className="focus-ring mt-10 inline-flex min-h-10 items-center gap-2 rounded-full border border-abyss-navy/45 px-5 text-sm font-medium transition-colors hover:border-volt-time hover:text-volt-time"
              href="/case-studies"
            >
              Case Studies
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid min-h-[28rem] grid-cols-1 sm:grid-cols-2">
            {workingPrinciples.map((principle, index) => (
              <article
                className={cn(
                  "flex flex-col justify-center border-abyss-navy/20 px-[clamp(1.5rem,4vw,3.5rem)] py-8",
                  index % 2 === 0 && "sm:border-r",
                  index < 2 && "border-b",
                )}
                key={principle.title}
              >
                <h3 className="max-w-[16ch] text-[clamp(1.6rem,2.8vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
                  <BlurText
                    text={principle.title}
                    delay={55}
                    direction="bottom"
                  />
                </h3>
                {principle.description ? (
                  <p className="mt-3 max-w-[30rem] text-sm leading-[1.6] sm:text-base">
                    {principle.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
