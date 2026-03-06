export default function BuyerDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="card p-6 md:col-span-2">
        <h1 className="section-title mb-2">Buyer Activity</h1>
        <p className="text-sm text-gray-400">Saved searches, inquiries, and adoption success metrics.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-4"><p className="text-sm text-gray-400">Saved Searches</p><p className="text-2xl font-semibold">5</p></div>
          <div className="card p-4"><p className="text-sm text-gray-400">Open Inquiries</p><p className="text-2xl font-semibold">3</p></div>
          <div className="card p-4"><p className="text-sm text-gray-400">Adoption Success</p><p className="text-2xl font-semibold">2</p></div>
        </div>
      </div>
      <aside className="card p-6">
        <h2 className="section-title mb-4 text-xl">Actions</h2>
        <div className="flex flex-col gap-2">
          <button className="btn-primary">Save Search</button>
          <button className="btn-ghost">Download Records</button>
        </div>
      </aside>
    </div>
  );
}
