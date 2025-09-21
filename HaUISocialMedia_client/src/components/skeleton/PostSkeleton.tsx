import { Skeleton } from "@/components/ui/skeleton";

function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 my-4 text-base">
      <div className="relative flex-between">
        <div className="  flex items-center gap-3">
          <div className="profile-photo">
            <Skeleton className="profile-photo rounded-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />

            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      <div className="small-regular lg:base-medium py-5">
        <Skeleton className="h-10" />
      </div>

      <div className="rounded-xl overflow-hidden my-2 gap-2 flex">
        <Skeleton className="post-card_img" />
      </div>

      <Skeleton className="h-8" />
    </div>
  );
}

export default PostSkeleton;
