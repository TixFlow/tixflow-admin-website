"use client";
import userApi from "@/apis/user.api";
import ReputationBadge from "@/app/dashboard/users/components/reputation-badge";
import RoleBadge from "@/app/dashboard/users/components/role-badge";
import UserStatusBadge from "@/app/dashboard/users/components/status-badge";
import { UserAvatar } from "@/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListResponse, User } from "@/models";
import { useCallback, useEffect, useState } from "react";

export default function UserDashboardPage() {
  const [users, setUsers] = useState<ListResponse<User> | null>(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    setLoading(true);
    userApi.getUsers().then((res) => setUsers(res));
    setLoading(false);
  }, [page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
  }, [page, size, getUsers]);

  return (
    <Card className="w-full h-full p-5">
      <CardHeader>
        <CardTitle className="text-4xl font-semibold">
          Users Management
        </CardTitle>
        <CardDescription className="text-lg font-normal">
          Manage your users here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>FullName</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Reputation</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading &&
              users?.data.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>{user.address || "N/A"}</TableCell>
                  <TableCell>
                    <div className="w-14 h-14">
                      <UserAvatar
                        firstName={user.firstName}
                        lastName={user.lastName}
                        imageUrl={user.avatar}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <ReputationBadge reputation={user.reputation} />
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <UserStatusBadge status={user.status} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
