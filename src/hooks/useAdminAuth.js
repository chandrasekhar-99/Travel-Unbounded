"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateLoginData = (loginData) => {
  if (
    !loginData ||
    typeof loginData !== "object" ||
    Array.isArray(loginData)
  ) {
    return "Invalid login data.";
  }

  const { email, password } = loginData;

  if (typeof email !== "string" || !email.trim()) {
    return "Email address is required.";
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.length > 254) {
    return "Email address is too long.";
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return "Please enter a valid email address.";
  }

  if (typeof password !== "string" || !password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (password.length > 128) {
    return "Password must not exceed 128 characters.";
  }

  return null;
};

const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------------
  // Login
  // -----------------------------------------

  const loginAdmin = async (loginData) => {
    setIsLoading(true);
    setError("");

    try {
      const validationError =
        validateLoginData(loginData);

      if (validationError) {
        setError(validationError);
        throw new Error(validationError);
      }

      const payload = {
        email: loginData.email.trim().toLowerCase(),
        password: loginData.password,
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Unable to process the server response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Invalid email or password."
        );
      }

      return data;
    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        error?.message ||
          "Something went wrong. Please try again."
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------
  // Logout
  // -----------------------------------------

  const logoutAdmin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Unable to process the server response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to logout."
        );
      }

      return data;
    } catch (error) {
      console.error(
        "Admin logout error:",
        error
      );

      setError(
        error?.message ||
          "Something went wrong while logging out."
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------
  // Reset error
  // -----------------------------------------

  const resetError = () => {
    setError("");
  };

  return {
    loginAdmin,
    logoutAdmin,
    isLoading,
    error,
    resetError,
  };
};

export default useAdminAuth;