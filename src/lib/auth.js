import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.AUTH_SECRET;

if (!JWT_SECRET) {
  throw new Error("AUTH_SECRET is not defined");
}

export function createAdminToken(admin) {
  return jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

export function verifyAdminToken(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_token")?.value;

  const admin = verifyAdminToken(token);

  if (!admin || admin.role !== "admin") {
    return null;
  }

  return admin;
}