import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

import "./fluid-glass-surface.css";

type FluidGlassSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function FluidGlassSurface({
  children,
  className,
  ...props
}: FluidGlassSurfaceProps) {
  return (
    <div className={cn("fluid-glass-surface", className)} {...props}>
      <span className="fluid-glass-surface__highlight" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
