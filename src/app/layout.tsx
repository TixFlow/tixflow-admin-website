import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthProvider from "@/providers/auth.provider";
import StoreProvider from "@/providers/store.provider";

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
        <StoreProvider>
          <AuthProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </AuthProvider>
        </StoreProvider>
        <Toaster position="top-right" duration={1000} />
      </body>
    </html>
  );
}
