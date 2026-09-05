import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

const ALLOWED_STATUSES = [
  "New",
  "Contacted",
  "Converted",
  "Closed",
];

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    // -----------------------------------------
    // Validate ID
    // -----------------------------------------

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry ID is required.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Parse body
    // -----------------------------------------

    const body = await request.json();

    const { status } = body;

    // -----------------------------------------
    // Validate status
    // -----------------------------------------

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid status. Allowed statuses are New, Contacted, Converted and Closed.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Find and update enquiry
    // -----------------------------------------

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    // -----------------------------------------
    // Enquiry not found
    // -----------------------------------------

    if (!enquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found.",
        },
        { status: 404 }
      );
    }

    // -----------------------------------------
    // Success
    // -----------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry status updated successfully.",
        enquiry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE ENQUIRY STATUS API ERROR:",
      error
    );

    // -----------------------------------------
    // Invalid MongoDB ObjectId
    // -----------------------------------------

    if (error?.name === "CastError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry ID.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Invalid JSON
    // -----------------------------------------

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Generic error
    // -----------------------------------------

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update enquiry status.",
      },
      { status: 500 }
    );
  }
}