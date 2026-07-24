export type ClientLogo = {
  name: string;
  src: `/images/${string}`;
  width: number;
  height: number;
};

export const clientLogos = [
  {
    name: "Apidenna",
    src: "/images/apidennalogo.png",
    width: 160,
    height: 80,
  },
  {
    name: "Glow Studio",
    src: "/images/nmglolw.png",
    width: 96,
    height: 96,
  },
  {
    name: "Battery House",
    src: "/images/batteryhouseLogo.png",
    width: 104,
    height: 104,
  },
  {
    name: "Apex Auto",
    src: "/images/apex.png",
    width: 152,
    height: 76,
  },
  {
    name: "Wintex Chemicals",
    src: "/images/wintexchem.png",
    width: 152,
    height: 76,
  },
  {
    name: "WinTex",
    src: "/images/wintex.png",
    width: 152,
    height: 76,
  },
  {
    name: "Exito",
    src: "/images/exito.png",
    width: 144,
    height: 72,
  },
  {
    name: "Todo",
    src: "/images/todo.png",
    width: 96,
    height: 96,
  },
] as const satisfies readonly ClientLogo[];
