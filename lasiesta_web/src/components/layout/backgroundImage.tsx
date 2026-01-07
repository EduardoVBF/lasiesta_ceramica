"use client";
import Image from "next/image";
import React from "react";

interface BackgroundImageProps {
  src: string;
  alt: string;
  opacity?: number;
  className?: string;
}

export default function BackgroundImage({
  src,
  alt,
  opacity = 10,
  className,
}: BackgroundImageProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        style={{ opacity: opacity / 100 }}
        className={`object-cover mix-blend-overlay ${className}`}
      />
    </div>
  );
}
