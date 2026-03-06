export default function SellerDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="card p-6 md:col-span-2">
        <h1 className="section-title mb-2">Seller Analytics</h1>
        <p className="text-sm text-gray-400">Conversion insights, buyer activity tracking, and listing performance.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-4"><p className="text-sm text-gray-400">Active Listings</p><p className="text-2xl font-semibold">12</p></div>
          <div className="card p-4"><p className="text-sm text-gray-400">Monthly Views</p><p className="text-2xl font-semibold">8,420</p></div>
          <div className="card p-4"><p className="text-sm text-gray-400">Inquiry Conversion</p><p className="text-2xl font-semibold">12.4%</p></div>
        </div>
      </div>
      <aside className="card p-6">
        <h2 className="section-title mb-4 text-xl">Actions</h2>
        <div className="flex flex-col gap-2">
          <a className="btn-primary" href="/listings/new">Create Listing</a>
          <button className="btn-ghost">Export Analytics</button>
        </div>
      </aside>
    </div>
  );
}
