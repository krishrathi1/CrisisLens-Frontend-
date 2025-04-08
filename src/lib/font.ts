import { DM_Sans } from "next/font/google";
import localFont from 'next/font/local';
export const fontDmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dm",
});


// Font files can be colocated inside of `pages`
export const mainFont = localFont({ src: 'Schwarzenegger.ttf',
weight: 'normal',})
