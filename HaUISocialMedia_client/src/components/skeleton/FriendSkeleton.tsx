import { Skeleton } from "../ui/skeleton";
const FriendSkeleton = () => {
  return (
    <div className="flex items-center gap-2 bg-blue-2 p-2 rounded-lg">
      <Skeleton className="profilePhoto" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default FriendSkeleton;
