import { IUser } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import MutualFriends from "../User/ui/MutualFriend";

type Props = {
  friend: IUser | any;
  isShowButton?: boolean;
};

const FriendCard = ({ friend, isShowButton }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${friend.id}`);
    window.location.href = `/profile/${friend.id}`;
  };
  return (
    <div
      onClick={handleNavigate}
      className={`cursor-pointer border border-slate-200 shadow-sm p-2 rounded-md`}
    >
      <div className={`${isShowButton && "flex justify-between "} `}>
        <div className="flex items-center gap-3">
          <img
            src={friend?.avatar || "/person.jpg"}
            alt="avatar"
            className="size-16 rounded-md "
          />
          <div className="space-y-2">
            <p className="font-semibold">
              {friend?.lastName} {friend?.firstName}
            </p>
            <div className="px-5">
              {friend?.mutualFriends?.length > 0 && (
                <MutualFriends mutualFriends={friend?.mutualFriends} />
              )}
            </div>
          </div>
        </div>
        {isShowButton && (
          <Button
            className="text-black bg-transparent border border-primary font-normal"
            onClick={handleNavigate}
          >
            Trang cá nhân
          </Button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
