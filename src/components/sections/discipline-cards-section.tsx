"use client";

import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { BookACallButton } from "@/components/ui/book-a-call-button";
import { BlurText } from "@/components/ui/blur-text";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { disciplineCards } from "@/content/disciplines";

function animateCard(card: HTMLAnchorElement, active: boolean) {
  const title = card.querySelector<HTMLElement>("[data-card-title]");
  const details = card.querySelector<HTMLElement>("[data-card-details]");
  const arrow = card.querySelector<HTMLElement>("[data-card-arrow]");
  const hoverGradient = card.querySelector<HTMLElement>(
    "[data-card-hover-gradient]",
  );
  const video = card.querySelector<HTMLElement>("[data-card-video]");

  if (!title || !details || !arrow || !hoverGradient || !video) {
    return;
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const duration = reduceMotion ? 0 : 0.62;
  const titleTarget = active ? 22 - title.offsetTop : 0;

  gsap.killTweensOf([
    card,
    title,
    details,
    arrow,
    hoverGradient,
    video,
  ]);

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      overwrite: true,
    },
  });

  timeline
    .to(
      card,
      {
        borderBottomRightRadius: active ? 52 : 0,
        duration: reduceMotion ? 0 : 0.78,
        ease: active ? "elastic.out(1, 0.52)" : "power3.inOut",
      },
      0,
    )
    .to(
      hoverGradient,
      {
        autoAlpha: active ? 1 : 0,
        duration,
      },
      0,
    )
    .to(
      video,
      {
        scale: active ? 1.035 : 1,
        duration: reduceMotion ? 0 : 0.85,
      },
      0,
    )
    .to(
      title,
      {
        y: titleTarget,
        duration: reduceMotion ? 0 : 0.68,
        ease: active ? "power4.inOut" : "power3.inOut",
      },
      0,
    )
    .to(
      arrow,
      {
        autoAlpha: active ? 0 : 1,
        x: active ? 34 : 0,
        duration: reduceMotion ? 0 : 0.42,
      },
      0,
    )
    .to(
      details,
      {
        autoAlpha: active ? 1 : 0,
        y: active ? 0 : 14,
        duration: reduceMotion ? 0 : 0.48,
      },
      active ? 0.2 : 0,
    );
}

export function DisciplineCardsSection() {
  return (
    <section className="h-[120vh] overflow-hidden bg-cool-frost text-abyss-navy">
      <div className="page-gutter flex h-full flex-col justify-evenly ">
        <div className="h-[65vh] min-h-0 flex-none overflow-x-auto overscroll-x-contain pb-3 md:max-h-[40rem] md:overflow-visible md:pb-0">
          <div className="grid h-full min-w-max auto-cols-[78vw] grid-flow-col gap-4 sm:auto-cols-[50vw] md:min-w-0 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:gap-[clamp(1.25rem,2.5vw,1rem)]">
            {disciplineCards.map((card) => (
              <article
                className="flex h-full min-h-0 flex-col [&>a]:min-h-0 [&>a]:flex-1"
                key={card.label}
              >
                <div className="p-4">
                <p className="pb-2 text-xl">/ {card.label}</p>

                </div>

                <Link
                  href={card.href}
                  data-blur-text-hover-root
                  data-decrypted-text-hover-root
                  className="focus-ring group relative block min-h-0 overflow-hidden bg-black text-cool-frost"
                  onMouseEnter={(event) =>
                    animateCard(event.currentTarget, true)
                  }
                  onMouseLeave={(event) =>
                    animateCard(event.currentTarget, false)
                  }
                  onFocus={(event) => animateCard(event.currentTarget, true)}
                  onBlur={(event) => animateCard(event.currentTarget, false)}
                >
                <video
                    data-card-video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={card.videoSrc}
                  autoPlay
                  preload="metadata"
                  muted
                  controls={false}
                  style={{ opacity: 1, visibility: "visible" }}
                  onCanPlay={(event) => {
                    const video = event.currentTarget;
                    video.muted = true;
                    video.defaultMuted = true;
                    void video.play().catch(() => {
                      video.currentTime = 0.001;
                    });
                  }}
                    loop
                  playsInline
                  disablePictureInPicture
                    preload="metadata"
                    aria-hidden="true"
                  />

                  <span
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)] opacity-70"
                    aria-hidden="true"
                  />
                  <span
                    data-card-hover-gradient
                    className="invisible absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0.96)_50%,rgba(0,0,0,0)_100%)] opacity-0"
                    aria-hidden="true"
                  />

                  <h3
                    data-card-title
                    className="absolute right-5 bottom-5 left-5 z-10 max-w-[18ch] text-[clamp(1.7rem,2.6vw,2.65rem)] leading-[0.95] tracking-[-0.035em] text-cool-frost"
                  >
                    <DecryptedText
                      text={card.heading}
                      speed={28}
                      sequential
                      revealDirection="start"
                      animateOn="parent-hover"
                      className="text-cool-frost"
                      encryptedClassName="text-cool-frost/40"
                    />
                  </h3>

                  <div
                    data-card-details
                    className="invisible absolute right-5 bottom-5 left-5 z-10 flex translate-y-3.5 flex-col gap-2 opacity-0"
                  >
                  <p
                    data-card-copy
                    style={{
                      position: "static",
                      visibility: "visible",
                      opacity: 1,
                      transform: "none",
                    }}
                    className="invisible absolute  right-5 left-5 z-10 max-w-[34rem] translate-y-3.5 text-sm leading-[1.55] text-cool-frost/60 opacity-0 sm:text-lg p-4"
                  >
                    {card.copy}
                  </p>

                  <p
                    data-card-capabilities
                    style={{
                      position: "static",
                      visibility: "visible",
                      opacity: 1,
                      transform: "none",
                    }}
                    className="invisible absolute right-5 bottom-5 left-5 z-10 translate-y-3.5 text-xs leading-[1.5] text-cool-frost opacity-0 sm:text-xl p-4"
                  >
                      <BlurText
                        animateBy="words"
                        text={card.capabilities}
                        delay={35}
                        direction="bottom"
                        stepDuration={0.2}
                        trigger="hover"
                      />
                  </p>
                  </div>

                  <ArrowUpRight
                    data-card-arrow
                    aria-hidden="true"
                    className="absolute right-4 bottom-4 z-10 size-7"
                    strokeWidth={1.4}
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="shrink-0 pt-[clamp(1.25rem,5vh,10rem)] text-center">
          <h2 className="text-[clamp(2.1rem,3.8vw,4rem)] leading-none tracking-[-0.04em]">
            <BlurText
              text="Different disciplines. One connected outcome."
              delay={75}
              direction="bottom"
              className="justify-center"
            />
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-5 sm:text-base">
            Start with the challenge you have today. We will connect it to what
            the business needs next.
          </p>
          <div className="mt-6 flex justify-center">
            <BookACallButton />
          </div>
        </div>
      </div>
    </section>
  );
}
