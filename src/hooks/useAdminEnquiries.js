"use client";

import { useCallback, useEffect, useState } from "react";

const useAdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------------------
  // Fetch enquiries from API
  // -----------------------------------------

  const fetchEnquiries = useCallback(
    async ({ refresh = false } = {}) => {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError("");

      try {
        const response = await fetch(
          "/api/admin/enquiries",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
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

        // -----------------------------------------
        // Authentication
        // -----------------------------------------

        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        // -----------------------------------------
        // API error
        // -----------------------------------------

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to fetch enquiries."
          );
        }

        // -----------------------------------------
        // Update enquiries
        // -----------------------------------------

        setEnquiries(data?.enquiries || []);

        return data;
      } catch (error) {
        console.error(
          "Fetch enquiries error:",
          error
        );

        setError(
          error?.message ||
            "Unable to fetch enquiries."
        );

        throw error;
      } finally {
        if (refresh) {
          setIsRefreshing(false);
        } else {
          setIsLoading(false);
        }
      }
    },
    []
  );

  // -----------------------------------------
  // Initial fetch
  // -----------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadInitialEnquiries = async () => {
      try {
        const response = await fetch(
          "/api/admin/enquiries",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
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

        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to fetch enquiries."
          );
        }

        if (cancelled) {
          return;
        }

        setEnquiries(data?.enquiries || []);
        setError("");
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Initial fetch enquiries error:",
          error
        );

        if (cancelled) {
          return;
        }

        setError(
          error?.message ||
            "Unable to fetch enquiries."
        );

        setIsLoading(false);
      }
    };

    loadInitialEnquiries();

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
      // Backend route:
      // /api/admin/enquiries/[id]

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

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "Unable to process the server response."
        );
      }

      // -----------------------------------------
      // Authentication
      // -----------------------------------------

      if (response.status === 401) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      // -----------------------------------------
      // API error
      // -----------------------------------------

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to update enquiry."
        );
      }

      // -----------------------------------------
      // Update local state
      // -----------------------------------------

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

  // -----------------------------------------
  // Return
  // -----------------------------------------

  return {
    enquiries,

    isLoading,
    isRefreshing,
    isUpdating,

    error,

    fetchEnquiries,
    updateEnquiryStatus,
    resetError,
  };
};

export default useAdminEnquiries;