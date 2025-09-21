import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import UnFriendButton from "./UnFriendButton";

type Props = {
  friend: any;
};
const FriendDropdown = ({ friend }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none bg-slate-200 outline-none h-full w-full p-2 rounded-md">
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-none">
          <UnFriendButton id={friend?.relationshipDto?.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FriendDropdown;
