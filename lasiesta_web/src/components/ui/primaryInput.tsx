"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PrimaryInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
  error,
  disabled = false,
}: PrimaryInputProps) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  console.log("ERROR", error);
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 pr-10 rounded-lg
            focus:outline-none focus:ring-2 transition
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${disabled ? "bg-gray-100" : "bg-white"} ${
              error
                ? "border-2 border-red-500 focus:border focus:border-gray-300"
                : "border border-gray-300 focus:ring-[#a35c42]"
            }`}
        />

        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#a35c42]"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
