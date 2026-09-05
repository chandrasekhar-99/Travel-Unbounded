"use client";

import { useState } from "react";

const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loginAdmin = async (loginData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Invalid email or password."
        );
      }

      return data;
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error?.message ||
          "Something went wrong. Please try again."
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutAdmin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to logout."
        );
      }

      return data;
    } catch (error) {
      console.error("Admin logout error:", error);

      setError(
        error?.message ||
          "Something went wrong while logging out."
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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