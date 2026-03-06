import { VerifiedBadge, VerificationLevel } from "@/components/ui/verified-badge";
import { motion } from "framer-motion";

type Listing = {
  id: string;
  title: string;
  breed: string;
  age: string;
  price: number;
  imageUrl: string;
  seller: { name: string; level: VerificationLevel; rating: number };
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card overflow-hidden"
    >
      <img src={listing.imageUrl} alt="Pet photo" className="h-56 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="section-title text-xl">{listing.title}</h3>
          <VerifiedBadge level={listing.seller.level} />
        </div>
        <p className="mt-2 text-sm text-gray-400">{listing.breed} • {listing.age}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-100">₹{listing.price.toLocaleString()}</span>
          <a href={`/listings/${listing.id}`} className="btn-primary">View Listing</a>
        </div>
      </div>
    </motion.article>
  );
}
