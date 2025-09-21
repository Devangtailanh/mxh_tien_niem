import FriendResquest from "../Relationship/FriendResquest";
import { useState } from "react";

import { Loader } from "lucide-react";
import { IUser, SearchObjectType } from "@/types";
import { Link } from "react-router-dom";

import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import useGetData from "@/lib";
import { useStore } from "@/stores";
import NoData from "../shared/NoData";
import MutualFriends from "../User/ui/MutualFriend";

const RightSidebar = () => {
  const { relationshipStore } = useStore();
  const { getCurrentFriend } = relationshipStore;
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 100,
  });

  const {
    ref,
    res: friends,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getCurrentFriend,
    paging: paging,
    setPaging: setPaging,
  });

  return (
    <div className="sticky top-[6rem] h-max bottom-0 ">
      <FriendResquest />
      <div className="mt-3">
        <h2 className="text-body-medium mb-2">Bạn bè</h2>

        {isLoading ? (
          <FriendListSkeleton length={5} styles="flex flex-col gap-2" />
        ) : (
          <>
            {!friends || friends.length === 0 ? (
              <NoData title="Chưa có bạn bè nào" style="h-[80px] w-[80px]" />
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  {friends.map((friend: IUser) => (
                    <Link
                      to={`/profile/${friend.id}`}
                      className="flex items-center gap-2 bg-blue-2 p-2 rounded-lg"
                      key={friend.id}
                    >
                      <img
                        src={friend.avatar || "/person.jpg"}
                        alt="profile-img"
                        className="size-14 rounded-full object-cover"
                      />
                      <div className="space-y-1">
                        <p className="base-medium">
                          {friend.lastName} {friend.firstName}
                        </p>
                        <div>
                          {friend?.mutualFriends?.length > 0 && (
                            <MutualFriends
                              mutualFriends={friend?.mutualFriends}
                            />
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {showLoadMore && (
              <div ref={ref}>
                <Loader />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
