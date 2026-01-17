"use client";
import { BeatLoader } from "react-spinners";
import React from "react";

type LoaderCompProps = {
  color?: string;
  classname?: string;
  size?: number;
  text?: string | null;
  children?: React.ReactNode;
};

export default function LoaderComp({
  color = "#A0522D",
  classname = "m-2",
  size = 20,
  text = "Carregando...",
  children,
}: LoaderCompProps) {
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-[300px] sm:h-[400px] xl:h-[550px] 2xl:h-[650px] overflow-hidden">
      <BeatLoader
        color={color}
        className={classname}
        size={size}
        speedMultiplier={1}
      />

      {children && children}

      {text && <p className="text-gray-500">{text}</p>}
    </div>
  );
}
