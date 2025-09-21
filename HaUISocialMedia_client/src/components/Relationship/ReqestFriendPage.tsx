import CustomButtonFriend from "./CustomButtonFriend";
import Loader from "@/components/shared/Loader";
import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
import useGetData from "@/lib";
import { useStore } from "@/stores";
import { SearchObjectType } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarFriendPage from "./SidebarFriendPage";
import NoData from "../shared/NoData";
import MutualFriends from "../User/ui/MutualFriend";

export type requestFriendsPagination = {
  pageIndex: number;
  pageSize: number;
};

const RequestFriendPage = () => {
  const navigate = useNavigate();
  const { relationshipStore } = useStore();
  const { getPendingFriendRequests, acceptFriend, unAcceptFriend } =
    relationshipStore;
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 100,
  });

  const {
    ref,
    res: requestFriends,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getPendingFriendRequests,
    paging: paging,
    setPaging: setPaging,
  });
  return (
    <div className="grid grid-cols-[1fr_3fr] mt-2">
      <SidebarFriendPage />
      <div className="flex flex-col gap-10 mx-5">
        <div className="flex-1 p-5">
          <div className="mb-5">
            <h3 className="h3-bold mb-5">Danh sách lời mời kết bạn</h3>
          </div>
          {isLoading && (
            <FriendListSkeleton
              length={12}
              styles="grid grid-cols-4 gap-5 my-10"
            />
          )}
          {!isLoading && (
            <>
              {!requestFriends || requestFriends.length === 0 ? (
                <NoData
                  title="Không có lời mời kết bạn nào"
                  style="h-[100px] w-[100px]"
                />
              ) : (
                <div className="grid grid-cols-4 gap-5 my-10">
                  {requestFriends.map((friend: any) => (
                    <div
                      key={friend.id}
                      className="flex  gap-5 pb-5 bg-white  rounded-xl cursor-pointer"
                    >
                      <div className="flex flex-col gap-5 justify-between flex-1">
                        <div
                          className="rounded-xl space-y-2 overflow-hidden"
                          onClick={() =>
                            navigate(`/profile/${friend.requestSender.id}`)
                          }
                        >
                          <img
                            src={friend?.requestSender?.avatar || "/person.jpg"}
                            alt="avatar"
                            className="w-full h-[200px] object-cover "
                          />
                          <p className=" font-medium px-5">
                            {friend?.requestSender?.lastName}{" "}
                            {friend?.requestSender?.firstName}
                          </p>
                        </div>

                        <div className=" px-5">
                          {friend?.requestSender?.mutualFriends?.length > 0 && (
                            <MutualFriends
                              mutualFriends={
                                friend?.requestSender?.mutualFriends
                              }
                            />
                          )}
                        </div>

                        <div className="space-y-2 px-5">
                          <CustomButtonFriend
                            icon="UserX"
                            isSecondary
                            handleFn={unAcceptFriend}
                            title="Từ chối"
                            message="Đã từ chối"
                            id={friend.id}
                          />
                          <CustomButtonFriend
                            icon="UserPlus"
                            handleFn={acceptFriend}
                            title="Chấp nhận"
                            message="Đã chấp nhận"
                            id={friend.id}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {showLoadMore && (
            <div ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestFriendPage;
