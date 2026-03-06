"use client";

import { motion } from "framer-motion";

type VehicleKind = "car" | "bus" | "bike" | "scooter" | "lorry" | "van" | "auto" | "school-van" | "taxi" | "ambulance";

interface VehicleConfig {
  id: string;
  kind: VehicleKind;
  lane: string; // tailwind top/bottom classes
  duration: number;
  delay: number;
  reverse?: boolean;
  scale?: number;
  opacity?: number;
}

const VEHICLES: VehicleConfig[] = [
  { id: "car-1", kind: "car", lane: "top-[12%]", duration: 14, delay: 0 },
  { id: "van-1", kind: "van", lane: "top-[18%]", duration: 12, delay: 1 },
  { id: "taxi-1", kind: "taxi", lane: "top-[24%]", duration: 13, delay: 2, opacity: 0.95 },
  { id: "auto-1", kind: "auto", lane: "top-[30%]", duration: 10, delay: 0.5, scale: 0.8, reverse: true },
  { id: "school-van-1", kind: "school-van", lane: "top-[36%]", duration: 16, delay: 3 },
  { id: "bus-1", kind: "bus", lane: "top-[42%]", duration: 18, delay: 2 },
  { id: "ambulance-1", kind: "ambulance", lane: "top-[48%]", duration: 15, delay: 4, opacity: 0.9 },
  { id: "jeep-1", kind: "car", lane: "top-[54%]", duration: 12, delay: 5, scale: 1.05 },
  { id: "lorry-1", kind: "lorry", lane: "top-[60%]", duration: 20, delay: 4, reverse: true },
  { id: "scooter-1", kind: "scooter", lane: "top-[66%]", duration: 16, delay: 3 },
  { id: "bike-1", kind: "bike", lane: "top-[72%]", duration: 12, delay: 1, reverse: true },
  { id: "van-2", kind: "van", lane: "top-[28%]", duration: 14, delay: 6, scale: 0.95, opacity: 0.9 },
  { id: "taxi-2", kind: "taxi", lane: "top-[70%]", duration: 13, delay: 7, reverse: true },
  { id: "auto-2", kind: "auto", lane: "top-[20%]", duration: 11, delay: 8, scale: 0.75 }
];

function Vehicle({ config }: { config: VehicleConfig }) {
  const { kind, duration, delay, reverse, scale = 1, opacity = 1 } = config;
  const baseProps = {
    initial: { x: reverse ? "100vw" : "-100vw", opacity: 0 },
    animate: { x: reverse ? "-100vw" : "100vw", opacity },
    transition: { duration, delay, repeat: Infinity, ease: "linear" }
  };

  return (
    <motion.div
      className="absolute"
      style={{ scaleX: reverse ? -1 : 1, scale }}
      {...baseProps}
    >
      {renderVehicle(kind)}
    </motion.div>
  );
}

