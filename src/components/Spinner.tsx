"use client";
import React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg" | number;
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  let sizeClasses = "";
  let inlineStyle: React.CSSProperties | undefined = undefined;

  if (typeof size === "number") {
    inlineStyle = { width: size, height: size };
  } else {
    switch (size) {
      case "sm":
        sizeClasses = "h-5 w-5";
        break;
      case "lg":
        sizeClasses = "h-16 w-16";
        break;
      case "md":
      default:
        sizeClasses = "h-8 w-8";
    }
  }

  return (
    <div className="flex items-center justify-center">
      <svg
        style={inlineStyle}
        className={`animate-spin text-gray-500 ${sizeClasses}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    </div>
  );
}
