import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import Enquiry from "@/models/Enquiry";

const ALLOWED_STATUSES = [
  "New",
  "Contacted",
  "Converted",
  "Closed",
];

export async function PATCH(request, { params }) {
  try {
    // -----------------------------------------
    // Authentication
    // -----------------------------------------

    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------
    // Get route parameter
    // -----------------------------------------

    const { id } = await params;

    // -----------------------------------------
    // Validate enquiry ID
    // -----------------------------------------

    if (
      typeof id !== "string" ||
      !id.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry ID is required.",
        },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry ID.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Parse request body
    // -----------------------------------------

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Validate body
    // -----------------------------------------

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Validate status
    // -----------------------------------------

    const { status } = body;

    if (typeof status !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required.",
        },
        { status: 400 }
      );
    }

    const normalizedStatus = status.trim();

    if (!normalizedStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
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
    // Connect database
    // -----------------------------------------

    await connectDB();

    // -----------------------------------------
    // Find and update enquiry
    // -----------------------------------------

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        $set: {
          status: normalizedStatus,
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
        message:
          "Enquiry status updated successfully.",
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
    // Mongoose validation error
    // -----------------------------------------

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry data.",
          errors: Object.values(error.errors).map(
            (err) => err.message
          ),
        },
        { status: 400 }
      );
    }

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
    // Generic error
    // -----------------------------------------

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update enquiry status.",
      },
      { status: 500 }
    );
  }
}