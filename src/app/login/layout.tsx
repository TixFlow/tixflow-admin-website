import { Metadata } from "next";
import { JSX, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tixflow Admin Centre - Authentication",
  description: "Admin Centre for Tixflow",
};

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-yellow-500">
      <div className="container ">{children}</div>
    </div>
  );
}
