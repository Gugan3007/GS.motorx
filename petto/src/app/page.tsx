import { FilterPanel } from "@/components/search/filter-panel";
import { ListingCard } from "@/components/listing/listing-card";

const listings = [
  {
    id: "l1",
    title: "Labrador Retriever — Male",
    breed: "Labrador",
    age: "18 months",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&auto=format&fit=crop&q=60",
    seller: { name: "North Ridge Kennel", level: "verified-breeder", rating: 4.8 }
  },
  {
    id: "l2",
    title: "Persian Cat — Female",
    breed: "Persian",
    age: "2 years",
    price: 35000,
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&auto=format&fit=crop&q=60",
    seller: { name: "Lavender Pets", level: "licensed-shop", rating: 4.6 }
  }
];

export default function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <h1 className="section-title mb-4">Find a Pet</h1>
        <p className="text-sm text-gray-400">Advanced search with structured filters. High-trust listings only.</p>
        <div className="mt-6"><FilterPanel /></div>
      </div>
      <div className="md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-title">Featured Listings</h2>
          <a className="btn-ghost" href="/listings">View all</a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </div>
    </div>
  );
}
