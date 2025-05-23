import { twMerge } from "tailwind-merge";
import { Label } from "./ui/label";

export interface SubHeadingProps {
  children: React.ReactNode;
  styles?: string;
}

const SH1: React.FC<SubHeadingProps> = ({ styles, children }) => {
  return (
    <Label
      className={twMerge(
        "font-semibold text-lg md:text-2xl text-colors-Gray-500",
        styles
      )}
    >
      {children}
    </Label>
  );
};

const SH2: React.FC<SubHeadingProps> = ({ styles, children }) => {
  return (
    <Label
      className={twMerge(
        "font-semibold text-base md:text-xl text-colors-Gray-500",
        styles
      )}
    >
      {children}
    </Label>
  );
};

export { SH1, SH2 };
