"use client";

import { useState } from "react";

const useEnquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitEnquiry = async (enquiryData) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to submit your enquiry."
        );
      }

      setIsSuccess(true);

      return data;
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setError(
        error?.message ||
          "Something went wrong. Please try again later."
      );

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setIsSuccess(false);
    setError("");
  };

  return {
    submitEnquiry,
    isSubmitting,
    isSuccess,
    error,
    resetStatus,
  };
};

export default useEnquiry;