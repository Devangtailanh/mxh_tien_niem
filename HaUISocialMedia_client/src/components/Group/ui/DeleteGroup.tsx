import Icon from "@/components/shared/Icon";
import Loader from "@/components/shared/Loader";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  id: string;
  isDetail?: boolean;
};
const DeleteGroup = ({ id, isDetail }: Props) => {
  const navigate = useNavigate();
  const { groupStore } = useStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteGroup } = groupStore;

  const handleDeleteGroup = async () => {
    try {
      setIsDeleting(true);
      await deleteGroup(id);
      toast.success("Đã xoá nhóm  này");
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
        {isDetail ? (
          <div className="text-red-600 cursor-pointer flex items-center gap-3  border p-2 w-1/3 justify-center rounded-md min-w-max">
            <Icon name="CircleX" size={16} />
            <span className="">Xoá Nhóm</span>
          </div>
        ) : (
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="outline-none"
          >
            <div className="flex items-center gap-2 text-red-600 cursor-pointer max-w-max">
              <Icon name="CircleX" size={16} />
              <span className="">Xoá Nhóm</span>
            </div>
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn xoá nhóm này
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thế khôi phục lại nhóm sau khi thực hiện hành động này
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteGroup}>
            {isDeleting ? <Loader /> : "Xoá"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteGroup;
