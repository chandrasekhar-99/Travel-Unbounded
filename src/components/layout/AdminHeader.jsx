"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    name: "Enquiries",
    href: "/admin/dashboard/enquiries",
  },
  {
    name: "Destinations",
    href: "/admin/dashboard/destinations",
  },
  {
    name: "Analytics",
    href: "/admin/dashboard/analytics",
  },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call your logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.replace("/admin/login");
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/admin/dashboard"
          className="text-lg font-bold tracking-tight text-primary sm:text-xl"
        >
          Travel Unbounded
          <span className="ml-2 text-sm font-medium text-gray-500">
            Admin
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {link.name}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-primary transition-all ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-gray-100 md:hidden">
        <nav className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}