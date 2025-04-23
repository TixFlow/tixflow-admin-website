import { Badge } from "@/components/ui/badge";

export default function ReputationBadge({
  reputation,
}: {
  reputation: number;
}) {
  let badgeColor = "bg-transparent border-green-500 text-green-500"; // Default color for unknown reputation

  if (reputation >= 80) {
    badgeColor = "bg-transparent border-green-500 text-green-500";
  } else if (reputation >= 50) {
    badgeColor = "bg-transparent border-yelow-500 text-yellow-500";
  } else if (reputation >= 20) {
    badgeColor = "bg-transparent border-orange-500 text-orange-500";
  } else if (reputation < 20) {
    badgeColor = "bg-transparent border-red-500 text-red-500";
  }

  return <Badge className={badgeColor} variant={"outline"}>{reputation}</Badge>;
}
