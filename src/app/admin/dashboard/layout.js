import { redirect } from "next/navigation";

import AdminHeader from "@/components/layout/AdminHeader";
import { requireAdmin } from "@/lib/auth";

export default async function DashboardLayout({ children }) {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}