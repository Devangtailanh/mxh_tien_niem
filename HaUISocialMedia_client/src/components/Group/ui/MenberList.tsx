import { useStore } from "@/stores";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CustomButtonGroup from "./CustomButtonGroup";
import { ReactNode, useEffect, useState } from "react";
import { handleCheckUserIsAdmin } from "@/lib/utils";
import LocalStorageService from "@/services/LocalStorageService";

type Props = {
  children: ReactNode;
  group: any;
};
const MenberList = ({ children, group }: Props) => {
  const [isOwner, setIsOwner] = useState(false);
  const isAdmin = handleCheckUserIsAdmin(group);
  const navigate = useNavigate();

  const currentUser = LocalStorageService.getLoggedInUser();

  const { groupStore } = useStore();
  const { dutyAdmin, cancelDutyAdmin, kickMember } = groupStore;

  const handleNavigateProfile = (id: string) => {
    navigate(`/profile/${id}`);
    window.location.href = `/profile/${id}`;
  };

  const handleCheckOwner = () => {
    if (currentUser?.id === group?.user?.id) setIsOwner(true);
    else setIsOwner(false);
  };

  useEffect(() => {
    handleCheckOwner();
  }, [group]);
  return (
    <Dialog>
      <DialogTrigger className="outline-none">{children}</DialogTrigger>
      <DialogContent className="mt-10 max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">Danh sách thành viên</DialogTitle>
        </DialogHeader>
        {!group?.userJoins || group?.userJoins?.length === 0 ? (
          <span>Không có thành vien nào</span>
        ) : (
          <div className="flex flex-col gap-5 overflow-y-auto">
            {group?.userJoins?.map((d: any) => (
              <div className="flex flex-1 justify-between" key={d?.id}>
                <div className="flex gap-2 items-center">
                  <img
                    src={d?.user?.avatar || "/person.jpg"}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <span
                      onClick={() => handleNavigateProfile(d?.user.id)}
                      className="cursor-pointer small-medium"
                    >
                      {d?.user?.lastName} {d?.user?.firstName}
                    </span>
                    <small>{d.role === "ADMIN" && "Quản trị viên"}</small>
                  </div>
                </div>

                {d?.user?.id !== group?.user?.id && (
                  <>
                    {isAdmin && d?.user?.id !== currentUser?.id && (
                      <div className="flex gap-2">
                        {d.role === "ADMIN" ? (
                          <CustomButtonGroup
                            icon="Ban"
                            message="Đã huỷ quyền quản trị"
                            handleFn={cancelDutyAdmin}
                            id={d?.id}
                            style="bg-yellow-600"
                          >
                            Huỷ quyền
                          </CustomButtonGroup>
                        ) : (
                          <CustomButtonGroup
                            icon="Plus"
                            message="Đã phân quyền quản trị"
                            handleFn={dutyAdmin}
                            id={d?.id}
                            style="bg-green-500"
                          >
                            Quản trị
                          </CustomButtonGroup>
                        )}

                        <CustomButtonGroup
                          icon="X"
                          message="Đã xoá thành viên"
                          handleFn={kickMember}
                          id={d?.id}
                          style="text-red-500"
                          variant="outline"
                        >
                          Xoá thành viên
                        </CustomButtonGroup>
                      </div>
                    )}
                  </>
                )}

                {!isAdmin && (
                  <div className="flex gap-2">
                    <Link
                      to={`/profile/${d?.user?.id}`}
                      className="flex gap-2 px-3 justify-center bg-blue-200 text-blue-700 py-2 mt-5 rounded-md hover:bg-blue-100 font-semibold"
                    >
                      Trang Cá Nhân
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MenberList;
