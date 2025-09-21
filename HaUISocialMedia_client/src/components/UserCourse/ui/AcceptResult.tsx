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
const AcceptResult = ({ id }: Props) => {
  const navigate = useNavigate();
  const { userCourseStore } = useStore();
  const [isAccepting, setIsAccepting] = useState(false);
  const { allowUserCourse } = userCourseStore;

  const handleDeleteClass = async () => {
    try {
      setIsAccepting(true);
      await allowUserCourse(id);
      toast.success("Đã duyệt kết quả này");
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAccepting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-1 text-green-600 cursor-pointer">
          <Icon name="Check" size={16} />
          <span>Duyệt kết quả</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn duyệt kết quả này
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-500"
            onClick={handleDeleteClass}
          >
            {isAccepting ? <Loader /> : "Xác Nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AcceptResult;
