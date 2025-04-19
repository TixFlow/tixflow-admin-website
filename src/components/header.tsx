"use client";

import { UserAvatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUserContext } from "@/context/user.context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Header() {
  const { toggleSidebar, open } = useSidebar();
  const { user } = useUserContext();
  return (
    <header className="h-24 border-b bg-grey-100 sticky top-0 z-10">
      <div className="size-full flex flex-row items-center justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={toggleSidebar}
        >
          {!open ? (
            <ChevronRight className="h-10 w-10" />
          ) : (
            <ChevronLeft className="h-10 w-10" />
          )}
        </Button>
        <h1 className="text-3xl font-bold">Tixflow Admin Centre</h1>
        <div className="h-fit w-fit content">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-14 h-14">
                <UserAvatar
                  firstName={user.firstName}
                  lastName={user.avatar}
                  imageUrl={user.avatar}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="size-fit p-0 -translate-x-4">
              <DropdownMenuLabel className="font-medium text-2xl border-b py-2 px-5">{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
