import {
  BounceCards,
  type BounceCardImage,
} from "@/components/ui/bounce-cards";
import { BlurText } from "@/components/ui/blur-text";

const trailImages = [
  {
    src: "/images/apidennalogo.png",
    alt: "Apidenna website shown on a laptop",
    fit: "cover",
  },
  {
    src: "/images/batteryhousecase2.png",
    alt: "Battery House project",
    fit: "cover",
  },
  {
    src: "/images/exito.png",
    alt: "Exito logo",
    fit: "contain",
  },
  {
    src: "/images/wintex.png",
    alt: "WinTex logo",
    fit: "contain",
  },
  {
    src: "/images/todo.png",
    alt: "Todo logo",
    fit: "contain",
  },
] as const satisfies readonly BounceCardImage[];

export function ConnectedProductsSection() {
  return (
    <section className="min-h-[50svh] overflow-hidden bg-cool-frost text-abyss-navy md:h-[100vh]">
      <div className="page-gutter grid min-h-[50svh] content-start grid-cols-1 gap-5 py-[clamp(2rem,7vh,5rem)] md:h-full md:min-h-0 md:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.9fr)] md:gap-[clamp(3rem,7vw,8rem)]">
        <div className="flex min-h-0 flex-col justify-start">
          <h2 className="max-w-[15ch] text-[clamp(2.4rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.045em]">
            <BlurText
              text="Good Products lose momentum when every part moves separately."
              delay={85}
              direction="bottom"
            />
          </h2>

          <div className="mt-5 flex h-[7rem] items-start justify-center sm:h-[9rem] md:mt-[clamp(2rem,6vh,4.5rem)] md:h-auto md:justify-start md:overflow-visible">
            <BounceCards
              images={trailImages}
              className="absolute overflow z-20 origin-top -top-15 scale-75 sm:scale-[0.72] md:origin-left right-10 md:scale-100 lg:scale-120 xl:scale-200"
            />
          </div>
        </div>

        <div className="flex flex-col justify-start gap-5 md:gap-[clamp(2rem,7vh,5rem)] md:pt-1">
          <p className="max-w-[28rem] text-[clamp(1rem,4.5vw,1.25rem)] leading-[1.55] md:text-2xl">
            A strong website cannot rescue unclear positioning. Great content
            cannot fix a broken customer journey. A useful product still needs
            a reason for people to notice and trust it.
          </p>

          <p className="max-w-[28rem] text-[clamp(1.1rem,5vw,1.45rem)] leading-[1.65] tracking-[-0.025em] md:text-[clamp(1.45rem,2.5vw,2.3rem)] md:leading-[2]">
            Lumen &amp; Flow{" "}
            <span className="relative inline-block after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-1 after:rounded-full after:bg-volt-time after:content-['']">
              connects
            </span>
            <br />
            <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:rounded-full after:bg-volt-time after:content-['']">
              technology, marketing and
            </span>
            <br />
            <span className="relative inline-block after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:rounded-full after:bg-volt-time after:content-['']">
              creative
            </span>{" "}
            thinking from the beginning, so each decision strengthens the next.
          </p>
        </div>
      </div>
    </section>
  );
}
