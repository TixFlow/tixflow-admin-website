import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/user.context";
import { SidebarProvider } from "@/components/ui/sidebar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Tixflow Admin Centre",
  description: "Admin Centre for Tixflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`${roboto.variable}  antialiased`)}>
        <UserProvider>
          <SidebarProvider>
            {children}
            <Toaster position="top-right" duration={3000} />
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
