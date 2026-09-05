import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import Admin from "@/models/Admin";
import { connectDB } from "@/lib/mongodb";
import { createAdminToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findOne({
      email,
      isActive: true,
    });

    if (!admin) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const passwordValid = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const token = createAdminToken(admin);

    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return Response.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}