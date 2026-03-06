import type { Metadata } from "next";
import { Space_Grotesk, Oxanium } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  display: "swap"
});

export const metadata: Metadata = {
  title: "GS MotorX | Smart Vehicle Concierge",
  description: "Cinematic automotive maintenance, booking, and AI concierge for cars & bikes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${oxanium.variable}`} suppressHydrationWarning>
      <body className="bg-night-900 text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
