"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Converted",
  "Closed",
];

const EnquiryAnalytics = ({ enquiries = [] }) => {
  // -----------------------------------------
  // Enquiries Over Time
  // -----------------------------------------
  const enquiryOverTimeData = useMemo(() => {
    const monthlyCounts = {};

    enquiries.forEach((enquiry) => {
      if (!enquiry?.createdAt) return;

      const date = new Date(enquiry.createdAt);

      if (Number.isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth();

      const key = `${year}-${String(month + 1).padStart(2, "0")}`;

      if (!monthlyCounts[key]) {
        monthlyCounts[key] = {
          year,
          month,
          count: 0,
        };
      }

      monthlyCounts[key].count += 1;
    });

    const sortedMonths = Object.values(monthlyCounts).sort(
      (a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }

        return a.month - b.month;
      }
    );

    return {
      labels: sortedMonths.map(({ year, month }) =>
        new Date(year, month, 1).toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        )
      ),

      datasets: [
  {
    label: "Enquiries",

    data: sortedMonths.map(
      ({ count }) => count
    ),

    borderColor: "#2563eb",
    backgroundColor: "rgba(37, 99, 235, 0.15)",

    fill: true,
    tension: 0.4,

    borderWidth: 2,

    pointRadius: 4,
    pointHoverRadius: 6,

    pointBackgroundColor: "#2563eb",
    pointBorderColor: "#ffffff",
    pointBorderWidth: 2,
  },
],
    };
  }, [enquiries]);

  // -----------------------------------------
  // Enquiries By Status
  // -----------------------------------------
  const enquiryByStatusData = useMemo(() => {
    const statusCounts = {
      New: 0,
      Contacted: 0,
      Converted: 0,
      Closed: 0,
    };

    enquiries.forEach((enquiry) => {
      const status = enquiry?.status || "New";

      if (statusCounts[status] !== undefined) {
        statusCounts[status] += 1;
      } else {
        statusCounts.New += 1;
      }
    });

    return {
      labels: STATUS_OPTIONS,

      datasets: [
  {
    label: "Enquiries",

    data: STATUS_OPTIONS.map(
      (status) => statusCounts[status]
    ),

    backgroundColor: [
      "#3b82f6",
      "#f59e0b",
      "#10b981",
      "#ef4444",
    ],

    borderColor: "#ffffff",
    borderWidth: 2,

    hoverOffset: 6,
  },
],
    };
  }, [enquiries]);

  // -----------------------------------------
  // Line Chart Options
  // -----------------------------------------
  const lineChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          enabled: true,
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },
        },

        y: {
          beginAtZero: true,

          ticks: {
            precision: 0,
          },
        },
      },
    }),
    []
  );

  // -----------------------------------------
  // Doughnut Chart Options
  // -----------------------------------------
  const doughnutChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      cutout: "65%",

      plugins: {
        legend: {
          position: "bottom",

          labels: {
            padding: 20,
            usePointStyle: true,
          },
        },

        tooltip: {
          enabled: true,
        },
      },
    }),
    []
  );

  // -----------------------------------------
  // Empty State
  // -----------------------------------------
  if (!enquiries.length) {
    return (
      <div
        className="rounded-xl border p-8 text-center shadow-sm"
        style={{
          backgroundColor: "var(--theme-card-bg)",
          borderColor: "var(--theme-border)",
        }}
      >
        <h3
          className="text-lg font-semibold"
          style={{
            color: "var(--theme-text)",
          }}
        >
          No enquiry data available
        </h3>

        <p
          className="mt-2 text-sm"
          style={{
            color: "var(--theme-muted-text)",
          }}
        >
          Analytics will appear here once enquiries are
          submitted.
        </p>
      </div>
    );
  }

  // -----------------------------------------
  // Analytics
  // -----------------------------------------
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Enquiries Over Time */}
      <div
        className="rounded-xl border p-5 shadow-sm"
        style={{
          backgroundColor: "var(--theme-card-bg)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div className="mb-5">
          <h2
            className="text-lg font-semibold"
            style={{
              color: "var(--theme-text)",
            }}
          >
            Enquiries Over Time
          </h2>

          <p
            className="mt-1 text-sm"
            style={{
              color: "var(--theme-muted-text)",
            }}
          >
            Number of enquiries received each month
          </p>
        </div>

        <div className="h-[300px] w-full">
          <Line
            data={enquiryOverTimeData}
            options={lineChartOptions}
          />
        </div>
      </div>

      {/* Enquiries By Status */}
      <div
        className="rounded-xl border p-5 shadow-sm"
        style={{
          backgroundColor: "var(--theme-card-bg)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div className="mb-5">
          <h2
            className="text-lg font-semibold"
            style={{
              color: "var(--theme-text)",
            }}
          >
            Enquiries by Status
          </h2>

          <p
            className="mt-1 text-sm"
            style={{
              color: "var(--theme-muted-text)",
            }}
          >
            Breakdown of enquiries based on their
            current status
          </p>
        </div>

        <div className="mx-auto h-[300px] w-full max-w-[400px]">
          <Doughnut
            data={enquiryByStatusData}
            options={doughnutChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default EnquiryAnalytics;