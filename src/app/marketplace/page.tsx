"use client";

import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Package, ExternalLink, TrendingUp } from "lucide-react";

const parts = [
  {
    id: 1,
    name: "Engine Oil Filter",
    brand: "Bosch",
    price: 350,
    rating: 4.5,
    link: "https://example.com"
  },
  {
    id: 2,
    name: "Brake Pads (Front)",
    brand: "Brembo",
    price: 2500,
    rating: 4.8,
    link: "https://example.com"
  },
  {
    id: 3,
    name: "Air Filter",
    brand: "Mahle",
    price: 450,
    rating: 4.6,
    link: "https://example.com"
  },
  {
    id: 4,
    name: "Spark Plugs (Set of 4)",
    brand: "NGK",
    price: 800,
    rating: 4.7,
    link: "https://example.com"
  }
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
            Spare Parts
          </h1>
          <p className="text-slate-400 mb-10">Find genuine parts and best prices</p>
        </AnimatedContainer>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {parts.map((part, idx) => (
            <AnimatedContainer key={part.id} delay={0.1 * idx}>
              <GlassCard hover>
                <div className="mb-3 flex h-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-magenta/10">
                  <Package className="h-10 w-10 text-accent-blue" />
                </div>

                <h3 className="text-lg font-bold mb-1">{part.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{part.brand}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-accent-cyan">₹{part.price}</span>
                  <div className="flex items-center gap-1 text-sm text-yellow-400">
                    <TrendingUp className="h-4 w-4" />
                    {part.rating}
                  </div>
                </div>

                <a
                  href={part.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center text-xs"
                >
                  <ExternalLink className="h-3 w-3" />
                  View on Store
                </a>
              </GlassCard>
            </AnimatedContainer>
          ))}
        </div>
      </main>
    </div>
  );
}
