import { motion } from "framer-motion";

export function FilterPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card p-4"
      aria-label="Filters"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Breed
          <input className="mt-1 w-full rounded-lg border border-gray-400/20 bg-transparent px-3 py-2 text-sm" placeholder="e.g., Labrador" />
        </label>
        <label className="text-sm">
          Age
          <select className="mt-1 w-full rounded-lg border border-gray-400/20 bg-transparent px-3 py-2 text-sm">
            <option className="bg-charcoal-800">Any</option>
            <option className="bg-charcoal-800">Puppy/Kitten</option>
            <option className="bg-charcoal-800">Adult</option>
          </select>
        </label>
        <label className="text-sm">
          Location
          <input className="mt-1 w-full rounded-lg border border-gray-400/20 bg-transparent px-3 py-2 text-sm" placeholder="City or PIN" />
        </label>
        <label className="text-sm">
          Price Range
          <select className="mt-1 w-full rounded-lg border border-gray-400/20 bg-transparent px-3 py-2 text-sm">
            <option className="bg-charcoal-800">Any</option>
            <option className="bg-charcoal-800">₹10k–₹30k</option>
            <option className="bg-charcoal-800">₹30k–₹60k</option>
            <option className="bg-charcoal-800">₹60k+</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button className="btn-ghost">Reset</button>
        <button className="btn-primary">Apply Filters</button>
      </div>
    </motion.aside>
  );
}
