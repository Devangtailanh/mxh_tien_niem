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
const DenyResult = ({ id }: Props) => {
  const navigate = useNavigate();
  const { userCourseStore } = useStore();
  const [isDening, setIsDening] = useState(false);
  const { deleteUserCourseById } = userCourseStore;

  const handleDeleteClass = async () => {
    try {
      setIsDening(true);
      await deleteUserCourseById(id);
      toast.success("Đã từ chối duyệt kết quả này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDening(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-1 text-red-600 cursor-pointer">
          <Icon name="X" size={16} />
          <span>Không duyệt</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn không duyệt kết quả này
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDeleteClass}>
            {isDening ? <Loader /> : "Xác Nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DenyResult;
