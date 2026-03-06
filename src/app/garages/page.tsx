"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { StarRating } from "@/components/ui/star-rating";
import { Modal } from "@/components/ui/modal";
import { MapPin, Star, Verified, DollarSign, Navigation, Phone, MessageSquare } from "lucide-react";
import { mockGarages, mockReviews, mockVehicles } from "@/lib/data/mock-data";
import { recommendGarages } from "@/lib/ai/garage-recommendations";
import { formatDistance } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedTrafficScene } from "@/components/ui/animated-traffic";

export default function GaragesPage() {
  const [selectedGarage, setSelectedGarage] = useState<typeof mockGarages[0] | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<"all" | "car" | "bike">("all");
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [reviews, setReviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", serviceType: "General" });

  // Get AI-recommended garages
  const recommended = recommendGarages(mockGarages, mockVehicles[0], {
    lat: 28.5706,
    lng: 77.3272
  });

  const filteredGarages = recommended.filter((garage) => {
    if (selectedVehicleType !== "all" && !garage.specializations.includes(selectedVehicleType))
      return false;
    if (priceFilter.length > 0 && !priceFilter.includes(garage.priceRange)) return false;
    return true;
  });

  const garageReviews = useMemo(
    () => (selectedGarage ? reviews.filter((r) => r.garageId === selectedGarage.id) : []),
    [selectedGarage, reviews]
  );

  const handleSubmitReview = () => {
    if (!selectedGarage || !newReview.comment.trim()) return;
    setReviews((prev) => [
      {
        id: `${Date.now()}`,
        garageId: selectedGarage.id,
        userId: "guest",
        userName: "You",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().slice(0, 10),
        serviceType: newReview.serviceType,
        helpful: 0
      },
      ...prev
    ]);
    setNewReview({ rating: 5, comment: "", serviceType: "General" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedTrafficScene dimmed />
      <Navbar />

      <main className="container mx-auto px-6 py-10">
        <AnimatedContainer>
          <h1 className="text-4xl font-display font-extrabold mb-2 bg-accent-gradient bg-clip-text text-transparent">
            Find Garages & Mechanics
          </h1>
          <p className="text-slate-400 mb-10">AI-recommended service centers near you</p>
        </AnimatedContainer>

        {/* Filters */}
        <AnimatedContainer delay={0.1}>
          <GlassCard className="mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Vehicle Type</label>
                <div className="flex gap-2">
                  {["all", "car", "bike"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedVehicleType(type as any)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedVehicleType === type
                          ? "bg-accent-blue text-white"
                          : "bg-white/5 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price Range</label>
                <div className="flex gap-2">
                  {["$", "$$", "$$$"].map((price) => (
                    <button
                      key={price}
                      onClick={() => {
                        setPriceFilter((prev) =>
                          prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
                        );
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        priceFilter.includes(price)
                          ? "bg-accent-cyan text-white"
                          : "bg-white/5 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </AnimatedContainer>

        {/* Garages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGarages.map((garage, idx) => (
            <AnimatedContainer key={garage.id} delay={0.1 * idx}>
              <GlassCard hover className="h-full flex flex-col">
                <div className="mb-4">
                  <img
                    src={garage.imageUrl}
                    alt={garage.name}
                    className="h-40 w-full rounded-2xl object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-bold">{garage.name}</h3>
                    {garage.isVerified && (
                      <Verified className="h-5 w-5 text-accent-cyan shrink-0" />
                    )}
                  </div>

                  <div className="mb-3 flex items-center gap-2 text-sm">
                    <StarRating rating={garage.rating} size="sm" />
                    <span className="text-slate-500">({garage.reviewCount})</span>
                  </div>

                  <div className="mb-3 space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-accent-blue" />
                      <span>{garage.address}, {garage.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-accent-cyan" />
                      <span>{formatDistance(garage.distance || 0)} away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-accent-magenta" />
                      <span>Price range: {garage.priceRange}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1">
                    {garage.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-accent-blue/20 px-2 py-1 text-xs text-accent-blue"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedGarage(garage)}
                    className="btn-ghost text-xs flex-1"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Reviews
                  </button>
                  <Link
                    href={`/bookings/new?garageId=${garage.id}`}
                    className="btn-primary text-xs flex-1 text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </GlassCard>
            </AnimatedContainer>
          ))}
        </div>

        {/* Reviews Modal */}
        {selectedGarage && (
          <Modal
            isOpen={!!selectedGarage}
            onClose={() => setSelectedGarage(null)}
            title={`Reviews - ${selectedGarage.name}`}
            size="lg"
          >
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-4xl font-bold">{selectedGarage.rating}</p>
                  <StarRating rating={selectedGarage.rating} size="sm" showNumber={false} />
                  <p className="text-xs text-slate-500 mt-1">{selectedGarage.reviewCount} reviews</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300 mb-2">{selectedGarage.address}</p>
                  <button
                    className="btn-primary text-xs"
                    onClick={() => setNewReview((prev) => ({ ...prev, comment: prev.comment }))}
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    className={`btn-ghost text-xs ${newReview.rating === r ? "bg-white/10 border border-white/10" : ""}`}
                    onClick={() => setNewReview((prev) => ({ ...prev, rating: r }))}
                  >
                    {r} ★
                  </button>
                ))}
              </div>
              <input
                className="input text-sm"
                placeholder="Service type (e.g., Oil Change)"
                value={newReview.serviceType}
                onChange={(e) => setNewReview((prev) => ({ ...prev, serviceType: e.target.value }))}
              />
              <textarea
                className="input min-h-[100px] text-sm"
                placeholder="Share your experience"
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
              />
              <div className="flex justify-end">
                <button className="btn-primary text-xs" onClick={handleSubmitReview}>
                  Submit Review
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {garageReviews.length === 0 ? (
                <p className="text-center text-slate-400 py-8">No reviews yet. Be the first!</p>
              ) : (
                garageReviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <p className="text-xs text-slate-500">{review.date}</p>
                      </div>
                      <StarRating rating={review.rating} size="sm" showNumber={false} />
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{review.comment}</p>
                    <p className="text-xs text-slate-500">Service: {review.serviceType}</p>
                  </div>
                ))
              )}
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}
