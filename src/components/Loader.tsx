import React from "react";
import { twMerge } from "tailwind-merge";

interface BoderProps {
  styles?: string;
}

const Loader = ({ styles = "" }: BoderProps) => {
  return (
    <div
      className={twMerge(
        "absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-500/30",
        styles
      )}
    >
      <div className="h-4 w-4 border-4 border-t-blue-400 bg-white p-4 ease-in rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
