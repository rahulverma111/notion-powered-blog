import { twMerge } from "tailwind-merge";
import { Label } from "./ui/label";

export interface DescriptionProps {
  children: React.ReactNode;
  styles?: string;
}

const D1: React.FC<DescriptionProps> = ({ styles, children }) => {
  return (
    <Label className={twMerge("text-lg md:text-2xl text-brand-1", styles)}>
      {children}
    </Label>
  );
};

const D2: React.FC<DescriptionProps> = ({ styles, children }) => {
  return (
    <Label className={twMerge("text-base md:text-xl text-brand-1", styles)}>
      {children}
    </Label>
  );
};

const D3: React.FC<DescriptionProps> = ({ styles, children }) => {
  return (
    <Label className={twMerge("text-xs md:text-sm text-brand-1", styles)}>
      {children}
    </Label>
  );
};

export { D1, D2, D3 };
