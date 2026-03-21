import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, message } = await req.json();

  console.log("CONTACT FORM:");
  console.log("Subject:", subject);
  console.log("Message:", message);

  return NextResponse.json({ success: true });
}