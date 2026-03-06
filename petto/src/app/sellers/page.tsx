import { VerifiedBadge } from "@/components/ui/verified-badge";

const sellers = [
  { name: "North Ridge Kennel", level: "verified-breeder" as const },
  { name: "Lavender Pets", level: "licensed-shop" as const },
  { name: "Happy Paws Foundation", level: "registered-ngo" as const }
];

export default function SellersPage() {
  return (
    <div>
      <h1 className="section-title mb-6">Professional Sellers</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {sellers.map((s, i) => (
          <div key={i} className="card p-4 flex items-center justify-between">
            <span className="font-medium text-gray-100">{s.name}</span>
            <VerifiedBadge level={s.level} />
          </div>
        ))}
      </div>
    </div>
  );
}
