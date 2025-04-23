import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteUserMutation } from "@/services/apis/user.api";
import { Eraser } from "lucide-react";
import { useState } from "react";

interface DeleteUserDialogProps {
  userId: string;
  setHaveChanges: (value: boolean) => void;
}
export default function DeleteUserDialog({
  userId,
  setHaveChanges,
}: DeleteUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async () => {
    try {
      await deleteUser({ id: userId }).unwrap();
      setHaveChanges(true);
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" flex items-center p-2 justify-center bg-red-500 text-white rounded-md hover:bg-red-600/30 transition duration-200 ease-in-out">
        <Eraser className="w-8 h-8" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-xl">
            This action cannot be undone. Are you sure you want to permanently
            delete this user from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="text-xl" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
