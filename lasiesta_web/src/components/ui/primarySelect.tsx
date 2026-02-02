"use client";
import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface PrimarySelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export default function PrimarySelect({
  label,
  value,
  error,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  className = "",
}: PrimarySelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a35c42] transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
          disabled ? "bg-gray-100" : "bg-white"
        }
          ${
            error
              ? "border-2 border-red-500 focus:border focus:border-gray-300"
              : "border border-gray-300 focus:ring-[#a35c42]"
          }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
