import Link from "next/link";
import Image from "next/image";
import ColorBends from "@/components/ui/color-bends";
import { ArrowUpRight } from "lucide-react";

import { BlurText } from "@/components/ui/blur-text";

const footerGroups = [
  {
    title: "Disciplines",
    links: [
      { label: "Technology", href: "/technology" },
      { label: "Marketing", href: "/marketing" },
      { label: "Creatives", href: "/creatives" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/#contact" },
    ],
  },
] as const;

const budgets = ["$1K – 10K", "$10K – 20K", "$20K – 100K", "Enterprise"];

export function ClosingSection() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="relative z-10 rounded-b-[clamp(2rem,5vw,4.5rem)] bg-cool-frost">
        <div className="page-gutter w-[85%] mx-auto pb-8 pt-[clamp(4rem,9vw,8rem)]">
          <form
            action="mailto:hello@lumenandflow.co"
            method="post"
            encType="text/plain"
            id="contact"
            className="w-[90%] mx-auto gap-8 rounded-[clamp(1.5rem,4vw,3rem)] bg-volt-time p-[clamp(1.25rem,4vw,4rem)] text-abyss-navy"
          >
            <div className="grid items-end gap-x-4 gap-y-8 md:grid-cols-[auto_minmax(8rem,1fr)_auto_minmax(10rem,1fr)]">
              <label
                htmlFor="contact-name"
                className="font-heading text-[clamp(1.35rem,2.2vw,2.2rem)] font-medium leading-none"
              >
                Hi, I’m
              </label>
              <input
                required
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="min-h-8 min-w-0 border-b border-abyss-navy/45 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-center placeholder:text-abyss-navy/45 focus:border-abyss-navy"
              />

              <label
                htmlFor="contact-service"
                className="mt-3 font-heading text-[clamp(1.35rem,2.2vw,2.2rem)] font-medium leading-none md:mt-0"
              >
                I need help with
              </label>
              <select
                required
                id="contact-service"
                name="service"
                defaultValue=""
                className="min-h-8 min-w-0 border-b border-abyss-navy/45 bg-transparent px-1 py-1 text-sm text-abyss-navy outline-none focus:border-abyss-navy"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="technology">Technology</option>
                <option value="marketing">Marketing</option>
                <option value="creatives">Creatives</option>
                <option value="connected">Connected engagement</option>
              </select>
            </div>

            <div
              role="group"
              aria-labelledby="contact-budget-label"
              className="mt-5 grid items-center gap-x-5 gap-y-3 sm:grid-cols-[auto_1fr]"
            >
              <p
                id="contact-budget-label"
                className="font-heading text-xl font-medium leading-none sm:text-[clamp(1.35rem,2.2vw,2.2rem)]"
              >
                Budget range
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {budgets.map((budget) => (
                  <label key={budget} className="cursor-pointer">
                    <input
                      className="peer sr-only"
                      type="radio"
                      name="budget"
                      value={budget}
                    />
                    <span className="inline-flex min-h-7 items-center rounded-full border border-abyss-navy/60 px-4 text-[1rem] font-medium transition-colors peer-checked:bg-abyss-navy peer-checked:text-cool-frost hover:bg-abyss-navy hover:text-cool-frost">
                      {budget}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-5">
              <div className="grid items-end gap-x-4 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)]">
                <label
                  htmlFor="contact-email"
                  className="font-heading text-xl font-medium leading-none text-[clamp(1.35rem,2.2vw,2.2rem)]"
                >
                  Email
                </label>
                <input
                  required
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="min-h-8 min-w-0 border-b border-abyss-navy/45 bg-transparent px-1 py-1 text-sm font-normal outline-none placeholder:text-center placeholder:text-abyss-navy/45 focus:border-abyss-navy"
                />
              </div>

              <div className="grid items-end gap-x-4 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)]">
                <label
                  htmlFor="contact-information"
                  className="font-heading text-xl font-medium leading-none text-[clamp(1.35rem,2.2vw,2.2rem)]"
                >
                  Additional info?
                </label>
                <input
                  id="contact-information"
                  name="additional-information"
                  type="text"
                  placeholder="Goals, scope, timeline, or helpful links"
                  className="min-h-8 min-w-0 border-b border-abyss-navy/45 bg-transparent px-1 py-1 text-sm font-normal outline-none placeholder:text-center placeholder:text-abyss-navy/45 focus:border-abyss-navy"
                />
              </div>
            </div>

            <button
              type="submit"
              className="focus-ring mt-7 inline-flex min-h-11 items-center gap-3 rounded-full bg-cool-frost px-6 text-sm font-medium text-abyss-navy transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          </form>

          <div className="grid gap-14 pb-6 pt-[clamp(4rem,9vw,8rem)] lg:grid-cols-12">
            <div className="lg:col-span-5">
              <BlurText
                text="Make the next move count."
                animateBy="words"
                direction="bottom"
                delay={90}
                className="max-w-2xl font-heading text-[clamp(2.75rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.045em] text-accent"
              />
              <p className="mt-6 max-w-md text-xl leading-relaxed text-abyss-navy/65">
                Whether you’re shaping a new product, fixing a growth problem or
                building a brand people can recognise, we bring the right
                disciplines together around one clear outcome.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-12">
                <Link
                  href="/#contact"
                  className="focus-ring inline-flex min-h-10 items-center rounded-full bg-volt-time px-5 text-xs font-medium text-abyss-navy transition-transform hover:-translate-y-0.5"
                >
                  Book a call
                </Link>
                <a
                  href="mailto:hello@lumenandflow.co"
                  className="focus-ring inline-flex items-center gap-2 border-b border-abyss-navy/35 pb-1 text-md  text-abyss-navy transition-colors hover:border-abyss-navy"
                >
                  hello@lumenandflow.co
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>

            <nav
              aria-label="Footer"
              className="grid content-start lg:col-span-6 lg:col-start-7"
            >
              {footerGroups.map((group) => (
                <div
                  key={group.title}
                  className="border-b border-abyss-navy/15 py-5 first:pt-0"
                >
                  <h2 className="font-heading text-4xl text-abyss-navy">
                    {group.title}
                  </h2>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="focus-ring  text-xl text-abyss-navy/15 transition-colors hover:text-abyss-navy"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="pt-5">
                <h2 className="font-heading text-4xl text-abyss-navy">
                  Legal
                </h2>
                <p className="mt-3 text-xl text-abyss-navy/45">
                  Privacy Policy&nbsp;&nbsp;·&nbsp;&nbsp;Terms &amp; Conditions
                </p>
              </div>
            </nav>
          </div>

          <p className=" border-abyss-navy/15 pt-4 text-right text-[0.65rem] text-abyss-navy/35">
            © Lumen &amp; Flow 2026. All rights reserved.
          </p>
        </div>
      </div>

      <div className="relative flex h-[clamp(18rem,38vw,30rem)] items-center justify-center overflow-hidden bg-black">
        <ColorBends
          className="absolute inset-0"
          autoRotate={1.5}
          bandWidth={3.5}
          colors={["#C8FF00", "#F0F2F5", "#081C30"]}
          frequency={0.8}
          intensity={1.15}
          iterations={3}
          mouseInfluence={0.35}
          noise={0.04}
          parallax={0.2}
          rotation={18}
          scale={0.9}
          speed={0.15}
          transparent={false}
          warpStrength={0.75}
        />

        <div className="relative z-10 h-[clamp(6rem,14vw,11rem)] w-[clamp(14rem,32vw,28rem)]">
          <Image
            src="/brand/Logo-blackbg.png"
            alt="Lumen & Flow"
            fill
            sizes="(max-width: 768px) 14rem, 28rem"
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
