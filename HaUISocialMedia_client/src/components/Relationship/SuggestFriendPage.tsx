import { SearchObjectType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import Loader from "@/components/shared/Loader";
import FriendListSkeleton from "@/components/skeleton/FriendListSkeleton";
import useGetData from "@/lib";
import { useStore } from "@/stores";
import SidebarFriendPage from "./SidebarFriendPage";
import { Button } from "../ui/button";
import ListSuggestFriend from "./ui/ListSuggestFriend";
import { Input } from "../ui/input";

const SuggestFriendPage = () => {
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 100,
  });

  const { relationshipStore } = useStore();

  const { getSuggestFriend } = relationshipStore;
  const {
    ref,
    res: suggestFriends,
    resSearch,
    isLoading,
    showLoadMore,
  } = useGetData({
    getRequest: getSuggestFriend,
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
            <h3 className="h3-bold mb-5">Danh sách gợi ý</h3>
            <div className="items-center bg-white max-w-max rounded-xl hidden">
              <Input
                type="text"
                placeholder="Tìm bạn bè..."
                className="border-blue-500 rounded-none rounded-l-md"
                onChange={(e) => setSearch(e.target.value)}
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
              length={8}
              styles="grid grid-cols-4 gap-5 my-10"
            />
          )}

          {!isLoading && (
            <ListSuggestFriend
              suggestFriends={search.length === 0 ? suggestFriends : resSearch}
            />
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

export default SuggestFriendPage;
