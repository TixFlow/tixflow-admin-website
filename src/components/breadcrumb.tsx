"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean) // remove empty strings
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      const label = decodeURIComponent(segment);

      return {
        label,
        href,
        isLast: index === array.length - 1,
      };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-0">
        {segments.map(({ label, href, isLast }) => (
          <div className="flex items-center" key={href}>
            <BreadcrumbItem key={href} className="text-xl">
              {isLast ? (
                <span className="text-xl text-muted-foreground capitalize px-4 py-2">
                  {label}
                </span>
              ) : (
                <BreadcrumbLink asChild>
                  <Button variant={"link"} disabled={label === "dashboard"}>
                    <Link href={href} className="capitalize text-xl" >
                      {label}
                    </Link>
                  </Button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && (
              <BreadcrumbSeparator className="text-muted-foreground" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}