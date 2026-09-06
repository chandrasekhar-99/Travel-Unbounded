"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiLock,
  FiMail,
  FiLogIn,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import useAdminAuth from "@/hooks/useAdminAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (error) {
      resetError();
    }
  };

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    const email = formData.email.trim();
    const password = formData.password;

    // -----------------------------------------
    // Email validation
    // -----------------------------------------

    if (!email) {
      errors.email = "Email address is required.";
    } else if (email.length > 254) {
      errors.email = "Email address is too long.";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email =
        "Please enter a valid email address.";
    }

    // -----------------------------------------
    // Password validation
    // -----------------------------------------

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password =
        "Password must be at least 8 characters.";
    } else if (password.length > 128) {
      errors.password =
        "Password must not exceed 128 characters.";
    }

    setFieldErrors(errors);

    return !errors.email && !errors.password;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      await loginAdmin({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

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
            noValidate
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
                  maxLength={254}
                  aria-invalid={Boolean(
                    fieldErrors.email
                  )}
                  aria-describedby={
                    fieldErrors.email
                      ? "email-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    fieldErrors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>

              {fieldErrors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs text-red-600"
                >
                  {fieldErrors.email}
                </p>
              )}
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

                {/* Lock Icon */}
                <FiLock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                {/* Password Input */}
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  maxLength={128}
                  aria-invalid={Boolean(
                    fieldErrors.password
                  )}
                  aria-describedby={
                    fieldErrors.password
                      ? "password-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border py-3 pl-10 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                    fieldErrors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-primary focus:ring-primary/20"
                  }`}
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              {fieldErrors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs text-red-600"
                >
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* API Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
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