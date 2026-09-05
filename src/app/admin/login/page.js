"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";

import useAdminAuth from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const router = useRouter();

  const {
    loginAdmin,
    isLoading,
    error,
    resetError,
  } = useAdminAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      resetError();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginAdmin(formData);

      router.replace("/admin/dashboard/enquiries");
      router.refresh();
    } catch {
      // Error is handled by useAdminAuth
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="mb-8 text-center text-white">
          <h1 className="text-3xl font-bold">
            Travel Unbounded
          </h1>

          <p className="mt-2 text-sm text-white/80">
            Admin Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to access the admin dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <FiLock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <FiLogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/60">
          Travel Unbounded Admin Portal
        </p>
      </div>
    </main>
  );
};

export default AdminLogin;