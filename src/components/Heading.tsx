import React from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "./ui/label";

export interface HeadingProps {
  children: React.ReactNode;
  styles?: string;
}

const H1: React.FC<HeadingProps> = ({ styles, children }) => {
  return (
    <Label
      className={twMerge(
        "font-semibold cursor-pointer text-lg md:text-2xl",
        styles
      )}
    >
      {children}
    </Label>
  );
};

const H2: React.FC<HeadingProps> = ({ styles, children }) => {
  return (
    <Label
      className={twMerge(
        "font-semibold cursor-pointer text-base md:text-xl",
        styles
      )}
    >
      {children}
    </Label>
  );
};

export { H1, H2 };
