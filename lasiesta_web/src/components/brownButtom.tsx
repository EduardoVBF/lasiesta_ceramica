"use client";
import React from "react";

interface BrownButtonProps {
  text: string;
  onClick?: () => void;
}

const BrownButton: React.FC<BrownButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="mt-4 px-6 py-2 bg-marrom-avermelhado text-white rounded-full hover:bg-marrom-avermelhado/90 transition cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BrownButton;
