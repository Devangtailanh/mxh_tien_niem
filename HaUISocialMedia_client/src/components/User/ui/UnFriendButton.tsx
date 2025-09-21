import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";

type Props = {
  id: string;
};
const UnFriendButton = ({ id }: Props) => {
  const navigate = useNavigate();
  const { relationshipStore } = useStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { unFriend } = relationshipStore;

  const handleUnFriend = async () => {
    try {
      setIsDeleting(true);
      await unFriend(id);
      toast.success("Đã huỷ kết bạn");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="right-0">
        <span className="text-red-600 cursor-pointer p-2">Huỷ kết bạn</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn huỷ kết bạn</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thế nhận các thông tin về người dùng này sau khi thực hiện
            hành động
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleUnFriend}>
            {isDeleting ? <Loader /> : "Huỷ kết bạn"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UnFriendButton;
