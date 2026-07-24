import {
  BounceCards,
  type BounceCardImage,
} from "@/components/ui/bounce-cards";
import { BlurText } from "@/components/ui/blur-text";

const trailImages = [
  {
    src: "/images/apidennacase1.png",
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
    <section className="h-[100vh] overflow-hidden bg-cool-frost text-abyss-navy">
      <div className="page-gutter grid h-full grid-cols-1 gap-8 py-[clamp(2rem,7vh,5rem)] md:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.9fr)] md:gap-[clamp(3rem,7vw,8rem)]">
        <div className="flex min-h-0 flex-col justify-between md:justify-start">
          <h2 className="max-w-[15ch] text-[clamp(2.4rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.045em]">
            <BlurText
              text="Good Products lose momentum when every part moves separately."
              delay={85}
              direction="bottom"
            />
          </h2>

          <BounceCards
            images={trailImages}
            className="mt-8 origin-left scale-[0.82] sm:scale-200 md:mt-[clamp(2rem,6vh,4.5rem)]"
          />
        </div>

        <div className="flex flex-col justify-start gap-[clamp(2rem,7vh,5rem)] md:pt-1">
          <p className="max-w-[28rem] text-2xl leading-[1.55]">
            A strong website cannot rescue unclear positioning. Great content
            cannot fix a broken customer journey. A useful product still needs
            a reason for people to notice and trust it.
          </p>

          <p className="max-w-[28rem] text-[clamp(1.45rem,2.5vw,2.3rem)] leading-[2] tracking-[-0.025em]">
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
