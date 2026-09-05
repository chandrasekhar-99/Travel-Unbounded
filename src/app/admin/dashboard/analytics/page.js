"use client";

import { FiRefreshCw, FiBarChart2 } from "react-icons/fi";

import useAdminEnquiries from "@/hooks/useAdminEnquiries";
import EnquiryAnalytics from "@/components/admin/EnquiryAnalytics";

const AnalyticsPage = () => {
  const {
    enquiries,
    isLoading,
    error,
    fetchEnquiries,
  } = useAdminEnquiries();

  // -----------------------------------------
  // Loading
  // -----------------------------------------
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-200" />

          <div className="mt-3 h-9 w-56 rounded bg-slate-200" />

          <div className="mt-2 h-5 w-80 rounded bg-slate-200" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="h-[390px] rounded-2xl bg-white shadow-sm lg:col-span-2" />

            <div className="h-[390px] rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------
  if (error) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiRefreshCw size={22} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Unable to load analytics
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
    );
  }

  // -----------------------------------------
  // Page
  // -----------------------------------------
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FiBarChart2
              className="text-primary"
              size={16}
            />

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Admin
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
            Monitor enquiry trends and track the current
            status of customer enquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchEnquiries().catch(() => {})}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary"
        >
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Analytics */}
      <div className="mt-8">
        <EnquiryAnalytics enquiries={enquiries} />
      </div>
    </div>
  );
};

export default AnalyticsPage;