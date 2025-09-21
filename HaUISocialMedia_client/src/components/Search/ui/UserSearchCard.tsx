import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import CustomButtonFriend from "@/components/Relationship/CustomButtonFriend";
import { Button } from "@/components/ui/button";
import Icon from "@/components/shared/Icon";
import MutualFriends from "@/components/User/ui/MutualFriend";
type Props = {
  user: IUser | any;
};
type RelationshipType = {
  type: "IsFriend" | "IsSend" | "IsAccept" | "None" | "";
  title: string;
  handleFn: any;
  message: string;
  id: string;
};

const UserSearchCard = ({ user }: Props) => {
  const [relationship, setRelationship] = useState<RelationshipType>({
    type: "",
    title: "",
    handleFn: () => {},
    message: "",
    id: "",
  });
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const navigate = useNavigate();
  const currentUser = LocalStorage.getLoggedInUser();
  const { relationshipStore } = useStore();
  const { acceptFriend, unFriend, addFriend, unAcceptFriend } =
    relationshipStore;
  const handleCheckFriend = () => {
    if (user?.relationshipDto) {
      if (user.relationshipDto.state) {
        setRelationship((prev) => ({
          ...prev,
          type: "IsFriend",
          title: "Bạn bè",
          message: "Đã huỷ kết bạn",
          handleFn: unFriend,
          id: user.relationshipDto.id,
        }));
      } else {
        if (user.relationshipDto.requestSender.id === currentUser?.id) {
          setRelationship((prev) => ({
            ...prev,
            type: "IsSend",
            title: "Đã gửi lời mời",
            message: "Thêm bạn bè",
            handleFn: () => {},
            id: user.relationshipDto.id,
          }));
        } else {
          setRelationship((prev) => ({
            ...prev,
            type: "IsAccept",
            title: "Chấp nhận",
            message: "Bạn bè",
            handleFn: acceptFriend,
            id: user.relationshipDto.id,
          }));
        }
      }
    } else {
      setRelationship((prev) => ({
        ...prev,
        type: "None",
        title: "Thêm bạn bè",
        message: "Đã gửi lời mời",
        handleFn: addFriend,
        id: user?.id,
      }));
    }
  };

  const handleCheckIsCurrentUser = () => {
    if (user?.id === currentUser?.id) setIsCurrentUser(true);
    else setIsCurrentUser(false);
  };
  useEffect(() => {
    handleCheckFriend();
    handleCheckIsCurrentUser();
  }, [user]);
  const handleNavigate = () => {
    navigate(`/profile/${user?.id}`);
    window.location.href = `/profile/${user?.id}`;
  };
  return (
    <div className={`cursor-pointer bg-white px-5 py-3`}>
      <div className={`flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || "/person.jpg"}
            alt="avatar"
            className="size-16 object-cover rounded-full ring-1"
          />
          <div className="flex flex-col gap-2">
            <p
              className="font-semibold cursor-pointer hover:underline"
              onClick={handleNavigate}
            >
              {user?.lastName} {user?.firstName}
            </p>
            {user?.mutualFriends?.length > 0 && (
              <MutualFriends mutualFriends={user?.mutualFriends} />
            )}
          </div>
        </div>

        <div>
          {isCurrentUser ? (
            <div
              className="px-4 py-2 rounded-lg text-black border border-blue-600 cursor-pointer"
              onClick={handleNavigate}
            >
              Trang cá nhân
            </div>
          ) : (
            <>
              {relationship.type === "IsFriend" && (
                <div
                  className="px-4 py-2 rounded-lg text-black border border-blue-600 cursor-pointer"
                  onClick={handleNavigate}
                >
                  Trang cá nhân
                </div>
              )}

              {relationship.type === "IsSend" && (
                <div className="flex gap-2 items-center">
                  <CustomButtonFriend
                    icon="UserMinus"
                    title="Huỷ gửi lời mời"
                    message="Đã huỷ mời mời"
                    id={relationship.id}
                    handleFn={unAcceptFriend}
                    isSecondary
                  />
                  <Button className=" flex gap-2 items-center cursor-text opacity-60">
                    {" "}
                    <Icon name="UserPlus" />
                    {relationship.title}
                  </Button>
                </div>
              )}
              {relationship.type === "IsAccept" && (
                <div className="flex gap-2 items-center">
                  <CustomButtonFriend
                    isSecondary
                    title="Từ chối"
                    message="Đã từ chối"
                    id={relationship.id}
                    handleFn={unAcceptFriend}
                  />
                  <CustomButtonFriend {...relationship} icon="UserRoundCheck" />
                </div>
              )}
              {relationship.type === "None" && (
                <div className="flex gap-2 items-center">
                  <CustomButtonFriend {...relationship} icon="UserPlus" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearchCard;
