import { Skeleton } from "@/components/ui/skeleton";

const GroupCardSkeleton = () => {
  return (
    <div className={`grid grid-cols-2 gap-5`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-20 " />
      ))}
    </div>
  );
};

export default GroupCardSkeleton;
