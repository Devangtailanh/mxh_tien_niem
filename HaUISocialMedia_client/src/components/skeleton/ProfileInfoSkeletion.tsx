import { Skeleton } from "../ui/skeleton";

const ProfileInfoSkeletion = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[200px]" />

      <div className="bg-white h-fit p-5">
        <div className="flex justify-between items-center  pb-5">
          <div className="flex items-center gap-2 -mt-14">
            <Skeleton className="h-36 w-36 rounded-full bg-blue-2" />
            <div>
              <Skeleton className="w-10 h-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSkeletion;
