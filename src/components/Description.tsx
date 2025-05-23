import { twMerge } from "tailwind-merge";
import { Label } from "./ui/label";

export default function Description({
  descriptionText,
  styles,
}: {
  descriptionText: string;
  styles: string;
}) {
  return (
    <Label className={twMerge("text-sm text-brand-0", styles)}>
      {descriptionText}
    </Label>
  );
}
