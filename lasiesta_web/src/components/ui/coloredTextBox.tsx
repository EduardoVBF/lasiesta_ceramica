"use client";
import React from "react";

interface ColoredTextBoxProps {
  children: React.ReactNode;
  type: "info" | "warning" | "error" | "success";
  maxWidth?: string;
  className?: string;
}

export default function ColoredTextBox({
  children,
  type,
  maxWidth,
  className = "",
}: ColoredTextBoxProps) {
  const TypeColors = {
    error: {
      border: "border-red-400",
      text: "text-red-600",
      bg: "bg-red-50",
    },
    warning: {
      border: "border-yellow-400",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    info: {
      border: "border-blue-400",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    success: {
      border: "border-green-400",
      text: "text-green-600",
      bg: "bg-green-50",
    },
  };

  return (
    <div
      className={`w-full rounded-md px-3 py-2 border-2 ${TypeColors[type].border} ${TypeColors[type].bg} ${TypeColors[type].text} ${className}`}
      style={{ maxWidth }}
    >
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}
