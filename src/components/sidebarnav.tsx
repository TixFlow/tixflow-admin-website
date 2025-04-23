"use client";

import Logo from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/providers/auth.provider";
import {
  CalendarRange,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav() {
  const { logout } = useAuthContext();
  const pathname = usePathname();
  const links = [
    { href: "/dashboard/users", label: "User Management", icon: Users },
    { href: "/dashboard/tickets", label: "Ticket Management", icon: Ticket },
    {
      href: "/dashboard/events",
      label: "Events Management",
      icon: CalendarRange,
    },
    { href: "/dashboard/orders", label: "Order Management", icon: ShoppingBag },
  ];
  return (
    <Sidebar className="bg-grey-100">
      <SidebarHeader className="border-b h-24">
        <div className="w-full h-full">
          <Link
            href="/dashboard"
            className="w-full h-full grid place-items-center"
          >
            <Logo classname="w-1/3 h-full" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="w-full gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <SidebarMenuItem
                className={`menu-item px-4 py-2 ${
                  pathname === link.href ? "active" : ""
                }`}
                key={link.href}
              >
                <Link
                  href={link.href}
                  className="w-full h-fit p-4 flex flex-row items-center gap-4 rounded-md hover:bg-yellow-200/50"
                >
                  <Icon className="w-8 h-8 text-yellow-500 relative" />
                  <span className="font-medium text-2xl">{link.label}</span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="cursor-pointer border-t">
        <div
          className="w-full h-fit p-6 text-red-500 flex flex-row items-center justify-center gap-4 hover:bg-destructive/10 rounded-md"
          onClick={logout}
        >
          <LogOut className="w-8 h-8" />
          <span className="font-medium text-2xl">Logout</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
