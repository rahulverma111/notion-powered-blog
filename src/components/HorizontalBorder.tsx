import React from "react";
import { twMerge } from "tailwind-merge";

interface BoderProps {
  styles?: string;
}

export const HorizontalBorder = ({ styles = "" }: BoderProps) => {
  return <div className={twMerge("w-full h-0.5 bg-gray-300", styles)}></div>;
};
