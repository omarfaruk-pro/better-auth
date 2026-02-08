import clientPromise from "@/app/lib/mongoClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // db from URI
    const fish = await db.collection("fish").find({}).toArray();

    return NextResponse.json(fish);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch fish", error: error.message },
      { status: 500 }
    );
  }
}
