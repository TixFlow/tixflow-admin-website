import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/models";

export default function RoleBadge({ role }: { role: UserRole }) {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return <Badge variant="default">Super Admin</Badge>;
    case UserRole.EVENT_HOLDER:
      return <Badge variant="secondary">Event Holder</Badge>;
    case UserRole.ADMIN:
      return <Badge variant="destructive">Admin</Badge>;
    case UserRole.STAFF:
      return <Badge variant="secondary">Manager</Badge>;
    case UserRole.CUSTOMER:
      return <Badge variant="outline">Customer</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}