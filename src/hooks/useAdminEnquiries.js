"use client";

import { useCallback, useEffect, useState } from "react";

const useAdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------------
  // Fetch enquiries
  // -----------------------------------------

  const fetchEnquiries = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to fetch enquiries."
        );
      }

      setEnquiries(data?.enquiries || []);

      return data;
    } catch (error) {
      console.error("Fetch enquiries error:", error);

      setError(
        error?.message || "Unable to fetch enquiries."
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // -----------------------------------------
  // Initial fetch
  // -----------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadEnquiries = async () => {
      try {
        const response = await fetch(
          "/api/admin/enquiries",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to fetch enquiries."
          );
        }

        if (!cancelled) {
          setEnquiries(data?.enquiries || []);
          setError("");
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Initial fetch enquiries error:",
          error
        );

        if (!cancelled) {
          setError(
            error?.message ||
              "Unable to fetch enquiries."
          );
          setIsLoading(false);
        }
      }
    };

    loadEnquiries();

    return () => {
      cancelled = true;
    };
  }, []);

  // -----------------------------------------
  // Update enquiry status
  // -----------------------------------------

  const updateEnquiryStatus = useCallback(
    async (id, status) => {
      setIsUpdating(true);
      setError("");

      try {
        const response = await fetch(
          `/api/admin/enquiries/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              status,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to update enquiry."
          );
        }

        setEnquiries((previous) =>
          previous.map((enquiry) =>
            enquiry._id === id
              ? {
                  ...enquiry,
                  status:
                    data?.enquiry?.status ||
                    status,
                  updatedAt:
                    data?.enquiry?.updatedAt ||
                    enquiry.updatedAt,
                }
              : enquiry
          )
        );

        return data;
      } catch (error) {
        console.error(
          "Update enquiry error:",
          error
        );

        setError(
          error?.message ||
            "Unable to update enquiry."
        );

        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  // -----------------------------------------
  // Reset error
  // -----------------------------------------

  const resetError = useCallback(() => {
    setError("");
  }, []);

  return {
    enquiries,
    isLoading,
    isUpdating,
    error,
    fetchEnquiries,
    updateEnquiryStatus,
    resetError,
  };
};

export default useAdminEnquiries;