import { Achievement, UserProfile } from "@/types";

/**
 * Gamification & Achievement System
 */

export const ACHIEVEMENTS_CATALOG: Omit<Achievement, "id" | "unlockedAt" | "progress">[] = [
  {
    title: "First Steps",
    description: "Add your first vehicle",
    icon: "🚗",
    tier: "bronze",
    points: 50,
    maxProgress: 1
  },
  {
    title: "Service Starter",
    description: "Complete your first service",
    icon: "🔧",
    tier: "bronze",
    points: 100,
    maxProgress: 1
  },
  {
    title: "Service Streak",
    description: "Complete 5 services on time",
    icon: "⚡",
    tier: "silver",
    points: 300,
    maxProgress: 5
  },
  {
    title: "Maintenance Master",
    description: "Complete 10 services",
    icon: "🏆",
    tier: "gold",
    points: 500,
    maxProgress: 10
  },
  {
    title: "Road Warrior",
    description: "Track 50,000 km across all vehicles",
    icon: "🛣️",
    tier: "silver",
    points: 400,
    maxProgress: 50000
  },
  {
    title: "Century Club",
    description: "Track 100,000 km",
    icon: "💯",
    tier: "gold",
    points: 800,
    maxProgress: 100000
  },
  {
    title: "Marathon Driver",
    description: "Track 250,000 km",
    icon: "🌟",
    tier: "platinum",
    points: 2000,
    maxProgress: 250000
  },
  {
    title: "Review Pioneer",
    description: "Write your first garage review",
    icon: "📝",
    tier: "bronze",
    points: 75,
    maxProgress: 1
  },
  {
    title: "Community Helper",
    description: "Write 10 garage reviews",
    icon: "🤝",
    tier: "silver",
    points: 350,
    maxProgress: 10
  },
  {
    title: "Garage Guru",
    description: "Visit 5 different garages",
    icon: "🏪",
    tier: "gold",
    points: 600,
    maxProgress: 5
  },
  {
    title: "Early Bird",
    description: "Book a service within 48 hours of reminder",
    icon: "⏰",
    tier: "silver",
    points: 200,
    maxProgress: 1
  },
  {
    title: "Perfect Record",
    description: "Never miss a service for 1 year",
    icon: "💎",
    tier: "platinum",
    points: 1500,
    maxProgress: 1
  }
];

export function calculateUserTier(points: number): UserProfile["tier"] {
  if (points >= 3000) return "master";
  if (points >= 1500) return "expert";
  if (points >= 500) return "pro";
  return "starter";
}

export function checkAchievementUnlock(
  profile: UserProfile,
  action: {
    type: "vehicle_added" | "service_completed" | "review_written" | "km_tracked" | "garage_visited";
    count?: number;
  }
): Achievement[] {
  const unlockedAchievements: Achievement[] = [];

  ACHIEVEMENTS_CATALOG.forEach((achTemplate) => {
    // Check if already unlocked
    const existing = profile.achievements.find((a) => a.title === achTemplate.title);
    if (existing?.unlockedAt) return;

    let shouldUnlock = false;

    // Check unlock conditions
    switch (action.type) {
      case "vehicle_added":
        if (achTemplate.title === "First Steps") shouldUnlock = true;
        break;
      case "service_completed":
        if (achTemplate.title === "Service Starter" && profile.servicesCompleted >= 1)
          shouldUnlock = true;
        if (achTemplate.title === "Service Streak" && profile.servicesCompleted >= 5)
          shouldUnlock = true;
        if (achTemplate.title === "Maintenance Master" && profile.servicesCompleted >= 10)
          shouldUnlock = true;
        break;
      case "review_written":
        if (achTemplate.title === "Review Pioneer") shouldUnlock = true;
        break;
      case "km_tracked":
        if (achTemplate.title === "Road Warrior" && profile.totalKm >= 50000) shouldUnlock = true;
        if (achTemplate.title === "Century Club" && profile.totalKm >= 100000) shouldUnlock = true;
        if (achTemplate.title === "Marathon Driver" && profile.totalKm >= 250000)
          shouldUnlock = true;
        break;
    }

    if (shouldUnlock) {
      unlockedAchievements.push({
        ...achTemplate,
        id: `ach-${Date.now()}-${achTemplate.title.toLowerCase().replace(/\s/g, "-")}`,
        unlockedAt: new Date().toISOString(),
        progress: achTemplate.maxProgress
      });
    }
  });

  return unlockedAchievements;
}

export function calculateLoyaltyPoints(action: {
  type: "service" | "review" | "referral" | "purchase";
  amount?: number;
}): number {
  switch (action.type) {
    case "service":
      return Math.floor((action.amount || 0) * 0.1); // 10% of service cost
    case "review":
      return 50;
    case "referral":
      return 500;
    case "purchase":
      return Math.floor((action.amount || 0) * 0.05); // 5% of purchase
    default:
      return 0;
  }
}
