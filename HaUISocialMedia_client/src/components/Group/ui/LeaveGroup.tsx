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

import { useStore } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  id: string;
  isDetail?: boolean;
};
const LeaveGroup = ({ id }: Props) => {
  const navigate = useNavigate();
  const { groupStore } = useStore();
  const [isLeaving, setIsLeaving] = useState(false);
  const { leaveGroup } = groupStore;

  const handleDeleteGroup = async () => {
    try {
      setIsLeaving(true);
      await leaveGroup(id);
      toast.success("Đã thoát nhóm  này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLeaving(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="gap-2 flex-1 text-center justify-center bg-red-500 text-white cursor-pointer flex items-center p-2  rounded-md">
          <Icon name="LogOut" />
          <span className="text-[12px] w-full">Rời Nhóm</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn rời nhóm này
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thể xem nhóm sau khi thực hiện hành động này
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteGroup}>
            {isLeaving ? <Loader /> : "Thoát Nhóm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default LeaveGroup;
