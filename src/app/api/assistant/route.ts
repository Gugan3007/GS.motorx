import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  // TODO: Integrate Gemini API
  // const response = await fetch("https://generativelanguage.googleapis.com/...", {
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
  // });

  const mockReply =
    "Based on your vehicle's mileage, I recommend an oil change, brake inspection, and tire rotation. Estimated cost: ₹3,500.";

  return NextResponse.json({ reply: mockReply });
}
