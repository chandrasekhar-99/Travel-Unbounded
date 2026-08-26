"use client";

import { useState } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

import useEnquiry from "@/hooks/useEnquiry";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    travelDate: "",
    people: 1,
    hotelCategory: "",
    children: 0,
  });

  const [errors, setErrors] = useState({});

  const {
    submitEnquiry,
    isSubmitting,
    isSuccess,
    error,
    resetStatus,
  } = useEnquiry();

  // ----------------------------------------
  // Get tomorrow's date
  // ----------------------------------------

  const getMinDate = () => {
    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow.toISOString().split("T")[0];
  };

  // ----------------------------------------
  // Form Validation
  // ----------------------------------------

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = "Contact number is required.";
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Travel Date
    if (!formData.travelDate) {
      newErrors.travelDate = "Date of travel is required.";
    } else {
      const selectedDate = new Date(formData.travelDate);

      const tomorrow = new Date();

      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (selectedDate < tomorrow) {
        newErrors.travelDate =
          "Travel date must be in the future.";
      }
    }

    // Number of People
    if (
      formData.people === "" ||
      Number(formData.people) < 1
    ) {
      newErrors.people =
        "Number of people must be at least 1.";
    }

    // Hotel Category
    if (!formData.hotelCategory) {
      newErrors.hotelCategory =
        "Please select a hotel category.";
    }

    // Children
    if (
      formData.children === "" ||
      Number(formData.children) < 0
    ) {
      newErrors.children =
        "Number of children cannot be negative.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------------------
  // Normal Input Change
  // ----------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    resetStatus();
  };

  // ----------------------------------------
  // Phone Change
  // ----------------------------------------

  const handlePhoneChange = (value) => {
    setFormData((previous) => ({
      ...previous,
      phone: value || "",
    }));

    setErrors((previous) => ({
      ...previous,
      phone: "",
    }));

    resetStatus();
  };

  // ----------------------------------------
  // Form Submit
  // ----------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      // Parse phone number
      const phoneNumber = parsePhoneNumber(
        formData.phone
      );

      // Data expected by backend
      const enquiryData = {
        fullName: formData.fullName.trim(),

        countryCode: phoneNumber
          ? `+${phoneNumber.countryCallingCode}`
          : "",

        contactNumber: formData.phone,

        email: formData.email.trim(),

        dateOfTravel: formData.travelDate,

        numberOfPeople: Number(formData.people),

        hotelCategory: formData.hotelCategory,

        numberOfChildren: Number(formData.children),
      };

      console.log("Sending enquiry:", enquiryData);

      await submitEnquiry(enquiryData);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        travelDate: "",
        people: 1,
        hotelCategory: "",
        children: 0,
      });

      setErrors({});
    } catch (error) {
      // Error is already handled by useEnquiry
      console.error("Submission failed:", error);
    }
  };

  return (
    <main>
      {/* =====================================
          HERO
      ====================================== */}

      <section className="bg-primary px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Plan Your Journey
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Tell Us About Your Dream Trip
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
            Share a few details about your travel plans and our
            travel experts will help you create an unforgettable
            experience.
          </p>
        </div>
      </section>

      {/* =====================================
          CONTACT FORM
      ====================================== */}

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">

          {/* Heading */}

          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Enquiry Form
            </p>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Start Planning Your Trip
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Fill in the form below and our team will get back
              to you with a personalized travel plan.
            </p>
          </div>

          {/* =====================================
              SUCCESS MESSAGE
          ====================================== */}

          {isSuccess && (
            <div
              className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5 text-green-800"
              role="status"
            >
              <h3 className="font-semibold">
                Enquiry submitted successfully!
              </h3>

              <p className="mt-1 text-sm">
                Thank you! Our travel expert will contact you
                within 24 hours.
              </p>
            </div>
          )}

          {/* =====================================
              ERROR MESSAGE
          ====================================== */}

          {error && (
            <div
              className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800"
              role="alert"
            >
              <h3 className="font-semibold">
                Unable to submit your enquiry
              </h3>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          )}

          {/* =====================================
              FORM
          ====================================== */}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">

              {/* =================================
                  FULL NAME
              ================================== */}

              <div className="md:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-primary ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* =================================
                  PHONE
              ================================== */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Contact Number
                </label>

                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                  className={`phone-input ${
                    errors.phone
                      ? "phone-input-error"
                      : ""
                  }`}
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* =================================
                  EMAIL
              ================================== */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-primary ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* =================================
                  TRAVEL DATE
              ================================== */}

              <div>
                <label
                  htmlFor="travelDate"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Date of Travel
                </label>

                <input
                  id="travelDate"
                  name="travelDate"
                  type="date"
                  min={getMinDate()}
                  value={formData.travelDate}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-primary ${
                    errors.travelDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.travelDate && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.travelDate}
                  </p>
                )}
              </div>

              {/* =================================
                  NUMBER OF PEOPLE
              ================================== */}

              <div>
                <label
                  htmlFor="people"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Number of People
                </label>

                <input
                  id="people"
                  name="people"
                  type="number"
                  min="1"
                  value={formData.people}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-primary ${
                    errors.people
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.people && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.people}
                  </p>
                )}
              </div>

              {/* =================================
                  HOTEL CATEGORY
              ================================== */}

              <div>
                <label
                  htmlFor="hotelCategory"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Hotel Category
                </label>

                <select
                  id="hotelCategory"
                  name="hotelCategory"
                  value={formData.hotelCategory}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 outline-none transition focus:border-primary ${
                    errors.hotelCategory
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Standard">
                    Standard
                  </option>

                  <option value="Deluxe">
                    Deluxe
                  </option>

                  <option value="Luxury">
                    Luxury
                  </option>
                </select>

                {errors.hotelCategory && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.hotelCategory}
                  </p>
                )}
              </div>

              {/* =================================
                  CHILDREN
              ================================== */}

              <div>
                <label
                  htmlFor="children"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Number of Children{" "}
                  <span className="font-normal text-gray-500">
                    (Optional)
                  </span>
                </label>

                <input
                  id="children"
                  name="children"
                  type="number"
                  min="0"
                  value={formData.children}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-primary ${
                    errors.children
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.children && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.children}
                  </p>
                )}
              </div>
            </div>

            {/* =====================================
                SUBMIT BUTTON
            ====================================== */}

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-7 py-3.5 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Enquiry"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;