import Image from "next/image";
import logo from "@public/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  classname?: string;
}
export default function Logo({ classname}: LogoProps) {
  return (
    <div className={cn("w-3xs h-32", classname)}>
      <Image
        className="object-cover w-full h-full"
        src={logo}
        alt="Tixflow logo image"
      />
    </div>
  );
}
