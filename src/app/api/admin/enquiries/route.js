import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await request.json();

    const {
      fullName,
      countryCode,
      contactNumber,
      email,
      dateOfTravel,
      numberOfPeople,
      hotelCategory,
      numberOfChildren,
    } = body;

    // -----------------------------------------
    // Required field validation
    // -----------------------------------------

    if (
      !fullName ||
      !countryCode ||
      !contactNumber ||
      !email ||
      !dateOfTravel ||
      numberOfPeople === undefined ||
      !hotelCategory
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Full name validation
    // -----------------------------------------

    if (
      typeof fullName !== "string" ||
      fullName.trim().length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name must contain at least 2 characters.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Email validation
    // -----------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      typeof email !== "string" ||
      !emailRegex.test(email.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Phone validation
    // -----------------------------------------

    if (
      typeof contactNumber !== "string" ||
      !contactNumber.startsWith("+")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid contact number.",
        },
        { status: 400 }
      );
    }

    if (
      typeof countryCode !== "string" ||
      !/^\+\d{1,4}$/.test(countryCode)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid country code.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Travel date validation
    // -----------------------------------------

    const travelDate = new Date(dateOfTravel);

    if (Number.isNaN(travelDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid travel date.",
        },
        { status: 400 }
      );
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    travelDate.setHours(0, 0, 0, 0);

    if (travelDate <= today) {
      return NextResponse.json(
        {
          success: false,
          message: "Travel date must be in the future.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Number of people validation
    // -----------------------------------------

    const people = Number(numberOfPeople);

    if (!Number.isInteger(people) || people < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Number of people must be at least 1.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Hotel category validation
    // -----------------------------------------

    const allowedHotelCategories = [
      "Standard",
      "Deluxe",
      "Luxury",
    ];

    if (!allowedHotelCategories.includes(hotelCategory)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid hotel category.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Children validation
    // -----------------------------------------

    const children =
      numberOfChildren === undefined ||
      numberOfChildren === ""
        ? 0
        : Number(numberOfChildren);

    if (!Number.isInteger(children) || children < 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of children must be a valid number greater than or equal to 0.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Create enquiry
    // -----------------------------------------

    const enquiry = await Enquiry.create({
      fullName: fullName.trim(),
      countryCode,
      contactNumber,
      email: email.trim().toLowerCase(),
      dateOfTravel: travelDate,
      numberOfPeople: people,
      hotelCategory,
      numberOfChildren: children,
    });

    // -----------------------------------------
    // Success response
    // -----------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Our travel expert will contact you within 24 hours.",
        enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ENQUIRY API ERROR:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
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

    // Handle invalid JSON
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    // Unexpected server/database error
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: enquiries.length,
        enquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ENQUIRIES API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch enquiries.",
      },
      { status: 500 }
    );
  }
}