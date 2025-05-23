import { twMerge } from "tailwind-merge";
import { Label } from "./ui/label";

export default function Subheading({
  headerText,
  styles,
}: {
  headerText: string;
  styles?: string;
}) {
  return (
    <Label className={twMerge("font-sm text-2xl", styles)}>{headerText}</Label>
  );
}
