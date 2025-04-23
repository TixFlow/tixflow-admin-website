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
      <SelectTrigger className={cn("w-20 bg-white min-h-12 max-h-12", className)}>
        <SelectValue placeholder={size} className="h-12"/>
      </SelectTrigger>
      <SelectContent side={side} className="max-w-20 min-w-20">
        {[10, 15, 20, 25, 30].map((value) => (
          <SelectItem key={value} value={`${value}`} className={cn("w-20", className)}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
