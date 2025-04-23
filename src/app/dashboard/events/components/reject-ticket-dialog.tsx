import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateEventStatusMutation } from "@/services/apis/event.api";
import { useUpdateTicketStatusMutation } from "@/services/apis/ticket.api";
import { EventStatus, TicketStatus } from "@/services/types";
import { Eraser, X } from "lucide-react";
import { useState } from "react";

interface DeleteUserDialogProps {
  ticketId: string;
  setHaveChanges: (value: boolean) => void;
}
export default function RejectTicketDialog({
  ticketId,
  setHaveChanges,
}: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateTicket] = useUpdateEventStatusMutation();
  const handleDeleteUser = async () => {
    try {
      await updateTicket({
        id: ticketId,
        status: EventStatus.REJECTED,
      }).unwrap();
      setHaveChanges(true);
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" flex items-center p-2 justify-center bg-red-500 text-white rounded-md hover:bg-red-600/30 transition duration-200 ease-in-out">
        <X className="w-8 h-8" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-xl">
            This action cannot be undone. Are you sure you want to reject to
            sell this ticket?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="text-xl" onClick={handleDeleteUser} variant={"destructive"}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
