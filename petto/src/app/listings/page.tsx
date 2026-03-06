import { ListingCard } from "@/components/listing/listing-card";

const listings = Array.from({ length: 6 }).map((_, i) => ({
  id: `l${i+1}`,
  title: `Premium Listing #${i+1}`,
  breed: i % 2 ? "Labrador" : "Persian",
  age: i % 2 ? "Adult" : "Kitten",
  price: 30000 + i * 5000,
  imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&auto=format&fit=crop&q=60",
  seller: { name: "Verified Seller", level: i % 3 === 0 ? "registered-ngo" : "verified-breeder", rating: 4.7 }
}));

export default function ListingsPage() {
  return (
    <div>
      <h1 className="section-title mb-6">All Listings</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
