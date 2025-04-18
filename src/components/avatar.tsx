import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}
export function UserAvatar({ firstName, lastName, imageUrl }: UserAvatarProps) {
  return (
    <Avatar className="size-full">
      <AvatarImage src={imageUrl || ""} />
      <AvatarFallback className="bg-yellow-500 text-white font-bold">
        {firstName?.charAt(0) || ""}
        {lastName?.charAt(0) || ""}
      </AvatarFallback>
    </Avatar>
  );
}
