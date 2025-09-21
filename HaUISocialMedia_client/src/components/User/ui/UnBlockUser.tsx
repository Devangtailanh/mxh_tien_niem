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
const UnBlockUser = ({ id }: Props) => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const [isUnBlocking, setIsUnBlocking] = useState(false);
  const { unDisableUser } = userStore;

  const handleDeleteClass = async () => {
    try {
      setIsUnBlocking(true);
      await unDisableUser(id);
      toast.success("Đã mở khoá cho tài khoản này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUnBlocking(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-1 text-green-700 cursor-pointer">
          <Icon name="LockKeyholeOpen" size={16} />
          <span>Mở tài khoản</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn mở khoá tài khoản người dùng này
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteClass}>
            {isUnBlocking ? <Loader /> : "Xác Nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UnBlockUser;