function renderVehicle(kind: VehicleKind) {
  switch (kind) {
    case "van":
      return (
        <svg width="140" height="56" viewBox="0 0 140 56" className="drop-shadow-lg">
          <rect x="12" y="18" width="100" height="26" rx="6" fill="url(#vanBody)" />
          <rect x="20" y="10" width="48" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
          <circle cx="36" cy="46" r="9" fill="url(#wheel)" />
          <circle cx="108" cy="46" r="9" fill="url(#wheel)" />
          <defs>
            <linearGradient id="vanBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(120,200,255,0.95)" />
              <stop offset="100%" stopColor="rgba(80,140,255,0.85)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "taxi":
      return (
        <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-lg">
          <rect x="14" y="18" width="92" height="28" rx="6" fill="url(#taxiBody)" />
          <rect x="48" y="8" width="24" height="12" rx="3" fill="rgba(0,0,0,0.6)" />
          <circle cx="36" cy="46" r="9" fill="url(#wheel)" />
          <circle cx="86" cy="46" r="9" fill="url(#wheel)" />
          <rect x="60" y="12" width="20" height="8" rx="2" fill="rgba(255,255,255,0.85)" />
          <defs>
            <linearGradient id="taxiBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,210,70,0.98)" />
              <stop offset="100%" stopColor="rgba(255,170,30,0.9)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "auto":
      return (
        <svg width="70" height="50" viewBox="0 0 70 50" className="drop-shadow-md">
          <rect x="6" y="18" width="44" height="20" rx="6" fill="url(#autoBody)" />
          <rect x="42" y="8" width="14" height="18" rx="3" fill="rgba(0,0,0,0.15)" />
          <circle cx="22" cy="40" r="7" fill="url(#wheel)" />
          <circle cx="46" cy="40" r="7" fill="url(#wheel)" />
          <defs>
            <linearGradient id="autoBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,120,80,0.95)" />
              <stop offset="100%" stopColor="rgba(255,90,90,0.85)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "school-van":
      return (
        <svg width="150" height="62" viewBox="0 0 150 62" className="drop-shadow-lg">
          <rect x="10" y="16" width="120" height="30" rx="6" fill="url(#schoolBody)" />
          <rect x="18" y="8" width="50" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
          <text x="30" y="36" fill="#fff" fontSize="10" fontWeight="700">SCHOOL</text>
          <circle cx="44" cy="50" r="9" fill="url(#wheel)" />
          <circle cx="104" cy="50" r="9" fill="url(#wheel)" />
          <defs>
            <linearGradient id="schoolBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,210,70,0.98)" />
              <stop offset="100%" stopColor="rgba(255,170,30,0.9)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "ambulance":
      return (
        <svg width="150" height="62" viewBox="0 0 150 62" className="drop-shadow-lg">
          <rect x="10" y="18" width="110" height="28" rx="6" fill="url(#ambBody)" />
          <rect x="110" y="14" width="26" height="20" rx="4" fill="url(#ambCab)" />
          <text x="24" y="36" fill="#fff" fontSize="10" fontWeight="700">AMB</text>
          <circle cx="40" cy="50" r="9" fill="url(#wheel)" />
          <circle cx="96" cy="50" r="9" fill="url(#wheel)" />
          <defs>
            <linearGradient id="ambBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
              <stop offset="100%" stopColor="rgba(200,220,255,0.9)" />
            </linearGradient>
            <linearGradient id="ambCab" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,80,90,0.95)" />
              <stop offset="100%" stopColor="rgba(200,40,50,0.9)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "bus":
      return (
        <svg width="160" height="60" viewBox="0 0 160 60" className="drop-shadow-lg">
          <rect x="10" y="16" width="140" height="32" rx="6" fill="url(#busBody)" />
          <rect x="18" y="10" width="80" height="14" rx="4" fill="rgba(255,255,255,0.15)" />
          <rect x="102" y="10" width="40" height="14" rx="4" fill="rgba(255,255,255,0.12)" />
          <circle cx="40" cy="48" r="10" fill="url(#wheel)" />
          <circle cx="120" cy="48" r="10" fill="url(#wheel)" />
          <rect x="8" y="34" width="6" height="8" fill="rgba(109,220,255,0.45)" />
          <rect x="146" y="34" width="6" height="8" fill="rgba(255,60,172,0.6)" />
          <defs>
            <linearGradient id="busBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(89,131,252,0.95)" />
              <stop offset="100%" stopColor="rgba(131,230,255,0.85)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return (
        <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-lg">
          <rect x="16" y="18" width="88" height="28" rx="6" fill="url(#carBody)" />
          <rect x="34" y="10" width="40" height="14" rx="4" fill="url(#carRoof)" />
          <rect x="40" y="12" width="12" height="8" rx="2" fill="rgba(100,200,255,0.5)" />
          <rect x="58" y="12" width="12" height="8" rx="2" fill="rgba(100,200,255,0.5)" />
          <circle cx="38" cy="46" r="9" fill="url(#wheel)" />
          <circle cx="86" cy="46" r="9" fill="url(#wheel)" />
          <rect x="12" y="32" width="6" height="8" fill="rgba(109,220,255,0.4)" />
          <rect x="102" y="32" width="6" height="8" fill="rgba(255,60,172,0.6)" />
          <defs>
            <linearGradient id="carBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(109,220,255,0.9)" />
              <stop offset="100%" stopColor="rgba(80,140,255,0.85)" />
            </linearGradient>
            <linearGradient id="carRoof" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,60,172,0.8)" />
              <stop offset="100%" stopColor="rgba(200,100,255,0.7)" />
            </linearGradient>
            <linearGradient id="wheel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,40,40,0.9)" />
              <stop offset="100%" stopColor="rgba(15,15,15,0.9)" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
}

function CitySkyline() {
  const buildings = Array.from({ length: 8 }, (_, i) => ({
    width: 80 + Math.random() * 60,
    height: 120 + Math.random() * 80,
    delay: i * 0.2
  }));

  return (
    <div className="absolute inset-x-0 bottom-20 flex h-48 items-end gap-4 px-10 opacity-35">
      {buildings.map((bld, idx) => (
        <motion.div
          key={idx}
          className="rounded-t-xl bg-gradient-to-b from-slate-100/30 via-slate-300/20 to-slate-800/10"
          style={{ width: bld.width, height: bld.height }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: bld.delay, duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid h-full grid-cols-3 gap-2 p-3">
            {Array.from({ length: 18 }).map((_, winIdx) => (
              <div
                key={winIdx}
                className="h-2 rounded bg-white/10"
                style={{ opacity: winIdx % 3 === 0 ? 0.4 : 0.15 }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RoadLayer() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 top-[15%] h-14 bg-white/3 backdrop-blur-[2px]" />
      <div className="absolute inset-x-0 top-[30%] h-14 bg-white/3 backdrop-blur-[2px]" />
      <div className="absolute inset-x-0 top-[45%] h-14 bg-white/3 backdrop-blur-[2px]" />
      <div className="absolute inset-x-0 top-[60%] h-14 bg-white/3 backdrop-blur-[2px]" />
      <div className="absolute inset-x-0 top-[75%] h-14 bg-white/3 backdrop-blur-[2px]" />

      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          style={{ top: `${18 + idx * 15}%` }}
        />
      ))}
    </div>
  );
}

function TrafficLights() {
  const lights = [
    { left: "8%", top: "28%", delay: 0 },
    { left: "82%", top: "58%", delay: 1.2 }
  ];

  return (
    <div className="absolute inset-0">
      {lights.map((light) => (
        <motion.div
          key={`${light.left}-${light.top}`}
          className="absolute flex w-3 flex-col items-center gap-1 rounded-full bg-slate-900/70 p-1 shadow-lg shadow-black/30"
          style={{ left: light.left, top: light.top, opacity: 0.6 }}
        >
          {(["red", "amber", "green"] as const).map((color, idx) => (
            <motion.div
              key={color}
              className="h-2.5 w-2.5 rounded-full"
              animate={{
                opacity: [0.2, color === "red" ? 1 : 0.2, 0.2],
                boxShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  `0 0 8px rgba(${color === "red" ? "255,80,90" : color === "amber" ? "255,190,60" : "90,255,150"},0.8)`,
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: light.delay + idx * 0.25, ease: "easeInOut" }}
              style={{
                background:
                  color === "red"
                    ? "radial-gradient(circle, #ff6b6b 0%, #7f1d1d 70%)"
                    : color === "amber"
                      ? "radial-gradient(circle, #ffd166 0%, #92400e 70%)"
                      : "radial-gradient(circle, #8ef5c8 0%, #064e3b 70%)"
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function AnimatedTrafficScene({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div
        className={`absolute inset-0 bg-gradient-to-b from-night-900 via-night-900/85 to-night-900 ${dimmed ? "opacity-45" : "opacity-60"}`}
      />

      <div className="relative h-full w-full">
        <div className="absolute inset-0 opacity-45">
          {VEHICLES.map((vehicle) => (
            <div key={vehicle.id} className={`absolute left-0 right-0 ${vehicle.lane}`}>
              <Vehicle config={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
