"use client";
import { IListResponse, User } from "@/services/types";
import { useState } from "react";

export default function UserDashboardPage() {
  const [users, setUsers] = useState<IListResponse<User>>();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
  };

  return <></>;
}
