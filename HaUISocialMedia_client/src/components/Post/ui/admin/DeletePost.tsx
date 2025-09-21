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
import Loader from "@/components/shared/Loader";
import Icon from "@/components/shared/Icon";
type Props = {
  id: string;
};
const DeletePost = ({ id }: Props) => {
  const navigate = useNavigate();
  const { postStore } = useStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { deletePost } = postStore;

  const handleDeleteClass = async () => {
    try {
      setIsDeleting(true);
      await deletePost(id);
      toast.success("Đã xoá bài viết này");
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
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-1 text-red-600 cursor-pointer">
          <Icon name="X" size={16} />
          <span className="">Xoá</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xoá</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thể khôi phục bài viết này sau khi xoá
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteClass}>
            {isDeleting ? <Loader /> : "Xoá"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeletePost;
