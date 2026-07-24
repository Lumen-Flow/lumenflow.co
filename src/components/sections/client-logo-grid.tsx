import Image from "next/image";

import { clientLogos } from "@/content/client-logos";
import { cn } from "@/lib/utils";

export function ClientLogoGrid() {
  return (
    <section
      className="h-[40vh] bg-cool-frost px-[clamp(2rem,10vw,10rem)] py-[clamp(1.25rem,2vh,2rem)]"
      aria-label="Client logos"
    >
      <div className="grid h-full grid-cols-2 grid-rows-4 border-x border-steel-grey/35 md:grid-cols-4 md:grid-rows-2">
        {clientLogos.map((logo, index) => (
          <div
            className={cn(
              "flex min-h-0 items-center justify-center border-steel-grey/35",
              index < 6 && "border-b",
              index % 2 === 0 && "border-r",
              index >= 4 && "md:border-b-0",
              index % 4 !== 3 ? "md:border-r" : "md:border-r-0",
            )}
            key={logo.name}
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              className="max-h-[clamp(1.75rem,5vh,2.75rem)] max-w-[clamp(3.5rem,24vw,7rem)] object-contain md:max-h-[clamp(2.25rem,7vh,4rem)] md:max-w-[clamp(4rem,11vw,9.5rem)]"
              sizes="(min-width: 768px) 10rem, 22vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
