import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Petto — Premium Pet Marketplace",
  description: "A high-trust platform for verified breeders, licensed shops, NGOs, and responsible owners.",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="navbar">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl font-semibold text-gray-100">Petto</span>
              <span className="text-xs text-gray-400">Regulated, curated pet marketplace</span>
            </div>
            <nav className="flex items-center gap-4">
              <a className="btn-ghost" href="/listings">Listings</a>
              <a className="btn-ghost" href="/sellers">Sellers</a>
              <a className="btn-ghost" href="/compliance">Compliance</a>
              <a className="btn-primary" href="/dashboard/seller">Seller Dashboard</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
      </body>
    </html>
  );
}
