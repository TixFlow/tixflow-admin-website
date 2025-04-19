import Header from "@/components/header";
import SidebarNav from "@/components/sidebarnav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-full min-h-screen">
      <SidebarNav />
      <div className="w-full h-full bg-gray-100 flex flex-col">
        <Header />
        <main className="h-full">
          <div className="w-[80%] min-h-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
