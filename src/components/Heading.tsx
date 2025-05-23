import { twMerge } from "tailwind-merge";
import { Label } from "./ui/label";

export default function Heading({
  headerText,
  styles,
}: {
  headerText: string;
  styles: string;
}) {
  return (
    <Label className={twMerge("font-bold text-2xl", styles)}>
      {headerText}
    </Label>
  );
}
