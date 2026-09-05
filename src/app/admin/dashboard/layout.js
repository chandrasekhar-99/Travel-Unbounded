import AdminHeader from "@/components/layout/AdminHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main>{children}</main>
    </div>
  );
}