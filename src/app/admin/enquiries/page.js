"use client";

import { useEffect, useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiPhone,
  FiMail,
  FiRefreshCw,
  FiMapPin,
} from "react-icons/fi";

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/enquiries");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch enquiries."
        );
      }

      setEnquiries(data.enquiries || []);
    } catch (error) {
      console.error("Fetch enquiries error:", error);

      setError(
        error.message || "Unable to fetch enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-slate-200" />

            <div className="mt-3 h-9 w-64 rounded bg-slate-200" />

            <div className="mt-2 h-5 w-80 rounded bg-slate-200" />

            <div className="mt-8 h-32 rounded-2xl bg-white shadow-sm" />

            <div className="mt-6 h-80 rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <FiRefreshCw size={22} />
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Unable to load enquiries
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                {error}
              </p>

              <button
                onClick={fetchEnquiries}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                <FiRefreshCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FiMapPin
                className="text-primary"
                size={16}
              />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Admin
              </p>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Travel Enquiries
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Manage and review travel enquiries submitted by
              your customers.
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* =====================================
            SUMMARY CARD
        ====================================== */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total enquiries */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Enquiries
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {enquiries.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiUsers size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              All submitted enquiries
            </p>
          </div>

          {/* People */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Travellers
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {enquiries.reduce(
                    (total, enquiry) =>
                      total +
                      Number(enquiry.numberOfPeople || 0),
                    0
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiUsers size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Across all enquiries
            </p>
          </div>

          {/* Children */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Children
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {enquiries.reduce(
                    (total, enquiry) =>
                      total +
                      Number(enquiry.numberOfChildren || 0),
                    0
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FiUsers size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Total children travelling
            </p>
          </div>

          {/* Upcoming trips */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Upcoming Trips
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {
                    enquiries.filter(
                      (enquiry) =>
                        new Date(enquiry.dateOfTravel) >
                        new Date()
                    ).length
                  }
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FiCalendar size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Future travel dates
            </p>
          </div>
        </div>

        {/* =====================================
            ENQUIRIES TABLE
        ====================================== */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {/* Table Header */}

          <div className="flex flex-col gap-2 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Customer Enquiries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recent travel requests submitted by customers.
              </p>
            </div>

            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {enquiries.length}{" "}
              {enquiries.length === 1
                ? "Enquiry"
                : "Enquiries"}
            </span>
          </div>

          {/* Empty State */}

          {enquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <FiUsers size={26} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                No enquiries yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Customer enquiries submitted through the
                booking form will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-slate-50">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Travel Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Travellers
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Hotel
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      {/* Customer */}

                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {enquiry.fullName}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <FiMail size={13} />

                            <span>
                              {enquiry.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <FiPhone
                            size={14}
                            className="text-primary"
                          />

                          {enquiry.contactNumber}
                        </div>
                      </td>

                      {/* Travel Date */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FiCalendar size={16} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {new Date(
                                enquiry.dateOfTravel
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>

                            <p className="text-xs text-slate-400">
                              Travel date
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Travellers */}

                      <td className="px-6 py-5">
                        <div>
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {enquiry.numberOfPeople}{" "}
                            {enquiry.numberOfPeople === 1
                              ? "Person"
                              : "People"}
                          </span>

                          {Number(
                            enquiry.numberOfChildren || 0
                          ) > 0 && (
                            <p className="mt-2 text-xs text-slate-500">
                              {
                                enquiry.numberOfChildren
                              }{" "}
                              children
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Hotel */}

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            enquiry.hotelCategory ===
                            "Luxury"
                              ? "bg-purple-50 text-purple-700"
                              : enquiry.hotelCategory ===
                                "Deluxe"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {enquiry.hotelCategory}
                        </span>
                      </td>

                      {/* Submitted */}

                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-600">
                          {new Date(
                            enquiry.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(
                            enquiry.createdAt
                          ).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EnquiriesPage;