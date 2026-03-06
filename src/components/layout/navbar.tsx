"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Home, CalendarClock, ShoppingBag, Bot, Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard" as const, label: "Dashboard", icon: Home },
  { href: "/vehicles" as const, label: "Vehicles", icon: Car },
  { href: "/bookings" as const, label: "Bookings", icon: CalendarClock },
  { href: "/garages" as const, label: "Garages", icon: ShoppingBag },
  { href: "/assistant" as const, label: "AI Assistant", icon: Bot },
  { href: "/notifications" as const, label: "Notifications", icon: Bell }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-night-800/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-2xl font-display font-extrabold tracking-tight bg-accent-gradient bg-clip-text text-transparent"
        >
          <motion.span
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring", stiffness: 180, damping: 12 }}
            className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2.2" />
              <path d="M12 4v3" />
              <path d="M12 20v-3" />
              <path d="M4 12h3" />
              <path d="M20 12h-3" />
              <path d="M8 8l1.4 1.4" />
              <path d="M16 16l-1.4-1.4" />
              <path d="M16 8l-1.4 1.4" />
              <path d="M8 16l1.4-1.4" />
            </svg>
          </motion.span>
          GS MotorX
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "text-accent-blue"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent-blue shadow-neon"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  );
}
