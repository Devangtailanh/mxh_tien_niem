import Loader from "@/components/shared/Loader";
import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
import { Button } from "@/components/ui/button";
import { SearchObjectType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/stores";
import useGetData from "@/lib";
import SidebarFriendPage from "@/components/Relationship/SidebarFriendPage";
import ListFriend from "./ui/ListFriend";
import { Input } from "../ui/input";

const FriendPage = () => {
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 100,
  });
  const { relationshipStore } = useStore();
  const { getCurrentFriend } = relationshipStore;
  const {
    ref,
    res: friends,
    resSearch,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getCurrentFriend,
    paging: paging,
    setPaging: setPaging,
  });

  const handleSearch = () => {
    setPaging((prev) => ({
      ...prev,
      keyWord: search,
      pageIndex: 1,
      pageSize: 100,
    }));
  };
  return (
    <div className="grid grid-cols-[1fr_3fr] mt-2">
      <SidebarFriendPage />
      <div className="flex flex-col gap-10 mx-5">
        <div className="flex-1 p-5">
          <div className="mb-5">
            <h3 className="h3-bold mb-5">Danh sách bạn bè</h3>
            <div className="hidden items-center bg-white max-w-max  rounded-xl">
              <Input
                type="text"
                placeholder="Tìm bạn bè..."
                onChange={(e) => setSearch(e.target.value)}
                className="border-blue-500 rounded-none rounded-l-md"
              />
              <Button
                onClick={handleSearch}
                className="rounded-none rounded-r-md border border-blue-500"
                disabled={search.length === 0}
              >
                <Search />
              </Button>
            </div>
          </div>
          {isLoading && (
            <FriendListSkeleton
              length={12}
              styles="grid grid-cols-4 gap-5 my-10"
            />
          )}

          {!isLoading && (
            <ListFriend friends={search.length === 0 ? friends : resSearch} />
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

export default FriendPage;
