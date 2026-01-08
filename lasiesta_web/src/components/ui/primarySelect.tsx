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
}

export default function PrimarySelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  className = "",
}: PrimarySelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a35c42] transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
          disabled ? "bg-gray-100" : "bg-white"
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
