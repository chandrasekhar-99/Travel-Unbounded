import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Itinerary from "@/models/Itinerary";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { itinerary } = body;

    if (!Array.isArray(itinerary) || itinerary.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid itinerary is required.",
        },
        { status: 400 }
      );
    }

    const savedItinerary = await Itinerary.create({
      itinerary,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Itinerary saved successfully.",
        itinerary: savedItinerary,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save itinerary error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save itinerary.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const itineraries = await Itinerary.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      itineraries,
    });
  } catch (error) {
    console.error("Get itineraries error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch itineraries.",
      },
      { status: 500 }
    );
  }
}
