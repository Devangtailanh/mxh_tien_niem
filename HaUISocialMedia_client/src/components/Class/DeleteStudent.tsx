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

type Props = {
  id?: string;
};
const DeleteStudent = ({ id }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="text-red-600 cursor-pointer">Xoá</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn muốn xoá sinh viên này
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thế khôi phục lại dữ liệu của sinh viên sau khi thực hiện
            hành động này
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500">Xoá</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteStudent;
