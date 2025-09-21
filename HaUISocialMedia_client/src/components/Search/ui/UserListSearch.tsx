import { Skeleton } from "@/components/ui/skeleton";

import UserSearchCard from "./UserSearchCard";

type PostListProps = {
  users: any;
  isLoading?: boolean;
  isError?: boolean;
};

const LoadingUsers = () => {
  return (
    <div className="flex gap-4 flex-col mt-5">
      {"1234567".split("").map((i) => (
        <Skeleton className="w-full h-20 rounded-lg" key={i} />
      ))}
    </div>
  );
};

const UserListSearch = ({ users, isLoading, isError }: PostListProps) => {
  if (isLoading) return <LoadingUsers />;
  if (isError)
    return <span className="text-red-500 text-center">Có lỗi xảy ra</span>;
  return (
    <div className="mt-5 flex flex-col gap-5">
      {users?.map((user: any) => (
        <UserSearchCard key={user?.id} user={user} />
      ))}
    </div>
  );
};

export default UserListSearch;
