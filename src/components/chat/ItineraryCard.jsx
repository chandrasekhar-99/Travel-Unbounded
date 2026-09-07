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

  // -----------------------------------------
  // Format itinerary
  // -----------------------------------------

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

            onclone: (clonedDocument) => {
              clonedDocument
                .querySelectorAll("*")
                .forEach((element) => {
                  const computedStyle =
                    clonedDocument.defaultView.getComputedStyle(
                      element
                    );

                  if (computedStyle.color.includes("lab")) {
                    element.style.color = "#374151";
                  }

                  if (
                    computedStyle.backgroundColor.includes(
                      "lab"
                    )
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

  // -----------------------------------------
  // Save
  // -----------------------------------------

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
    <div className="w-full min-w-0 space-y-3">
      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-1.5

          min-[360px]:grid-cols-3

          sm:flex
          sm:flex-wrap
          sm:justify-end
          sm:gap-2
        "
      >
        {/* Copy */}
        <button
          type="button"
          onClick={handleCopy}
          className="
            flex
            min-w-0
            items-center
            justify-center
            gap-1.5

            rounded-lg
            border
            border-gray-300
            bg-white

            px-2
            py-1.5

            text-[11px]
            font-medium
            text-gray-700

            transition

            hover:bg-gray-50

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary/30

            sm:px-3
            sm:py-2
            sm:text-xs
          "
        >
          {isCopied ? (
            <FiCheck className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <FiCopy className="h-3.5 w-3.5 shrink-0" />
          )}

          <span className="truncate">
            {isCopied ? "Copied!" : "Copy"}
          </span>
        </button>

        {/* PDF */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="
            flex
            min-w-0
            items-center
            justify-center
            gap-1.5

            rounded-lg
            bg-primary

            px-2
            py-1.5

            text-[11px]
            font-medium
            text-white

            transition

            hover:bg-primary-dark

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary/30

            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:px-3
            sm:py-2
            sm:text-xs
          "
        >
          <FiFileText className="h-3.5 w-3.5 shrink-0" />

          <span className="truncate">
            {isGeneratingPdf ? "Generating..." : "PDF"}
          </span>
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className="
            flex
            min-w-0
            items-center
            justify-center
            gap-1.5

            rounded-lg
            border
            border-gray-300
            bg-white

            px-2
            py-1.5

            text-[11px]
            font-medium
            text-gray-700

            transition

            hover:bg-gray-50

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary/30

            disabled:cursor-not-allowed
            disabled:opacity-60

            sm:px-3
            sm:py-2
            sm:text-xs
          "
        >
          {isSaved ? (
            <FiCheck className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <FiSave className="h-3.5 w-3.5 shrink-0" />
          )}

          <span className="truncate">
            {isSaving
              ? "Saving..."
              : isSaved
                ? "Saved!"
                : "Save"}
          </span>
        </button>
      </div>

      {/* =====================================================
          ITINERARY
      ====================================================== */}

      <div
        id="travel-itinerary"
        className="
          w-full
          min-w-0
          space-y-3

          overflow-hidden

          bg-white
          p-1.5

          sm:space-y-4
          sm:p-2
        "
      >
        {/* ===================================================
            PDF HEADER
        ==================================================== */}

        <div
          className="
            mb-3
            border-b
            border-gray-200
            pb-3

            sm:mb-5
            sm:pb-4
          "
        >
          <h2
            className="
              text-base
              font-bold
              leading-tight
              text-gray-900

              sm:text-xl
            "
          >
            Travel Itinerary
          </h2>

          <p
            className="
              mt-1
              text-[10px]
              leading-relaxed
              text-gray-500

              sm:text-sm
            "
          >
            Generated by Travel Unbounded AI Travel Assistant
          </p>
        </div>

        {/* ===================================================
            DAYS
        ==================================================== */}

        {itinerary.map((day) => (
          <div
            key={day.day}
            className="
              break-inside-avoid

              w-full
              min-w-0

              rounded-xl
              border
              border-gray-200

              bg-white

              p-3

              shadow-sm

              sm:rounded-2xl
              sm:p-4
            "
          >
            {/* Day Header */}
            <div className="mb-2.5 sm:mb-3">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-primary

                  sm:text-xs
                "
              >
                Day {day.day}
              </p>

              <h3
                className="
                  mt-0.5
                  wrap-break-word
                  text-sm
                  font-semibold
                  leading-snug
                  text-gray-900

                  sm:mt-1
                  sm:text-base
                "
              >
                {day.title}
              </h3>
            </div>

            {/* Activities */}
            <div className="space-y-1.5 sm:space-y-2">
              {day.activities?.map((activity, index) => (
                <div
                  key={index}
                  className="
                    flex
                    min-w-0
                    gap-2

                    text-xs
                    leading-relaxed
                    text-gray-700

                    sm:text-sm
                  "
                >
                  <span
                    className="
                      mt-1.5
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-primary
                    "
                  />

                  <span className="min-w-0 wrap-break-word">
                    {activity}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlight */}
            {day.highlight && (
              <div
                className="
                  mt-3
                  rounded-lg
                  bg-primary/10
                  p-2.5

                  sm:mt-4
                  sm:rounded-xl
                  sm:p-3
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold
                    text-primary

                    sm:text-xs
                  "
                >
                  Highlight
                </p>

                <p
                  className="
                    mt-0.5
                    wrap-break-word
                    text-xs
                    leading-relaxed
                    text-gray-700

                    sm:mt-1
                    sm:text-sm
                  "
                >
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
