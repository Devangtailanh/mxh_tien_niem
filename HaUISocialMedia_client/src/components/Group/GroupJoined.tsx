import { useGetAllData } from "@/lib";
import LocalStorageService from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import GroupCard from "./ui/GroupCard";
import NoData from "../shared/NoData";
import GroupCardSkeleton from "./ui/GroupCardSkeleton";

const GroupJoined = () => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const { groupStore } = useStore();
  const { getAllJoinedGroupOfUser } = groupStore;
  const { res: groups, isLoading } = useGetAllData({
    getRequest: getAllJoinedGroupOfUser,
    requestId: currentUser?.id,
  });

  return (
    <div className=" mt-5 p-5 mx-auto">
      <div>
        <h2 className="h3-bold my-5 capitalize ">Nhóm đã tham gia</h2>
        {isLoading ? (
          <GroupCardSkeleton />
        ) : (
          <>
            {!groups || groups.length === 0 ? (
              <NoData
                title="Chưa tham gia nhóm nào"
                style="h-[80px] w-[80px]"
              />
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {groups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupJoined;
