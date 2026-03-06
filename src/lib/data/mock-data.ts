import {
  Vehicle,
  ServiceRecord,
  UserProfile,
  Garage,
  Review,
  Booking,
  Achievement
} from "@/types";
import { ACHIEVEMENTS_CATALOG } from "../ai/gamification";

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    name: "Honda City",
    model: "VX CVT",
    variant: "Petrol",
    year: 2020,
    type: "car",
    fuel: "petrol",
    km: 45000,
    lastServiceDate: "2025-10-12",
    lastServiceKm: 40000,
    nextServiceKm: 50000,
    health: 82,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400"
  },
  {
    id: "v2",
    name: "Royal Enfield Classic 350",
    model: "Standard",
    year: 2022,
    type: "bike",
    fuel: "petrol",
    km: 12000,
    lastServiceDate: "2025-11-20",
    lastServiceKm: 10000,
    nextServiceKm: 15000,
    health: 95,
    imageUrl: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400"
  }
];

export const mockServiceHistory: ServiceRecord[] = [
  {
    id: "s1",
    vehicleId: "v1",
    date: "2025-10-12",
    km: 40000,
    type: "Regular Service",
    cost: 3500,
    garage: "AutoCare Service Center",
    parts: ["Engine Oil", "Oil Filter", "Air Filter"],
    notes: "Everything looks good. Brake pads at 60%."
  },
  {
    id: "s2",
    vehicleId: "v1",
    date: "2025-04-08",
    km: 30000,
    type: "Major Service",
    cost: 6500,
    garage: "AutoCare Service Center",
    parts: ["Engine Oil", "Oil Filter", "Air Filter", "Spark Plugs", "Coolant"],
    notes: "Replaced spark plugs. Transmission fluid checked."
  },
  {
    id: "s3",
    vehicleId: "v2",
    date: "2025-11-20",
    km: 10000,
    type: "First Service",
    cost: 1500,
    garage: "Bike Master Workshop",
    parts: ["Engine Oil", "Oil Filter"],
    notes: "First free service completed. All systems normal."
  }
];

export const mockGarages: Garage[] = [
  {
    id: "g1",
    name: "AutoCare Service Center",
    address: "Sector 18, Noida",
    city: "Noida",
    lat: 28.5706,
    lng: 77.3272,
    rating: 4.7,
    reviewCount: 342,
    specializations: ["car", "bike"],
    services: ["Regular Service", "Major Service", "AC Repair", "Brake Service", "Battery"],
    priceRange: "$$",
    distance: 2.3,
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400"
  },
  {
    id: "g2",
    name: "Bike Master Workshop",
    address: "Connaught Place, Delhi",
    city: "Delhi",
    lat: 28.6304,
    lng: 77.2177,
    rating: 4.9,
    reviewCount: 187,
    specializations: ["bike"],
    services: ["Regular Service", "Engine Repair", "Custom Modifications", "Tire Replacement"],
    priceRange: "$",
    distance: 8.5,
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400"
  },
  {
    id: "g3",
    name: "Premium Motors",
    address: "Cyber City, Gurgaon",
    city: "Gurgaon",
    lat: 28.4942,
    lng: 77.0868,
    rating: 4.5,
    reviewCount: 521,
    specializations: ["car"],
    services: [
      "Regular Service",
      "Major Service",
      "Detailing",
      "Paint Protection",
      "Diagnostics"
    ],
    priceRange: "$$$",
    distance: 12.8,
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1632823469920-51b3013a2f82?w=400"
  },
  {
    id: "g4",
    name: "Quick Fix Auto",
    address: "Lajpat Nagar, Delhi",
    city: "Delhi",
    lat: 28.5677,
    lng: 77.2433,
    rating: 4.2,
    reviewCount: 89,
    specializations: ["car"],
    services: ["Regular Service", "Brake Service", "Tire Replacement", "Battery"],
    priceRange: "$",
    distance: 5.2,
    isVerified: false,
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400"
  }
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    garageId: "g1",
    userId: "u1",
    userName: "Rajesh Kumar",
    rating: 5,
    comment:
      "Excellent service! Very professional staff. They explained everything clearly and completed the work on time.",
    date: "2025-12-10",
    serviceType: "Regular Service",
    helpful: 12
  },
  {
    id: "r2",
    garageId: "g1",
    userId: "u2",
    userName: "Priya Sharma",
    rating: 4,
    comment: "Good service but slightly expensive. Overall satisfied with the work quality.",
    date: "2025-12-05",
    serviceType: "AC Repair",
    helpful: 8
  },
  {
    id: "r3",
    garageId: "g2",
    userId: "u3",
    userName: "Arjun Singh",
    rating: 5,
    comment: "Best bike service in Delhi! These guys know their stuff. Highly recommended for RE owners.",
    date: "2025-11-28",
    serviceType: "Regular Service",
    helpful: 24
  }
];

export const mockUserProfile: UserProfile = {
  id: "u1",
  name: "Gugan Saravanan",
  email: "gugan@gsmotorx.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gugan",
  loyaltyPoints: 850,
  tier: "pro",
  totalKm: 57000,
  servicesCompleted: 6,
  achievements: ACHIEVEMENTS_CATALOG.slice(0, 4).map((ach, idx) => ({
    ...ach,
    id: `ach-${idx}`,
    unlockedAt: new Date(Date.now() - idx * 86400000).toISOString(),
    progress: ach.maxProgress
  })),
  joinedAt: "2024-03-15"
};

export const mockBookings: Booking[] = [
  {
    id: "b1",
    vehicleId: "v1",
    garageId: "g1",
    date: "2025-12-28",
    time: "10:00 AM",
    status: "confirmed",
    serviceType: "Regular Service",
    estimatedCost: 3500,
    notes: "Please check brake pads and tire pressure"
  },
  {
    id: "b2",
    vehicleId: "v2",
    garageId: "g2",
    date: "2026-01-05",
    time: "02:00 PM",
    status: "pending",
    serviceType: "Regular Service",
    estimatedCost: 1500
  }
];
