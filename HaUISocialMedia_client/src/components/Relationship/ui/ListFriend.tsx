import MutualFriends from "@/components/User/ui/MutualFriend";
import Icon from "@/components/shared/Icon";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { useNavigate } from "react-router-dom";

type Props = {
  friends: any;
};
const ListFriend = ({ friends }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      {!friends || friends.length === 0 ? (
        <NoData title="Chưa có bạn bè nào" style="h-[100px] w-[100px]" />
      ) : (
        <div className="grid md:grid-cols-4 gap-3 my-10">
          {friends.map((friend: IUser) => (
            <div
              key={friend.id}
              className="cursor-pointer flex  gap-5 pb-5 bg-blue-2 rounded-xl w-full"
            >
              <div
                className="flex flex-col gap-3 justify-between flex-1"
                onClick={() => navigate(`/profile/${friend.id}`)}
              >
                <div className="rounded-xl space-y-2 overflow-hidden">
                  <img
                    src={friend.avatar || "/person.jpg"}
                    alt="avatar"
                    className="w-full h-[200px] object-cover"
                  />
                  <p className="font-medium px-5">
                    {friend.lastName} {friend.firstName}
                  </p>
                </div>

                <div className="px-5">
                  {friend?.mutualFriends?.length > 0 && (
                    <MutualFriends mutualFriends={friend?.mutualFriends} />
                  )}
                </div>

                <div className="w-full px-5">
                  <Button className="border w-full border-blue-500 bg-transparent text-blue-500  shadow-none flex gap-3 items-center">
                    <Icon name="UserRoundCheck" />
                    Trang cá nhân
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ListFriend;
