import { Garage, Vehicle, Review } from "@/types";

/**
 * AI-powered Garage Recommendation Engine
 */

export function recommendGarages(
  garages: Garage[],
  vehicle: Vehicle,
  userLocation?: { lat: number; lng: number },
  filters?: {
    maxDistance?: number;
    minRating?: number;
    priceRange?: Garage["priceRange"][];
  }
): Garage[] {
  let scored = garages.map((garage) => {
    let score = 0;

    // Vehicle type specialization match (high priority)
    if (garage.specializations.includes(vehicle.type)) {
      score += 40;
    }

    // Rating score (0-30 points)
    score += (garage.rating / 5) * 30;

    // Review count (social proof, 0-15 points)
    score += Math.min(garage.reviewCount / 10, 1) * 15;

    // Verified badge (10 points)
    if (garage.isVerified) {
      score += 10;
    }

    // Distance penalty (closer is better, 0-5 points)
    if (userLocation && garage.distance !== undefined) {
      const distanceScore = Math.max(0, 5 - garage.distance / 2);
      score += distanceScore;
    }

    return { garage, score };
  });

  // Apply filters
  if (filters?.maxDistance && userLocation) {
    scored = scored.filter((s) => (s.garage.distance || Infinity) <= filters.maxDistance!);
  }

  if (filters?.minRating) {
    scored = scored.filter((s) => s.garage.rating >= filters.minRating!);
  }

  if (filters?.priceRange) {
    scored = scored.filter((s) => filters.priceRange!.includes(s.garage.priceRange));
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.map((s) => s.garage);
}

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function analyzeReviewSentiment(reviews: Review[]): {
  positive: number;
  neutral: number;
  negative: number;
} {
  const positive = reviews.filter((r) => r.rating >= 4).length;
  const neutral = reviews.filter((r) => r.rating === 3).length;
  const negative = reviews.filter((r) => r.rating <= 2).length;

  return {
    positive: reviews.length ? Math.round((positive / reviews.length) * 100) : 0,
    neutral: reviews.length ? Math.round((neutral / reviews.length) * 100) : 0,
    negative: reviews.length ? Math.round((negative / reviews.length) * 100) : 0
  };
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
