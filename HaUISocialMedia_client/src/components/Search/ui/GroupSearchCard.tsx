import { Link } from "react-router-dom";
import DeleteGroup from "../../Group/ui/DeleteGroup";
import {
  handleCheckUserIsAdmin,
  handleCheckUserJoinedGroup,
} from "@/lib/utils";
import CustomButtonGroup from "../../Group/ui/CustomButtonGroup";
import { useStore } from "@/stores";
import LeaveGroup from "../../Group/ui/LeaveGroup";
import { useEffect, useState } from "react";
import Icon from "@/components/shared/Icon";

type Props = {
  group: any;
};

const GroupSearchCard = ({ group }: Props) => {
  const isAdmin = handleCheckUserIsAdmin(group);
  const { groupStore } = useStore();
  const { joinGroup } = groupStore;

  const [statusJoinGroup, setStatusJoinGroup] = useState({ type: "" });

  const checkIsSendRequestJoindedGroup = () => {
    if (group?.relationship !== null) {
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
    <div className="w-full flex  bg-white p-5 rounded-md ">
      <div>
        <img
          src={group?.backGroundImage || "/bg-haui-jpg"}
          alt="group-img"
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>
      <div className="flex flex-1 flex-col justify-start mx-2">
        <p className="small-medium max-w-[300px]  capitalize">{group?.name}</p>
        <p className="small-normal  max-h-[100px]  max-w-[300px] text-wrap my-1 overflow-hidden">
          {group?.description}
        </p>
        <p>
          Thành viên: <span>{group?.userJoins?.length || 0}</span>
        </p>
      </div>

      {isAdmin ? (
        <div className="flex items-center gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="flex items-center gap-2 bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 p-2  text-center rounded-md text-[12px]"
          >
            <Icon name="Eye" />
            Xem Nhóm
          </Link>

          <DeleteGroup isDetail id={group?.id} />
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-4">
          <Link
            to={`/group/${group.id}`}
            className="flex items-center gap-2 bg-blue-100 font-medium hover:bg-opacity-80 text-blue-700 p-2  text-center rounded-md text-[12px]"
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

export default GroupSearchCard;
