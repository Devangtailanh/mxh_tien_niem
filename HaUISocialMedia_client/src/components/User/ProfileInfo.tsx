import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import UpdateResult from "../CourseResult/UpdateResult";
import ProfileInfoSkeletion from "../skeleton/ProfileInfoSkeletion";
import LocalStorage from "@/services/LocalStorageService";
import { memo, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";
import CustomButtonFriend from "../Relationship/CustomButtonFriend";
import FriendDropdown from "./ui/FrienDropDown";
import UpdateBackgroupImg from "./ui/UpdateBackgroupImg";
import Icon from "../shared/Icon";
import MutualFriends from "./ui/MutualFriend";
import { Tab, Tabs } from "@mui/material";
import "./ProfileStyle.scss";
import TabList from "@mui/lab/TabList";
import EditUserModal from "./ui/EditUserModal";
type Props = {
  userProfile: any;
  isLoading: boolean;
  handleChangeTab: any;
  profileTab: string;
};
type RelationshipType = {
  type: "IsFriend" | "IsSend" | "IsAccept" | "None" | "";
  title: string;
  handleFn: any;
  message: string;
  id: string;
};
function ProfileInfo({ userProfile, isLoading, handleChangeTab }: Props) {
  const { profileId } = useParams();

  const [relationship, setRelationship] = useState<RelationshipType>({
    type: "",
    title: "",
    handleFn: () => {},
    message: "",
    id: "",
  });
  const { relationshipStore } = useStore();
  const { acceptFriend, unFriend, addFriend, unAcceptFriend } =
    relationshipStore;
  const navigate = useNavigate();
  const currentUser = LocalStorage.getLoggedInUser();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const handleCheckIsCurrentUser = () => {
    if (userProfile?.id === currentUser?.id) setIsCurrentUser(true);
    else setIsCurrentUser(false);
  };
  const handleCheckFriend = () => {
    if (userProfile?.relationshipDto) {
      if (userProfile.relationshipDto.state) {
        setRelationship((prev) => ({
          ...prev,
          type: "IsFriend",
          title: "Bạn bè",
          message: "Đã huỷ kết bạn",
          handleFn: unFriend,
          id: userProfile.relationshipDto.id,
        }));
      } else {
        if (userProfile.relationshipDto.requestSender.id === currentUser?.id) {
          setRelationship((prev) => ({
            ...prev,
            type: "IsSend",
            title: "Đã gửi lời mời",
            message: "Thêm bạn bè",
            handleFn: () => {},
            id: userProfile.relationshipDto.id,
          }));
        } else {
          setRelationship((prev) => ({
            ...prev,
            type: "IsAccept",
            title: "Chấp nhận",
            message: "Bạn bè",
            handleFn: acceptFriend,
            id: userProfile.relationshipDto.id,
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
        id: userProfile?.id,
      }));
    }
  };

  useEffect(() => {
    handleCheckFriend();
    handleCheckIsCurrentUser();
  }, [userProfile, profileId]);

  if (isLoading) return <ProfileInfoSkeletion />;

  return (
    <div className="flex flex-col">
      <div className="w-full h-[250px] relative">
        <img
          src={userProfile?.background || "/bg-haui.jpg"}
          alt="image"
          className="w-full h-full object-cover"
        />
        {isCurrentUser && (
          <div className="absolute bottom-2  right-2">
            <UpdateBackgroupImg
              backgroundImg={userProfile?.background || "/bg-haui.jpg"}
            />
          </div>
        )}
      </div>

      <div
        className="bg-white h-fit px-4 pt-4 pb-0"
        style={{
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <div className="flex justify-between items-center  pb-5">
          <div className="flex items-center gap-2 -mt-14">
            <div className="z-10">
              <img
                src={userProfile?.avatar || "/person.jpg"}
                alt="avartar"
                className=" w-36 h-36 object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[28px] font-bold">
                {userProfile?.lastName} {userProfile?.firstName}
              </p>
              {!isCurrentUser && userProfile?.mutualFriends?.length > 0 && (
                <MutualFriends mutualFriends={userProfile?.mutualFriends} />
              )}
            </div>
          </div>
          {currentUser?.id === userProfile?.id ? (
            <div className="flex items-center gap-3">
              <UpdateResult>
                <div className="flex items-center gap-2 cursor-pointer bg-blue-2 px-3 py-2 font-medium rounded-md">
                  <Icon name="BookOpen" size={16} />
                  <span className="">Cập nhật thành tích học tập</span>
                </div>
              </UpdateResult>

              <EditUserModal>
                <div className="flex gap-2 items-center text-[15px] bg-blue-500 p-2 rounded-md text-white cursor-pointer">
                  <Icon name="Pencil" size={16} />
                  <span>Cập nhật thông tin</span>
                </div>
              </EditUserModal>
            </div>
          ) : (
            <>
              {relationship.type === "IsFriend" && (
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 items-center px-3 py-2 rounded-lg text-white bg-blue-500">
                    <Icon name="UserCheck" />
                    Bạn bè
                  </div>
                  <FriendDropdown friend={userProfile} />
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
                  <Button className=" flex gap-2 items-center cursor-text opacity-70">
                    {" "}
                    <Icon name="UserPlus" />
                    {relationship.title}
                  </Button>
                </div>
              )}
              {relationship.type === "IsAccept" && (
                <div className="flex gap-2 items-center">
                  <CustomButtonFriend
                    icon="UserX"
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

        {/* tab like facebook */}
        <div className="flex w-100 profileTabSection">
          <TabList onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="Bảng tin" className="tabStyle" value="0" />
            <Tab label="Bạn bè" className="tabStyle" value="1" />
            <Tab label="Thành tích" className="tabStyle" value="2" />
          </TabList>
        </div>
      </div>
    </div>
  );
}

export default memo(observer(ProfileInfo));
