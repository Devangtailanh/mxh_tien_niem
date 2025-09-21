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

import React, { ReactNode } from "react";
type DeleteProps = {
  children: ReactNode;
  handleDelete: () => void;
  isDisable: boolean;
};
const Delete = ({ children, handleDelete, isDisable }: DeleteProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.stopPropagation()
        }
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Bạn có chắc muốn xoá?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thế khôi phục lại bài viết.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDisable}
            className="bg-red-600 hover:bg-red-500 text-white "
            onClick={handleDelete}
          >
            Xoá
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
