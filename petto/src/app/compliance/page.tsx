export default function CompliancePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="section-title mb-2">Compliance & Documentation</h1>
      <p className="text-sm text-gray-400">Transparent processes for ethical pet ownership and adoption.</p>
      <ul className="mt-6 list-disc pl-6 text-gray-300">
        <li>Pet ownership transfer records</li>
        <li>Health documentation uploads</li>
        <li>Digital agreements for adoption/sale</li>
        <li>Regional compliance notes</li>
      </ul>
      <div className="mt-6 flex gap-2">
        <button className="btn-primary">Upload Documents</button>
        <button className="btn-ghost">View Guidelines</button>
      </div>
    </div>
  );
}
