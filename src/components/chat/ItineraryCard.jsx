"use client";

import { useState } from "react";
import {
  FiCheck,
  FiCopy,
  FiFileText,
  FiSave,
} from "react-icons/fi";

const ItineraryCard = ({ itinerary }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return null;
  }

  const formatItinerary = () => {
    return itinerary
      .map((day) => {
        const activities =
          day.activities
            ?.map((activity) => `- ${activity}`)
            .join("\n") || "";

        return `Day ${day.day}
${day.title}

${activities}

Highlight: ${day.highlight || "N/A"}`;
      })
      .join("\n\n");
  };

  // -----------------------------------------
  // Copy
  // -----------------------------------------

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatItinerary());

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy itinerary:", error);

      // Fallback for browsers where clipboard API is unavailable
      try {
        const textarea = document.createElement("textarea");

        textarea.value = formatItinerary();

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (fallbackError) {
        console.error("Copy fallback failed:", fallbackError);
      }
    }
  };

  // -----------------------------------------
  // TXT Download
  // -----------------------------------------

  const handleDownload = () => {
    try {
      const content = formatItinerary();

      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "travel-itinerary.txt";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download itinerary:", error);
    }
  };

  // -----------------------------------------
  // PDF Download
  // -----------------------------------------

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);

      const html2pdf = (await import("html2pdf.js")).default;

      const element = document.getElementById("travel-itinerary");

      if (!element) {
        throw new Error("Itinerary element not found.");
      }

      await html2pdf()
        .set({
          margin: 10,
          filename: "travel-itinerary.pdf",

          image: {
            type: "jpeg",
            quality: 0.98,
          },

          html2canvas: {
            scale: 2,
            useCORS: true,

            // Prevent html2canvas from failing
            // on unsupported Tailwind lab() colors.
            onclone: (clonedDocument) => {
              clonedDocument
                .querySelectorAll("*")
                .forEach((element) => {
                  const computedStyle =
                    clonedDocument.defaultView.getComputedStyle(element);

                  if (computedStyle.color.includes("lab")) {
                    element.style.color = "#374151";
                  }

                  if (
                    computedStyle.backgroundColor.includes("lab")
                  ) {
                    element.style.backgroundColor = "#ffffff";
                  }

                  if (
                    computedStyle.borderColor.includes("lab")
                  ) {
                    element.style.borderColor = "#e5e7eb";
                  }
                });
            },
          },

          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },

          pagebreak: {
            mode: ["css", "legacy"],
          },
        })
        .from(element)
        .save();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSave = async () => {
  try {
    setIsSaving(true);

    const response = await fetch("/api/itineraries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itinerary,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to save itinerary."
      );
    }

    setIsSaved(true);
  } catch (error) {
    console.error("Failed to save itinerary:", error);
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="w-full space-y-4">
      {/* ----------------------------------------- */}
      {/* Action Buttons */}
      {/* ----------------------------------------- */}

      <div className="flex w-full flex-wrap justify-end gap-2">
        {/* Copy */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          {isCopied ? (
            <FiCheck size={14} />
          ) : (
            <FiCopy size={14} />
          )}

          {isCopied ? "Copied!" : "Copy Itinerary"}
        </button>

        {/* TXT Download */}
        {/* <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <FiDownload size={14} />

          Download
        </button> */}

        {/* PDF Download */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiFileText size={14} />

          {isGeneratingPdf
            ? "Generating PDF..."
            : "Download PDF"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaved ? <FiCheck size={14} /> : <FiSave size={14} />}

          {isSaving
            ? "Saving..."
            : isSaved
              ? "Saved!"
              : "Save Itinerary"}
        </button>
      </div>

      {/* ----------------------------------------- */}
      {/* Itinerary */}
      {/* ----------------------------------------- */}

      <div
        id="travel-itinerary"
        className="space-y-4 bg-white p-2"
      >
        {/* PDF Header */}

        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Travel Itinerary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Generated by Travel Unbounded AI Travel Assistant
          </p>
        </div>

        {/* Days */}

        {itinerary.map((day) => (
          <div
            key={day.day}
            className="break-inside-avoid rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Day {day.day}
              </p>

              <h3 className="mt-1 text-base font-semibold text-gray-900">
                {day.title}
              </h3>
            </div>

            <div className="space-y-2">
              {day.activities?.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-2 text-sm text-gray-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />

                  <span>{activity}</span>
                </div>
              ))}
            </div>

            {day.highlight && (
              <div className="mt-4 rounded-xl bg-blue-50 p-3">
                <p className="text-xs font-semibold text-blue-700">
                  Highlight
                </p>

                <p className="mt-1 text-sm text-blue-900">
                  {day.highlight}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryCard;
