import { NextResponse } from "next/server";

// Mock vehicle data (replace with Supabase later)
const mockVehicles = [
  { id: 1, name: "Honda City", type: "car", km: 45000, health: 82 },
  { id: 2, name: "Royal Enfield Classic 350", type: "bike", km: 12000, health: 95 }
];

export async function GET() {
  return NextResponse.json({ vehicles: mockVehicles });
}

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Insert into Supabase
  return NextResponse.json({ success: true, vehicle: body });
}
