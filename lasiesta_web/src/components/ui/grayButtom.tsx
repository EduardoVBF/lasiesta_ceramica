"use client";
import React from "react";

interface GRayButtonProps {
  text: string;
  maxWidth?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  textSize?: string;
  className?: string;
}

export default function GrayButton({
  text,
  maxWidth,
  disabled = false,
  textSize = "text-base",
  className = "",
  type = "button",
  onClick,
}: GRayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition cursor-pointer disabled:opacity-60 ${textSize} hover:shadow-lg hover:scale-[1.01] z-20 w-full ${maxWidth} ${className}`}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
