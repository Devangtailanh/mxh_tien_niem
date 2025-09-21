import { useState } from "react";

import { IUser, SearchObjectType } from "@/types";

import Loader from "../shared/Loader";
import FriendCard from "../shared/FriendCard";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import { useStore } from "@/stores";
import { useGetDataByUserId } from "@/lib";
import NoData from "../shared/NoData";

type PagingType = {
  pageIndex: number;
  pageSize: number;
};
type Props = {
  profileId: string;
};

const FriendOfUser = ({ profileId }: Props) => {
  const { relationshipStore } = useStore();
  const { getFriendOfUser } = relationshipStore;
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 200,
  });
  const {
    ref,
    res: friends,
    isLoading,
    showLoadMore,
  } = useGetDataByUserId({
    getRequest: getFriendOfUser,
    paging: paging,
    setPaging: setPaging,
    userId: profileId,
  });

  return (
    <div className="bg-white p-3 rounded-md">
      {isLoading && (
        <FriendListSkeleton length={4} styles="grid grid-cols-2 gap-3" />
      )}
      {!isLoading && (
        <>
          {!friends || friends.length === 0 ? (
            <NoData title="Chưa có bạn bè nào" style="h-[100px] w-[100px]" />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {friends.map((friends) => (
                <FriendCard key={friends.id} friend={friends} />
              ))}
            </div>
          )}{" "}
        </>
      )}
      {showLoadMore && (
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default FriendOfUser;
