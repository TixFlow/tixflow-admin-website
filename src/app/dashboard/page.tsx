"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function BashboardHomePape() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  return (
    <Card className="w-full h-full p-5 flex flex-col">
      <CardHeader>
        <CardTitle className="text-4xl font-semibold">
          Tixflow Admin Centre Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-4 gap-5 h-full">
          <Card className="w-full bg-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Users</CardTitle>
            </CardHeader>
            <CardContent>{}</CardContent>
          </Card>
          <Card className="w-full bg-green-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Events</CardTitle>
            </CardHeader>
            <CardContent>{}</CardContent>
          </Card>
          <Card className="w-full bg-yellow-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Tickets</CardTitle>
            </CardHeader>
            <CardContent>{}</CardContent>
          </Card>
          <Card className="w-full bg-red-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Orders</CardTitle>
            </CardHeader>
            <CardContent>{}</CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
