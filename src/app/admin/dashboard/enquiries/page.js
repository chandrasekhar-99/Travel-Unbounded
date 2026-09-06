"use client";

import { useMemo, useState } from "react";

import {
  FiUsers,
  FiCalendar,
  FiPhone,
  FiMail,
  FiRefreshCw,
  FiMapPin,
  FiSearch,
  FiFilter,
} from "react-icons/fi";

import useAdminEnquiries from "@/hooks/useAdminEnquiries";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Converted",
  "Closed",
];

const isValidStatus = (status) => {
  return STATUS_OPTIONS.includes(status);
};

const isValidEnquiryId = (id) => {
  return (
    typeof id === "string" &&
    /^[a-f\d]{24}$/i.test(id)
  );
};

const EnquiriesPage = () => {
  const {
    enquiries,
    isLoading,
    isUpdating,
    error,
    fetchEnquiries,
    updateEnquiryStatus,
  } = useAdminEnquiries();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  // -----------------------------------------
  // Filter enquiries
  // -----------------------------------------

  const filteredEnquiries = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesSearch =
        !search ||
        enquiry.fullName?.toLowerCase().includes(search) ||
        enquiry.email?.toLowerCase().includes(search);

      const enquiryStatus = enquiry.status || "New";

      const matchesStatus =
        statusFilter === "All" ||
        enquiryStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  // -----------------------------------------
  // Status counts
  // -----------------------------------------

  const statusCounts = useMemo(() => {
    return {
      New: enquiries.filter(
        (enquiry) => (enquiry.status || "New") === "New"
      ).length,

      Contacted: enquiries.filter(
        (enquiry) => enquiry.status === "Contacted"
      ).length,

      Converted: enquiries.filter(
        (enquiry) => enquiry.status === "Converted"
      ).length,

      Closed: enquiries.filter(
        (enquiry) => enquiry.status === "Closed"
      ).length,
    };
  }, [enquiries]);

  // -----------------------------------------
  // Update status
  // -----------------------------------------

  const handleStatusChange = async (id, status) => {
  if (!isValidEnquiryId(id)) {
    console.error("Invalid enquiry ID.");
    return;
  }

  if (!isValidStatus(status)) {
    console.error("Invalid enquiry status.");
    return;
  }

  try {
    setUpdatingId(id);

    await updateEnquiryStatus(id, status);
  } catch (error) {
    console.error("Status update failed:", error);
  } finally {
    setUpdatingId(null);
  }
};

  // -----------------------------------------
  // Status styles
  // -----------------------------------------

  const getStatusClasses = (status) => {
    switch (status) {
      case "Contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Converted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Closed":
        return "bg-slate-100 text-slate-700 border-slate-200";

      case "New":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-slate-200" />

            <div className="mt-3 h-9 w-64 rounded bg-slate-200" />

            <div className="mt-2 h-5 w-80 rounded bg-slate-200" />

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-2xl bg-white shadow-sm"
                />
              ))}
            </div>

            <div className="mt-6 h-96 rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (error && enquiries.length === 0) {
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
                type="button"
                onClick={() => fetchEnquiries().catch(() => {})}
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

  // -----------------------------------------
  // Page
  // -----------------------------------------

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}

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
            type="button"
            onClick={() => fetchEnquiries().catch(() => {})}
            disabled={isUpdating}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw
              size={16}
              className={isUpdating ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* SUMMARY CARDS */}

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

          {/* New */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  New
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {statusCounts.New}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <FiUsers size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Awaiting contact
            </p>
          </div>

          {/* Contacted */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Contacted
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {statusCounts.Contacted}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiPhone size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Customers contacted
            </p>
          </div>

          {/* Converted */}

          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Converted
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {statusCounts.Converted}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FiUsers size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Successful enquiries
            </p>
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="mt-8 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">
              <FiSearch
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Status filter */}

            <div className="flex w-full items-center gap-3 lg:w-auto">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <FiFilter size={17} />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-48"
              >
                <option value="All">
                  All Statuses
                </option>

                {STATUS_OPTIONS.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter information */}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>
              Showing{" "}
              <strong className="text-slate-700">
                {filteredEnquiries.length}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-700">
                {enquiries.length}
              </strong>{" "}
              enquiries
            </span>

            {(searchTerm || statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary hover:bg-primary/15"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ERROR AFTER STATUS UPDATE */}

        {error && enquiries.length > 0 && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ENQUIRIES TABLE */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">

          {/* Header */}

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
              {filteredEnquiries.length}{" "}
              {filteredEnquiries.length === 1
                ? "Enquiry"
                : "Enquiries"}
            </span>
          </div>

          {/* Empty State */}

          {filteredEnquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                {searchTerm || statusFilter !== "All" ? (
                  <FiSearch size={26} />
                ) : (
                  <FiUsers size={26} />
                )}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {searchTerm || statusFilter !== "All"
                  ? "No matching enquiries"
                  : "No enquiries yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {searchTerm || statusFilter !== "All"
                  ? "Try changing your search text or status filter."
                  : "Customer enquiries submitted through the booking form will appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-left">

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
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Submitted
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredEnquiries.map((enquiry) => {
                    const status = enquiry.status || "New";

                    const isThisUpdating =
                      updatingId === enquiry._id;

                    return (
                      <tr
                        key={enquiry._id}
                        className="transition hover:bg-slate-50/70"
                      >

                        {/* Customer */}

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {enquiry.fullName || "—"}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <FiMail size={13} />

                              <span>
                                {enquiry.email || "—"}
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

                            {enquiry.contactNumber || "—"}
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
                                {enquiry.dateOfTravel
                                  ? new Date(
                                      enquiry.dateOfTravel
                                    ).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )
                                  : "—"}
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
                              {enquiry.numberOfPeople || 0}{" "}
                              {Number(
                                enquiry.numberOfPeople
                              ) === 1
                                ? "Person"
                                : "People"}
                            </span>

                            {Number(
                              enquiry.numberOfChildren || 0
                            ) > 0 && (
                              <p className="mt-2 text-xs text-slate-500">
                                {enquiry.numberOfChildren}{" "}
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
                            {enquiry.hotelCategory || "—"}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <div className="relative w-fit">

                            <select
                              value={status}
                              disabled={isThisUpdating}
                              onChange={(event) =>
                                handleStatusChange(
                                  enquiry._id,
                                  event.target.value
                                )
                              }
                              className={`appearance-none rounded-full border py-2 pl-3 pr-8 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClasses(
                                status
                              )}`}
                            >
                              {STATUS_OPTIONS.map(
                                (option) => (
                                  <option
                                    key={option}
                                    value={option}
                                  >
                                    {option}
                                  </option>
                                )
                              )}
                            </select>

                            {isThisUpdating && (
                              <FiRefreshCw
                                size={13}
                                className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin"
                              />
                            )}
                          </div>
                        </td>

                        {/* Submitted */}

                        <td className="px-6 py-5">
                          {enquiry.createdAt ? (
                            <>
                              <p className="text-sm text-slate-600">
                                {new Date(
                                  enquiry.createdAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {new Date(
                                  enquiry.createdAt
                                ).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </>
                          ) : (
                            "—"
                          )}
                        </td>

                      </tr>
                    );
                  })}

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