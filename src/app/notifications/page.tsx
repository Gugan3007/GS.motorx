"use client";

import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Bell, Award, CheckCircle2, AlertCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "reminder",
    title: "Service Due Soon",
    message: "Honda City is due for service in 2 days",
    date: "2025-12-20",
    icon: AlertCircle,
    color: "text-yellow-400"
  },
  {
    id: 2,
    type: "achievement",
    title: "Maintenance Master!",
    message: "You've completed 5 services on time. Keep it up!",
    date: "2025-12-18",
    icon: Award,
    color: "text-accent-cyan"
  },
  {
    id: 3,
    type: "success",
    title: "Booking Confirmed",
    message: "Your service appointment has been confirmed for Dec 28",
    date: "2025-12-17",
    icon: CheckCircle2,
    color: "text-green-400"
  }
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <div className="flex items-center gap-3 mb-10">
            <Bell className="h-8 w-8 text-accent-blue" />
            <div>
              <h1 className="text-4xl font-display font-extrabold bg-accent-gradient bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-slate-400">Stay updated on your vehicles</p>
            </div>
          </div>
        </AnimatedContainer>

        <div className="space-y-4 max-w-3xl">
          {notifications.map((notif, idx) => {
            const Icon = notif.icon;
            return (
              <AnimatedContainer key={notif.id} delay={0.1 * idx}>
                <GlassCard hover>
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notif.color} bg-current/10`}
                    >
                      <Icon className={`h-5 w-5 ${notif.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{notif.title}</h3>
                      <p className="text-sm text-slate-300 mb-2">{notif.message}</p>
                      <p className="text-xs text-slate-500">{notif.date}</p>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            );
          })}
        </div>
      </main>
    </div>
  );
}
