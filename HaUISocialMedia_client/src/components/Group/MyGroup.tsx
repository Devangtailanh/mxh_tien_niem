import { useGetAllData } from "@/lib";
import { useStore } from "@/stores";
import GroupCard from "./ui/GroupCard";
import NoData from "../shared/NoData";
import GroupCardSkeleton from "./ui/GroupCardSkeleton";

const MyGroup = () => {
  const { groupStore } = useStore();
  const { getAllGroupUserIsAdmin } = groupStore;
  const { res: dataGroup, isLoading } = useGetAllData({
    getRequest: getAllGroupUserIsAdmin,
  });
  return (
    <div className=" mt-5 p-5 mx-auto">
      <div>
        <h2 className="h3-bold my-5 ">Quản lý nhóm</h2>
        {isLoading ? (
          <GroupCardSkeleton />
        ) : (
          <>
            {!dataGroup || dataGroup.length === 0 ? (
              <NoData
                title="Bạn chưa tạo nào nào"
                style="h-[100px] w-[100px]"
              />
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {dataGroup.map((group) => (
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

export default MyGroup;
