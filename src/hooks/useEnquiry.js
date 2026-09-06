"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;

const CONTACT_NUMBER_REGEX = /^\+[1-9]\d{6,14}$/;

const ALLOWED_HOTEL_CATEGORIES = [
  "Standard",
  "Deluxe",
  "Luxury",
];

const validateEnquiry = (data) => {
  if (!data || typeof data !== "object") {
    return "Invalid enquiry data.";
  }

  const {
    fullName,
    countryCode,
    contactNumber,
    email,
    dateOfTravel,
    numberOfPeople,
    hotelCategory,
    numberOfChildren,
  } = data;

  // Full name
  if (typeof fullName !== "string" || !fullName.trim()) {
    return "Full name is required.";
  }

  const normalizedFullName = fullName.trim();

  if (
    normalizedFullName.length < 2 ||
    normalizedFullName.length > 100
  ) {
    return "Full name must be between 2 and 100 characters.";
  }

  // Email
  if (typeof email !== "string" || !email.trim()) {
    return "Email address is required.";
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail.length > 254 ||
    !EMAIL_REGEX.test(normalizedEmail)
  ) {
    return "Please provide a valid email address.";
  }

  // Country code
  if (
    typeof countryCode !== "string" ||
    !countryCode.trim()
  ) {
    return "Country code is required.";
  }

  const normalizedCountryCode = countryCode.trim();

  if (!COUNTRY_CODE_REGEX.test(normalizedCountryCode)) {
    return "Please provide a valid country code.";
  }

  // Contact number
  if (
    typeof contactNumber !== "string" ||
    !contactNumber.trim()
  ) {
    return "Contact number is required.";
  }

  const normalizedContactNumber =
    contactNumber.trim();

  if (
    !CONTACT_NUMBER_REGEX.test(normalizedContactNumber)
  ) {
    return "Please provide a valid contact number.";
  }

  // Travel date
  if (
    typeof dateOfTravel !== "string" ||
    !dateOfTravel.trim()
  ) {
    return "Travel date is required.";
  }

  const travelDate = new Date(dateOfTravel);

  if (Number.isNaN(travelDate.getTime())) {
    return "Please provide a valid travel date.";
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  travelDate.setHours(0, 0, 0, 0);

  if (travelDate <= today) {
    return "Travel date must be in the future.";
  }

  // Number of people
  if (
    numberOfPeople === undefined ||
    numberOfPeople === null ||
    numberOfPeople === ""
  ) {
    return "Number of people is required.";
  }

  const people = Number(numberOfPeople);

  if (
    !Number.isInteger(people) ||
    people < 1 ||
    people > 1000
  ) {
    return "Number of people must be between 1 and 1000.";
  }

  // Hotel category
  if (
    typeof hotelCategory !== "string" ||
    !hotelCategory.trim()
  ) {
    return "Hotel category is required.";
  }

  const normalizedHotelCategory =
    hotelCategory.trim();

  if (
    !ALLOWED_HOTEL_CATEGORIES.includes(
      normalizedHotelCategory
    )
  ) {
    return "Please select a valid hotel category.";
  }

  // Children
  let children = 0;

  if (
    numberOfChildren !== undefined &&
    numberOfChildren !== null &&
    numberOfChildren !== ""
  ) {
    children = Number(numberOfChildren);
  }

  if (
    !Number.isInteger(children) ||
    children < 0 ||
    children > 1000
  ) {
    return "Number of children must be between 0 and 1000.";
  }

  if (children > people) {
    return "Number of children cannot exceed number of people.";
  }

  return null;
};

const useEnquiry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitEnquiry = async (enquiryData) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError("");

    try {
      // -----------------------------------------
      // Frontend validation
      // -----------------------------------------

      const validationError =
        validateEnquiry(enquiryData);

      if (validationError) {
        setError(validationError);
        throw new Error(validationError);
      }

      // -----------------------------------------
      // Normalize data before sending
      // -----------------------------------------

      const payload = {
        ...enquiryData,
        fullName: enquiryData.fullName.trim(),
        countryCode: enquiryData.countryCode.trim(),
        contactNumber:
          enquiryData.contactNumber.trim(),
        email: enquiryData.email.trim().toLowerCase(),
        hotelCategory:
          enquiryData.hotelCategory.trim(),
        numberOfPeople: Number(
          enquiryData.numberOfPeople
        ),
        numberOfChildren:
          enquiryData.numberOfChildren === "" ||
          enquiryData.numberOfChildren === undefined ||
          enquiryData.numberOfChildren === null
            ? 0
            : Number(enquiryData.numberOfChildren),
      };

      // -----------------------------------------
      // API request
      // -----------------------------------------

      const response = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
            "Unable to submit your enquiry."
        );
      }

      setIsSuccess(true);

      return data;
    } catch (error) {
      console.error(
        "Enquiry submission error:",
        error
      );

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