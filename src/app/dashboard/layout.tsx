import SidebarNav from "@/components/sidebarnav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-full min-h-screen">
      <SidebarNav />
      <div className="w-full ">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
