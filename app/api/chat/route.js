import { NextResponse } from "next/server";
import { generateAnswer } from "@/lib/rag";

export async function POST(request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    const { answer, sources } = await generateAnswer(query);
    return NextResponse.json({ answer, sources });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to generate answer" }, { status: 500 });
  }
}
