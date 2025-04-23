"use client";
import UserTable from "@/app/dashboard/users/components/user-table";
import PaginationNav from "@/components/pagination-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLazyGetAllUsersQuery } from "@/services/apis/user.api";
import { IListResponse, User, UserStatus } from "@/services/types";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function UserDashboardPage() {
  const [users, setUsers] = useState<IListResponse<User>>(
    {} as IListResponse<User>
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [haveChanges, setHaveChanges] = useState(false);
  const [getAllUsers] = useLazyGetAllUsersQuery();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers({ page, size }).unwrap();
      setUsers(response);
      setPage(response.page);
      setSize(response.size);
    };
    fetchUsers();
    setHaveChanges(false);
  }, [page, size, search, getAllUsers, haveChanges]);

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Users</CardTitle>
          <CardDescription className="text-xl">
            User Management Dashboard
          </CardDescription>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-slate-100 rounded-md p-4 flex items-center shadow-sm">
              <div className="flex-1">
                <h3 className="font-semibold text-3xl text-gray-700">
                  Total Users
                </h3>
                <div className="text-2xl font-bold">{users.totalSize || 0}</div>
              </div>
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            <div className="bg-slate-100 rounded-md p-4 flex items-center shadow-sm">
              <div className="flex-1">
                <h3 className="font-semibold text-3xl text-gray-700">
                  Active Users
                </h3>
                <div className="text-2xl font-bold">
                  {users.data?.filter(
                    (user) => user.status === UserStatus.ACTIVE
                  ).length || 0}
                </div>
              </div>
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable
            data={users}
            setPage={setPage}
            setSize={setSize}
            setSearch={setSearch}
            page={page}
            size={size}
            search={search}
            setHaveChanges={setHaveChanges}
          />
        </CardContent>
      </Card>
    </div>
  );
}
