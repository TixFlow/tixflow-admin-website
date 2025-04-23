import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/models";

export default function UserStatusBadge({ status }: { status: UserStatus }) {
  switch (status) {
    case UserStatus.ACTIVE:
      return (
        <Badge className="text-green-500 border-green-500" variant={"outline"}>
          Active
        </Badge>
      );
    case UserStatus.SUSPENDED:
      return (
        <Badge className="text-yellow-500 border-yellow-500" variant={"outline"}>
          Inactive
        </Badge>
      );
    case UserStatus.BLOCKED:
      return (
        <Badge className="text-red-500 border-red-500" variant={"outline"}>
          Blocked
        </Badge>
      );
    default:
      return (
        <Badge className="text-gray-500 border-gray-500" variant={"outline"}>
          Unknown
        </Badge>
      );
  }
}
