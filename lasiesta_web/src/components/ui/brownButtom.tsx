"use client";
import React from "react";

interface BrownButtonProps {
  text: string;
  onClick?: () => void;
}

export default function BrownButton({ text, onClick }: BrownButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-[#a35c42] text-white rounded-full rounded-full
                 hover:bg-[#bb6d5b] transition cursor-pointer text-sm
                 hover:shadow-lg hover:scale-[1.01] z-20"
    >
      {text}
    </button>
  );
}
