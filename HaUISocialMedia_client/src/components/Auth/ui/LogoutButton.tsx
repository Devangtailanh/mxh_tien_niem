import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useStore } from "@/stores";
import { LogOut } from "lucide-react";
type Props = {
  isAdminPage?: boolean;
};
const LogoutButton = ({ isAdminPage }: Props) => {
  const { authStore } = useStore();
  const { logout: handleLogoutV2 } = authStore;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="right-0">
        {isAdminPage ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <LogOut /> Đăng xuất
          </div>
        ) : (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center gap-2 hover:bg-blue-2 py-2 rounded-xl"
          >
            <LogOut /> Đăng xuất
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleLogoutV2}>
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LogoutButton;
