import DeleteUserDialog from "@/app/dashboard/users/components/delete-user-dialog";
import { DataTable } from "@/components/data-table";
import PaginationNav from "@/components/pagination-nav";
import PickSize from "@/components/pick-size";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IListResponse, User } from "@/services/types";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, Eraser, Search } from "lucide-react";

interface UserTableProps {
  data: IListResponse<User>;
  page: number;
  size: number;
  search: string;
  setSize: (size: number) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setHaveChanges: (value: boolean) => void;
}
export default function UserTable({
  data,
  page,
  size,
  search,
  setPage,
  setSize,
  setSearch,
  setHaveChanges
}: UserTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center">Fullname</div>,
      cell: ({ row }) => (
        <div className="text-center">{`${row.original.firstName} ${row.original.lastName}`}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="text-center">Email</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">Phone</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("phone") || "N/A"}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-center">Role</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <DeleteUserDialog
            userId={row.original.id}
            setHaveChanges={setHaveChanges}
          />
        </div>
      ),
    },
  ];
  const items = data.data;
  return (
    <div className="w-full">
      <div className="w-full items-center justify-between flex">
        <div className="flex items-center">
          <div className="relative w-full max-w-sm p-4 px-0">
            <Search className="absolute top-1/2 left-2 h-6 w-6 text-muted-foreground -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search user..."
              className="w-full pl-10 bg-white text-xl h-12"
            />
          </div>
          <Button variant="outline" onClick={() => {}} className="text-xl h-12">
            Search
          </Button>
        </div>
        <PickSize size={size} setSize={setSize} className="text-xl h-12 w-20" />
      </div>

      <DataTable columns={columns} data={data.data || []} />
      <PaginationNav
        page={page}
        setPage={setPage}
        totalPages={data.totalPages || 0}
      />
    </div>
  );
}
