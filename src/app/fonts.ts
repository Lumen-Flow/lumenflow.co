import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";

export const apfelGrotezk = localFont({
  src: "../assets/fonts/ApfelGrotezk-Regular.woff2",
  variable: "--font-apfel",
  display: "swap",
  preload: true,
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
});

// TODO: Replace this fallback when ApfelGrotezk-RegularBrukt.woff2 is supplied.
export const apfelGrotezkBrukt = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-apfel-brukt",
  display: "swap",
  preload: false,
});
