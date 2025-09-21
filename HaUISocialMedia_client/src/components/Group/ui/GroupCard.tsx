import { Link } from "react-router-dom";
import DeleteGroup from "./DeleteGroup";
import { handleCheckUserIsAdmin } from "@/lib/utils";
import CustomButtonGroup from "./CustomButtonGroup";
import { useStore } from "@/stores";
import LeaveGroup from "./LeaveGroup";
import { useEffect, useState } from "react";
import Icon from "@/components/shared/Icon";

type Props = {
  group: any;
};

const GroupCard = ({ group }: Props) => {
  const isAdmin = handleCheckUserIsAdmin(group);
  const { groupStore } = useStore();
  const { joinGroup } = groupStore;

  const [statusJoinGroup, setStatusJoinGroup] = useState({ type: "" });

  const checkIsSendRequestJoindedGroup = () => {
    if (group?.relationship) {
      if (!group.relationship?.approved) setStatusJoinGroup({ type: "IsSend" });
      else setStatusJoinGroup({ type: "IsJoin" });
    } else {
      setStatusJoinGroup({ type: "NoSend" });
    }
  };

  useEffect(() => {
    checkIsSendRequestJoindedGroup();
  }, [group]);
  return (
    <div className="basis-1/3 flex flex-col bg-white p-5 rounded-md ">
      <div className="flex gap-3">
        <img
          src={group?.backGroundImage || "/bg-haui-jpg"}
          alt="group-img"
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col justify-start space-y-2">
          <p className="small-medium max-w-[400px] text-wrap capitalize">
            {group?.name}
          </p>
          <p>
            Thành viên: <span>{group?.userJoins?.length}</span>
          </p>
        </div>
      </div>

      {isAdmin ? (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="flex items-center justify-center gap-3 bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 py-2 w-2/3 text-center rounded-md"
          >
            <Icon name="Eye" />
            Xem Nhóm
          </Link>

          <DeleteGroup isDetail id={group?.id} />
        </div>
      ) : (
        <div className="flex gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="flex items-center justify-center gap-3 bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 py-2 w-2/3 text-center rounded-md"
          >
            <Icon name="Eye" />
            Xem Nhóm
          </Link>

          {statusJoinGroup.type === "IsJoin" && <LeaveGroup id={group?.id} />}
          {statusJoinGroup.type === "IsSend" && (
            <CustomButtonGroup
              icon="CirclePlus"
              message="Đã yêu cầu tham gia"
              handleFn={joinGroup}
              id={group?.id}
              style="border border-green-500 text-green-600"
              variant="outline"
              isDisable
            >
              Đã Gửi Yêu Cầu
            </CustomButtonGroup>
          )}
          {statusJoinGroup.type === "NoSend" && (
            <CustomButtonGroup
              icon="CirclePlus"
              message="Đã yêu cầu tham gia"
              handleFn={joinGroup}
              id={group?.id}
              style="border border-green-500 text-green-600"
              variant="outline"
            >
              Tham Gia Nhóm
            </CustomButtonGroup>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupCard;
