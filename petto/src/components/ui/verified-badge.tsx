import { ShieldCheck } from "lucide-react";

export type VerificationLevel = "individual" | "verified-breeder" | "licensed-shop" | "registered-ngo";

const levelCopy: Record<VerificationLevel, string> = {
  individual: "Individual Owner",
  "verified-breeder": "Verified Breeder",
  "licensed-shop": "Licensed Pet Shop",
  "registered-ngo": "Registered NGO"
};

const levelColor: Record<VerificationLevel, string> = {
  individual: "text-gray-300",
  "verified-breeder": "text-accent-steel",
  "licensed-shop": "text-accent-gold",
  "registered-ngo": "text-accent-forest"
};

export function VerifiedBadge({ level }: { level: VerificationLevel }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border border-gray-400/20 px-2 py-1 text-xs ${levelColor[level]}`}>
      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
      <span className="sr-only">Verification level:</span>
      {levelCopy[level]}
    </span>
  );
}
