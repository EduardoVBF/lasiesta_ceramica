"use client";
import React from "react";

interface BrownButtonProps {
  text: string;
  onClick?: () => void;
}

const BrownButton: React.FC<BrownButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="mt-4 px-6 py-2 bg-[#a35c42] text-white rounded-full hover:bg-[#bb6d5b] transition cursor-pointer text-sm hover:shadow-lg hover:transform hover:scale-[1.01] z-20"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BrownButton;
