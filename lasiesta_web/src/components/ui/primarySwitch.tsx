"use client";
import React from "react";

interface PrimartSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  circleColor?: string;
  bgCheckedColor?: string;
  bgUncheckedColor?: string;
  error?: string;
}

export default function PrimarySwitch({
  label,
  checked,
  error,
  onChange,
  disabled = false,
  circleColor = "bg-white",
  bgCheckedColor = "bg-green-500",
  bgUncheckedColor = "bg-gray-300",
}: PrimartSwitchProps) {
  return (
    <div>
      <div className="flex items-center justify-start gap-x-2 pt-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>

        <button
          type="button"
          onClick={() => onChange(!checked)}
          disabled={disabled}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            checked ? bgCheckedColor : bgUncheckedColor
          }`}
        >
          <span
            className={`${circleColor} w-4 h-4 rounded-full shadow transform transition ${
              checked ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
