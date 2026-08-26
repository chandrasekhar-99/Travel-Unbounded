import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function POST(request) {
  try {
    await connectDB();

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

    if (
      !fullName ||
      !countryCode ||
      !contactNumber ||
      !email ||
      !dateOfTravel ||
      !numberOfPeople ||
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

    const enquiry = await Enquiry.create({
      fullName,
      countryCode,
      contactNumber,
      email,
      dateOfTravel,
      numberOfPeople,
      hotelCategory,
      numberOfChildren: numberOfChildren || 0,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Our travel expert will contact you within 24 hours.",
        enquiry: enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ENQUIRY API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}