import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlurText } from "@/components/ui/blur-text";
import { homeCaseStudies } from "@/content/home-case-studies";

export function HomeCaseStudiesSection() {
  return (
    <section className="min-h-[130vh] bg-cool-frost text-abyss-navy">
      <div className="page-gutter py-[clamp(3rem,7vw,7rem)]">
        <div className="space-y-[clamp(5rem,10vw,10rem)]">
          {homeCaseStudies.map((study) => (
            <article
              className="grid min-h-[52vh] grid-cols-1 gap-x-[clamp(1.5rem,4vw,4.5rem)] gap-y-6 md:grid-cols-[minmax(13rem,0.8fr)_minmax(0,2fr)]"
              key={study.slug}
            >
              <header className="md:col-span-2">
                <h2 className="max-w-[30ch] text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.94] tracking-[-0.045em]">
                  <BlurText
                    text={study.title}

                    delay={65}
                    direction="bottom"
                  />
                </h2>
                <p
                  style={{ color: study.titleColor }}
                  className="mt-1 font-display text-[clamp(1.8rem,3.6vw,3.75rem)] leading-none text-volt-time">
                  {study.client}
                </p>
              </header>

              <div className="flex min-h-0 flex-col">
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label={`${study.client} disciplines`}
                >
                  {study.disciplines.map((discipline) => (
                    <li
                      className="rounded-full bg-white px-4 py-2 text-[0.8rem] font-regular"
                      key={discipline}
                    >
                      {discipline}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 md:mt-auto">
                  <p className="max-w-[34rem] text-sm font-light leading-[2] sm:text-lg">
                    {study.description}
                  </p>
                  <Link
                    className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-volt-time"
                    href={`/case-studies/${study.slug}`}
                  >
                    {study.linkLabel}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="grid min-h-[22rem] grid-cols-1 gap-2 sm:grid-cols-2 md:min-h-[40rem]">
                {study.images.map((image, index) => (
                  <figure
                    className="relative min-h-[22rem] overflow-hidden  md:min-h-0"
                    key={`${image.src}-${index}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: image.objectPosition }}
                      sizes="(min-width: 768px) 34vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="pt-[clamp(5rem,10vw,9rem)] text-center">
          <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] leading-none tracking-[-0.04em]">
            <BlurText
              text="Work that shows the thinking."
              delay={75}
              direction="bottom"
              className="justify-center"
            />
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 sm:text-base">
            The final screen is only part of the story. Each project begins
            with real constraints, a deliberate set of decisions and an
            outcome that can be understood.
          </p>
          <Link
            className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-abyss-navy/45 px-5 text-sm font-medium transition-colors hover:border-volt-time hover:text-volt-time"
            href="/case-studies"
          >
            Case Studies
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
