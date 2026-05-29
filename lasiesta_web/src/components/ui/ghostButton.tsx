"use client";

interface GhostButtonProps {
  text: string;
  maxWidth?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  textSize?: string;
  className?: string;
}

export default function GhostButton({
  text,
  maxWidth,
  disabled = false,
  textSize = "text-base",
  className = "",
  type = "button",
  onClick,
}: GhostButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        px-4 py-3 rounded-full backdrop-blur-md bg-white/20 border border-[#7a5c48]/30 text-[#5c3d2e] font-medium hover:bg-white/30 hover:border-[#7a5c48] hover:-translate-y-[2px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${textSize} ${maxWidth} ${className}`}
    >
      {text}
    </button>
  );
}
