import { Skeleton } from "@/components/ui/skeleton";
import GroupSearchCard from "./GroupSearchCard";

type PostListProps = {
  groups: any;
  isLoading?: boolean;
  isError?: boolean;
};

const LoadingGroup = () => {
  return (
    <div>
      {"1234567".split("").map((i) => (
        <Skeleton className="w-full h-100 rounded-lg" key={i} />
      ))}
    </div>
  );
};

const GroupListSearch = ({ groups, isLoading, isError }: PostListProps) => {
  if (isLoading) return <LoadingGroup />;
  if (isError)
    return <span className="text-red-500 text-center">Có lỗi xảy ra</span>;
  return (
    <div className="">
      {groups?.map((group: any) => (
        <GroupSearchCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupListSearch;
