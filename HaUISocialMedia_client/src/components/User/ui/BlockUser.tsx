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
import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/shared/Loader";
import Icon from "@/components/shared/Icon";

type Props = {
  id: string;
};
const BlockUser = ({ id }: Props) => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const [isBlocking, setIsBlocking] = useState(false);
  const { disableUser } = userStore;

  const handleDeleteClass = async () => {
    try {
      setIsBlocking(true);
      await disableUser(id);
      toast.success("Đã  khoá cho người dùng này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBlocking(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-1 text-yellow-600 cursor-pointer">
          <Icon name="LockKeyhole" size={16} />
          <span>Khoá tài khoản</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn khoá tài khoản người dùng này
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteClass}>
            {isBlocking ? <Loader /> : "Xác Nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default BlockUser;
