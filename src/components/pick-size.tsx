import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PickSizeProps {
  size: number;
  setSize: (value: number) => void;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}
export default function PickSize({
  size,
  setSize,
  side = "bottom",
  className,
}: PickSizeProps) {
  return (
    <Select value={`${size}`} onValueChange={(value) => setSize(Number(value))}>
      <SelectTrigger className={cn("w-20", className)}>
        <SelectValue placeholder={size} />
      </SelectTrigger>
      <SelectContent side={side}>
        {[10, 15, 20, 25, 30].map((value) => (
          <SelectItem key={value} value={`${value}`}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
