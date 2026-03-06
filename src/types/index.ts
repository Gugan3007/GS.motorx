export type VehicleType = "car" | "bike";
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";
export type ServiceStatus = "due" | "upcoming" | "completed" | "overdue";

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  variant?: string;
  year: number;
  type: VehicleType;
  fuel: FuelType;
  km: number;
  lastServiceDate?: string;
  lastServiceKm?: number;
  nextServiceKm: number;
  health: number;
  imageUrl?: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  km: number;
  type: string;
  cost: number;
  garage: string;
  parts: string[];
  notes?: string;
}

export interface Prediction {
  id: string;
  vehicleId: string;
  part: string;
  severity: "low" | "medium" | "high" | "critical";
  estimatedFailureKm: number;
  currentKm: number;
  kmRemaining: number;
  estimatedCost: number;
  description: string;
  recommendation: string;
  confidence: number; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  points: number;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  loyaltyPoints: number;
  tier: "starter" | "pro" | "expert" | "master";
  totalKm: number;
  servicesCompleted: number;
  achievements: Achievement[];
  joinedAt: string;
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  specializations: VehicleType[];
  services: string[];
  priceRange: "$" | "$$" | "$$$";
  distance?: number;
  isVerified: boolean;
  imageUrl?: string;
}

export interface Review {
  id: string;
  garageId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
  helpful: number;
}

export interface Booking {
  id: string;
  vehicleId: string;
  garageId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  serviceType: string;
  estimatedCost: number;
  notes?: string;
}
