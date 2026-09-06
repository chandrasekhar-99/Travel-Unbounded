import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import Enquiry from "@/models/Enquiry";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;
const CONTACT_NUMBER_REGEX = /^\+[1-9]\d{6,14}$/;

const ALLOWED_HOTEL_CATEGORIES = [
  "Standard",
  "Deluxe",
  "Luxury",
];

// --------------------------------------------------
// POST /api/admin/enquiries
// Public - Website enquiry submission
// --------------------------------------------------

export async function POST(request) {
  try {
    // -----------------------------------------------
    // Parse request body
    // -----------------------------------------------

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

    // -----------------------------------------------
    // Validate body
    // -----------------------------------------------

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

    // -----------------------------------------------
    // Required fields
    // -----------------------------------------------

    if (
      typeof fullName !== "string" ||
      typeof countryCode !== "string" ||
      typeof contactNumber !== "string" ||
      typeof email !== "string" ||
      typeof dateOfTravel !== "string" ||
      numberOfPeople === undefined ||
      numberOfPeople === null ||
      typeof hotelCategory !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Normalize string values
    // -----------------------------------------------

    const normalizedFullName = fullName.trim();
    const normalizedCountryCode = countryCode.trim();
    const normalizedContactNumber = contactNumber.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedHotelCategory = hotelCategory.trim();

    // -----------------------------------------------
    // Full name validation
    // -----------------------------------------------

    if (
      normalizedFullName.length < 2 ||
      normalizedFullName.length > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full name must be between 2 and 100 characters.",
        },
        { status: 400 }
      );
    }

    // Prevent names containing only whitespace/symbol-like input
    if (!/[A-Za-zÀ-ÿ]/.test(normalizedFullName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid full name.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Email validation
    // -----------------------------------------------

    if (
      normalizedEmail.length > 254 ||
      !EMAIL_REGEX.test(normalizedEmail)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Country code validation
    // Example: +91, +1, +44
    // -----------------------------------------------

    if (!COUNTRY_CODE_REGEX.test(normalizedCountryCode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid country code.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Contact number validation
    // Example: +919876543210
    // -----------------------------------------------

    if (
      !CONTACT_NUMBER_REGEX.test(
        normalizedContactNumber
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid contact number.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Travel date validation
    // -----------------------------------------------

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

    // Compare dates without time
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

    // -----------------------------------------------
    // Number of people validation
    // -----------------------------------------------

    const people = Number(numberOfPeople);

    if (
      !Number.isInteger(people) ||
      people < 1 ||
      people > 1000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of people must be between 1 and 1000.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Hotel category validation
    // -----------------------------------------------

    if (
      !ALLOWED_HOTEL_CATEGORIES.includes(
        normalizedHotelCategory
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid hotel category.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Number of children validation
    // -----------------------------------------------

    let children = 0;

    if (
      numberOfChildren !== undefined &&
      numberOfChildren !== null &&
      numberOfChildren !== ""
    ) {
      children = Number(numberOfChildren);
    }

    if (
      !Number.isInteger(children) ||
      children < 0 ||
      children > 1000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of children must be between 0 and 1000.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Optional logical validation
    // -----------------------------------------------

    if (children > people) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of children cannot exceed number of people.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // Connect database
    // -----------------------------------------------

    await connectDB();

    // -----------------------------------------------
    // Create enquiry
    // -----------------------------------------------

    const enquiry = await Enquiry.create({
      fullName: normalizedFullName,
      countryCode: normalizedCountryCode,
      contactNumber: normalizedContactNumber,
      email: normalizedEmail,
      dateOfTravel: travelDate,
      numberOfPeople: people,
      hotelCategory: normalizedHotelCategory,
      numberOfChildren: children,
    });

    // -----------------------------------------------
    // Success response
    // -----------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Our travel expert will contact you within 24 hours.",
        enquiry: {
          id: enquiry._id.toString(),
          fullName: enquiry.fullName,
          email: enquiry.email,
          dateOfTravel: enquiry.dateOfTravel,
          numberOfPeople: enquiry.numberOfPeople,
          hotelCategory: enquiry.hotelCategory,
          numberOfChildren: enquiry.numberOfChildren,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ENQUIRY POST API ERROR:", error);

    // -----------------------------------------------
    // Mongoose validation error
    // -----------------------------------------------

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

    // -----------------------------------------------
    // Unexpected error
    // -----------------------------------------------

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

// --------------------------------------------------
// GET /api/admin/enquiries
// Admin only
// --------------------------------------------------

export async function GET() {
  try {
    // -----------------------------------------------
    // Authentication
    // -----------------------------------------------

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

    // -----------------------------------------------
    // Database
    // -----------------------------------------------

    await connectDB();

    // -----------------------------------------------
    // Fetch enquiries
    // -----------------------------------------------

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