"use client";
import { error } from "console";
import React from "react";

interface ColoredTextBoxProps {
  text: string;
  type: "info" | "warning" | "error" | "success";
  maxWidth?: string;
}

export default function ColoredTextBox({
  text,
  type,
  maxWidth,
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
      className={`w-full rounded-md px-2 py-1 border-2 ${TypeColors[type].border} ${TypeColors[type].bg}`}
      style={{ maxWidth }}
    >
      <p className={`text-sm text-center ${TypeColors[type].text}`}>{text}</p>
    </div>
  );
}
