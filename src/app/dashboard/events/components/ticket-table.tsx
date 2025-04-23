import AcceptTicketDialog from "@/app/dashboard/events/components/accept-ticket-dialog";
import RejectTicketDialog from "@/app/dashboard/events/components/reject-ticket-dialog";
import RemoveTicketDialog from "@/app/dashboard/events/components/remove-ticket-dialog";
import { DataTable } from "@/components/data-table";
import PaginationNav from "@/components/pagination-nav";
import PickSize from "@/components/pick-size";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Event, EventStatus, IListResponse } from "@/services/types";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import Image from "next/image";

interface TicketTableProps {
  data: IListResponse<Event>;
  page: number;
  size: number;
  search: string;
  setSize: (size: number) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setHaveChanges: (value: boolean) => void;
}
export default function TicketTable({
  data,
  page,
  size,
  search,
  setPage,
  setSize,
  setSearch,
  setHaveChanges,
}: TicketTableProps) {
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center">Name</div>,
      cell: ({ row }) => (
        <div className="text-center">{`${row.original.name}`}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-center ">Description</div>,
      cell: ({ row }) => (
        <div className=" text-justify text-wrap">
          {row.original.description.substring(0, 50).concat("...")}
        </div>
      ),
    },
    {
      accessorKey: "imageUrl",
      header: () => <div className="text-center">Image</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Image
            src={row.original.coverUrl}
            alt="Ticket Image"
            width={250}
            height={50}
            className="rounded-md "
          />
        </div>
      ),
    },
    {
      accessorKey: "introduction",
      header: () => <div className="text-center">Introduction</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.introduction.substring(0, 50).concat("...")}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: () => <div className="text-center">Location</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.location}</div>
      ),
    },
    {
      accessorKey: "condition",
      header: () => <div className="text-center">Condition</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.original.condition}</div>
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
          {row.original.status === EventStatus.PENDING && (
            <div className="flex items-center justify-center gap-3">
              <AcceptTicketDialog
                ticketId={row.original.id}
                setHaveChanges={setHaveChanges}
              />
              <RejectTicketDialog
                ticketId={row.original.id}
                setHaveChanges={setHaveChanges}
              />
            </div>
          )}
          <RemoveTicketDialog
            ticketId={row.original.id}
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
              placeholder="Search ticket..."
              className="w-full pl-10 bg-white text-xl h-12"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setPage(1);
              setSearch(
                (
                  document.querySelector(
                    "input[type='search']"
                  ) as HTMLInputElement
                ).value
              );
            }}
            className="text-xl h-12"
          >
            Search
          </Button>
        </div>
        <PickSize size={size} setSize={setSize} className="text-xl h-12 w-20" />
      </div>

      <DataTable columns={columns} data={items || []} />
      <PaginationNav
        page={page}
        setPage={setPage}
        totalPages={data.totalPages || 0}
      />
    </div>
  );
}
