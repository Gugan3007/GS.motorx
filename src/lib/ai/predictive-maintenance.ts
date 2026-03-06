import { Vehicle, ServiceRecord, Prediction } from "@/types";

/**
 * Predictive Maintenance Engine
 * Analyzes vehicle data to predict potential failures
 */

const PART_LIFESPANS: Record<string, { avgKm: number; variance: number }> = {
  "Engine Oil": { avgKm: 10000, variance: 2000 },
  "Oil Filter": { avgKm: 10000, variance: 2000 },
  "Air Filter": { avgKm: 15000, variance: 3000 },
  "Brake Pads": { avgKm: 40000, variance: 10000 },
  "Brake Discs": { avgKm: 60000, variance: 15000 },
  "Spark Plugs": { avgKm: 30000, variance: 10000 },
  "Timing Belt": { avgKm: 80000, variance: 20000 },
  "Battery": { avgKm: 50000, variance: 15000 },
  "Clutch": { avgKm: 70000, variance: 20000 },
  "Suspension": { avgKm: 100000, variance: 30000 },
  "Tires": { avgKm: 40000, variance: 10000 },
  "Coolant": { avgKm: 40000, variance: 10000 },
  "Transmission Oil": { avgKm: 50000, variance: 15000 }
};

const PART_COSTS: Record<string, { min: number; max: number }> = {
  "Engine Oil": { min: 1500, max: 3500 },
  "Oil Filter": { min: 300, max: 800 },
  "Air Filter": { min: 400, max: 1000 },
  "Brake Pads": { min: 2000, max: 5000 },
  "Brake Discs": { min: 4000, max: 8000 },
  "Spark Plugs": { min: 800, max: 2500 },
  "Timing Belt": { min: 5000, max: 12000 },
  "Battery": { min: 3000, max: 8000 },
  "Clutch": { min: 8000, max: 15000 },
  "Suspension": { min: 10000, max: 25000 },
  "Tires": { min: 4000, max: 12000 },
  "Coolant": { min: 1000, max: 2500 },
  "Transmission Oil": { min: 3000, max: 7000 }
};

export function predictPartFailures(
  vehicle: Vehicle,
  serviceHistory: ServiceRecord[] = []
): Prediction[] {
  const predictions: Prediction[] = [];
  const currentKm = vehicle.km;
  const lastServiceKm = vehicle.lastServiceKm || 0;

  // Analyze each critical part
  Object.entries(PART_LIFESPANS).forEach(([part, lifespan]) => {
    // Check if part was recently replaced in service history
    const lastReplacement = serviceHistory
      .filter((s) => s.parts.includes(part))
      .sort((a, b) => b.km - a.km)[0];

    const baseKm = lastReplacement ? lastReplacement.km : 0;
    const kmSinceLastService = currentKm - baseKm;

    // Calculate when part should be replaced
    const failureKm = baseKm + lifespan.avgKm;
    const kmRemaining = failureKm - currentKm;

    // Skip if part was recently serviced or has plenty of life
    if (kmRemaining > lifespan.avgKm * 0.5) return;

    // Determine severity
    let severity: Prediction["severity"] = "low";
    let confidence = 75;

    if (kmRemaining < 0) {
      severity = "critical";
      confidence = 95;
    } else if (kmRemaining < 2000) {
      severity = "high";
      confidence = 90;
    } else if (kmRemaining < 5000) {
      severity = "medium";
      confidence = 80;
    }

    // Calculate cost estimate
    const costRange = PART_COSTS[part] || { min: 1000, max: 5000 };
    const estimatedCost = Math.round((costRange.min + costRange.max) / 2);

    // Age factor (older vehicles need more care)
    const age = new Date().getFullYear() - vehicle.year;
    if (age > 5) confidence = Math.min(confidence + 5, 100);
    if (age > 10) confidence = Math.min(confidence + 10, 100);

    predictions.push({
      id: `pred-${vehicle.id}-${part.toLowerCase().replace(/\s/g, "-")}`,
      vehicleId: vehicle.id,
      part,
      severity,
      estimatedFailureKm: failureKm,
      currentKm,
      kmRemaining: Math.max(0, kmRemaining),
      estimatedCost,
      description: `${part} is ${kmRemaining <= 0 ? "overdue" : `due in ${kmRemaining.toLocaleString()} km`}`,
      recommendation: generateRecommendation(part, kmRemaining, severity),
      confidence
    });
  });

  // Sort by severity and km remaining
  return predictions.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const diff = severityOrder[a.severity] - severityOrder[b.severity];
    return diff !== 0 ? diff : a.kmRemaining - b.kmRemaining;
  });
}

function generateRecommendation(part: string, kmRemaining: number, severity: string): string {
  if (kmRemaining <= 0) {
    return `⚠️ Immediate replacement required for ${part}. Schedule service ASAP to avoid damage.`;
  }

  if (severity === "high") {
    return `🔴 Schedule ${part} replacement within the next 1-2 weeks to prevent failure.`;
  }

  if (severity === "medium") {
    return `🟡 Plan ${part} replacement in your next service appointment.`;
  }

  return `🟢 ${part} is approaching service interval. Monitor for the next ${kmRemaining} km.`;
}

export function calculateVehicleHealth(vehicle: Vehicle, predictions: Prediction[]): number {
  if (predictions.length === 0) return 100;

  let healthScore = 100;

  predictions.forEach((pred) => {
    switch (pred.severity) {
      case "critical":
        healthScore -= 20;
        break;
      case "high":
        healthScore -= 10;
        break;
      case "medium":
        healthScore -= 5;
        break;
      case "low":
        healthScore -= 2;
        break;
    }
  });

  return Math.max(0, Math.min(100, healthScore));
}

export function estimateTotalMaintenanceCost(predictions: Prediction[]): number {
  return predictions
    .filter((p) => p.severity === "high" || p.severity === "critical")
    .reduce((sum, p) => sum + p.estimatedCost, 0);
}
