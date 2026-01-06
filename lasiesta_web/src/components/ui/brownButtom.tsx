"use client";
import React from "react";

interface BrownButtonProps {
  text: string;
  maxWidth?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  textSize?: string;
}

export default function BrownButton({
  text,
  maxWidth,
  disabled = false,
  textSize = "text-base",
  type = "button",
  onClick,
}: BrownButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 bg-[#a35c42] text-white rounded-xl
                 hover:bg-[#8f4f38] transition cursor-pointer disabled:opacity-60 ${textSize}
                 hover:shadow-lg hover:scale-[1.01] z-20 w-full ${maxWidth}`}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
