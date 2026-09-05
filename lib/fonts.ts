import localFont from "next/font/local";

const sans = localFont({
  src: [
    { path: "../public/fonts/helvetica-neue-300.woff2", weight: "300" },
    { path: "../public/fonts/helvetica-neue-400.woff2", weight: "400" },
    { path: "../public/fonts/helvetica-neue-500.woff2", weight: "500" },
    { path: "../public/fonts/helvetica-neue-700.woff2", weight: "700" },
  ],
  variable: "--font-portfolio",
  display: "swap",
});
const condensed = localFont({
  src: "../public/fonts/gazzetta-variable.woff2",
  weight: "100 900",
  variable: "--font-portfolio-condensed",
  display: "swap",
});

export const fontVariables = `${sans.variable} ${condensed.variable}`;
