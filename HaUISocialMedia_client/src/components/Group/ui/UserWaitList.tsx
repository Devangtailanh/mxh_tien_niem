import { useGetAllData } from "@/lib";
import { useStore } from "@/stores";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import CustomButtonGroup from "./CustomButtonGroup";
import Icon from "@/components/shared/Icon";
import NoData from "@/components/shared/NoData";

const UserWaitList = () => {
  const navigate = useNavigate();

  const { groupId } = useParams();
  const { groupStore } = useStore();
  const { getAllWait, cancelRequestJoin, approveRequestJoin } = groupStore;
  const { res: data, isLoading } = useGetAllData({
    getRequest: getAllWait,
    requestId: groupId,
  });

  const handleNavigateProfile = (id: string) => {
    navigate(`/profile/${id}`);
    window.location.href = `/profile/${id}`;
  };
  return (
    <Dialog>
      <DialogTrigger className="outline-none">
        <div className="flex gap-3 items-center bg-slate-200 cursor-pointer  p-2 max-w-max justify-center rounded-md">
          <Icon name="CheckCheck" />
          <span className="">Duyệt thành viên</span>
        </div>
      </DialogTrigger>
      <DialogContent className="mt-10 max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">Duyệt thành viên</DialogTitle>
          <DialogDescription>
            Cho phép người dùng khác tham gia nhóm
          </DialogDescription>
        </DialogHeader>
        {!data || data?.length === 0 ? (
          <NoData title="Chưa có yêu cầu nào" style="w-[80px] h-[80px]" />
        ) : (
          <div className="flex flex-col gap-5">
            {data.map((d) => (
              <div className="flex flex-1 justify-between" key={d?.id}>
                <div className="flex gap-2 items-center">
                  <img
                    src={d?.user?.avatar || "/person.jpg"}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span
                    onClick={() => handleNavigateProfile(d?.user.id)}
                    className="cursor-pointer small-medium"
                  >
                    {d?.user?.lastName} {d?.user?.firstName}
                  </span>
                </div>
                <div className="flex gap-2">
                  <CustomButtonGroup
                    message="Đã từ chối"
                    handleFn={cancelRequestJoin}
                    id={d?.id}
                    style="text-red-500"
                    variant="outline"
                  >
                    <X />
                  </CustomButtonGroup>

                  <CustomButtonGroup
                    message="Đã chấp nhận"
                    handleFn={approveRequestJoin}
                    id={d?.id}
                    style="bg-green-600"
                  >
                    <Check />
                  </CustomButtonGroup>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserWaitList;
