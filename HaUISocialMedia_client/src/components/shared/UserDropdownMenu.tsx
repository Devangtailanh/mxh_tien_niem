import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import LogoutButton from "../Auth/ui/LogoutButton";
import EditUserModal from "../User/ui/EditUserModal";

function UserDropdownMenu() {
  const navigate = useNavigate();

  //new code base for storebase
  const { authStore } = useStore();
  const { logout: handleLogoutV2, getLoggedInUser } = authStore;

  const currentUser = getLoggedInUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src={currentUser?.avatar || "/person.jpg"}
          alt="user-image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-[2vw] min-w-[300px] flex flex-col gap-3 p-3 border-none shadow-lg ">
        <DropdownMenuItem className="hover:bg-blue-2 py-2 rounded-xl">
          <div
            className="flex gap-2 items-center"
            onClick={() =>
              (window.location.href = `/profile/${currentUser?.id}`)
            }
          >
            <ArrowRight /> Trang cá nhân
          </div>
        </DropdownMenuItem>
        <EditUserModal>
          <DropdownMenuItem
            className="hover:bg-blue-2 py-2 rounded-xl"
            onSelect={(e) => e.preventDefault()}
          >
            <div className="flex gap-2 items-center">
              <Pencil /> Chỉnh sửa thông tin
            </div>
          </DropdownMenuItem>
        </EditUserModal>

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(observer(UserDropdownMenu));
