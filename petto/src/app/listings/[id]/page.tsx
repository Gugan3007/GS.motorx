import { VerifiedBadge } from "@/components/ui/verified-badge";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 card overflow-hidden">
        <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1600&auto=format&fit=crop&q=60" alt="Pet photo" className="h-[420px] w-full object-cover" />
        <div className="p-6">
          <h1 className="section-title mb-2">Labrador Retriever — Male</h1>
          <p className="text-sm text-gray-400">18 months • Vaccinated • Health Records Available</p>
          <div className="mt-4 flex items-center gap-3">
            <VerifiedBadge level="verified-breeder" />
            <span className="text-sm text-gray-400">Listing ID: {params.id}</span>
          </div>
        </div>
      </div>
      <aside className="card p-6">
        <h2 className="section-title mb-4 text-xl">Seller Contact</h2>
        <p className="text-sm text-gray-400">Formal inquiries only. Identity verification required.</p>
        <div className="mt-4 flex gap-2">
          <button className="btn-primary">Request Details</button>
          <button className="btn-ghost">Save Listing</button>
        </div>
      </aside>
    </div>
  );
}
