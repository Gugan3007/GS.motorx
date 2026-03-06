import { NextResponse } from "next/server";

// Mock bookings (replace with Supabase later)
const mockBookings = [
  { id: 1, vehicle: "Honda City", garage: "AutoCare", date: "2025-12-28", status: "confirmed" }
];

export async function GET() {
  return NextResponse.json({ bookings: mockBookings });
}

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Insert into Supabase
  return NextResponse.json({ success: true, booking: body });
}
