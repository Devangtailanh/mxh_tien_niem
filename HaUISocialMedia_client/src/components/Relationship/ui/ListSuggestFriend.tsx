import NoData from "@/components/shared/NoData";
import { IUser } from "@/types";
import CustomButtonFriend from "../CustomButtonFriend";
import { useStore } from "@/stores";
import MutualFriends from "@/components/User/ui/MutualFriend";

type Props = {
  suggestFriends: any;
};
const ListSuggestFriend = ({ suggestFriends }: Props) => {
  const { relationshipStore } = useStore();

  const { addFriend } = relationshipStore;
  return (
    <div className=" grid grid-cols-4 gap-5 my-10">
      {!suggestFriends || suggestFriends.length === 0 ? (
        <NoData title="Chưa có bạn bè gợi ý" style="h-[100px] w-[100px]" />
      ) : (
        suggestFriends.map((friend: IUser) => (
          <div
            key={friend?.id}
            className="cursor-pointer flex  gap-5 pb-5 bg-blue-2 rounded-xl w-full"
          >
            <div className="flex flex-col gap-3 justify-between flex-1 ">
              <div
                className="rounded-xl space-y-2 overflow-hidden"
                onClick={() =>
                  (window.location.href = `/profile/${friend?.id}`)
                }
              >
                <img
                  src={friend.avatar || "/person.jpg"}
                  alt="avatar"
                  className="w-full h-[200px] object-cover "
                />
                <p
                  className=" font-bold px-5"
                  onClick={() =>
                    (window.location.href = `/profile/${friend?.id}`)
                  }
                >
                  {friend.lastName} {friend.firstName}
                </p>
              </div>

              <div className="px-5">
                {friend?.mutualFriends?.length > 0 && (
                  <MutualFriends mutualFriends={friend?.mutualFriends} />
                )}
              </div>

              <div className="w-full px-5 ">
                <CustomButtonFriend
                  icon="UserPlus"
                  handleFn={addFriend}
                  title="Thêm bạn bè"
                  message="Đã gửi lời mời"
                  id={friend.id}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListSuggestFriend;
