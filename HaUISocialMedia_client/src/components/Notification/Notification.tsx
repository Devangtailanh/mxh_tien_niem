import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NotificationType } from "@/types";
import { useNavigate } from "react-router-dom";
import { multiFormatDateString } from "@/lib/utils";
import FriendListSkeleton from "../skeleton/FriendListSkeleton";
import { useInView } from "react-intersection-observer";
import { useStore } from "@/stores";
import NoData from "../shared/NoData";

const Notification = () => {
  const [lastItem, setLastItem] = useState<any>();
  const endOfListRef = useRef<HTMLDivElement>(null);
  const { notificationStore } = useStore();
  const { getNotification } = notificationStore;
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [paging, setPaging] = useState({
    pageIndex: 1,
    pageSize: 30,
    mileStoneId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const { ref, inView } = useInView();

  const handleGetData = async (paging: any) => {
    setIsLoading(true);
    try {
      const data = await getNotification(paging);
      if (data && data.length > 0) {
        setNotifications((prev) => [...prev, ...data]);
        setLastItem(data[data.length - 1]);
        setShowLoadMore(data.length === paging.pageSize);
      } else setShowLoadMore(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (inView && showLoadMore) {
      const nextPage = paging.pageIndex + 1;
      handleGetData({
        ...paging,
        pageIndex: nextPage,
        mileStoneId: lastItem?.id,
      });
      setPaging((prev) => ({ ...prev, pageIndex: nextPage }));
    }
  }, [inView, showLoadMore]);

  useEffect(() => {
    if (notifications?.length > 0 && endOfListRef?.current) {
      endOfListRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [notifications]);

  const handleNavigateNotification = (notify: NotificationType) => {
    switch (notify?.notificationType.name) {
      case "Group":
        navigate(`/group/${notify.groupDto?.id}`);
        break;
      case "Friend":
        navigate(`/profile/${notify.actor?.id}`);
        break;
      case "Post":
        navigate(`/post/${notify.post?.id}`);
        break;
      default:
        break;
    }
  };

  const handlePopoverOpen = () => {
    setNotifications([]);
    setPaging({ pageIndex: 1, pageSize: 30, mileStoneId: "" });
    handleGetData(paging);
  };

  return (
    <Popover onOpenChange={handlePopoverOpen}>
      <PopoverTrigger>
        <Bell className="hover:text-primary" />
      </PopoverTrigger>
      <PopoverContent className="min-w-[350px] mt-[32px] relative z-10 right-1/3 max-h-[70vh] overflow-y-auto border-none bg-white">
        <div>
          <p className="text-lg mb-2 font-bold">Thông báo</p>
          {isLoading ? (
            <FriendListSkeleton length={5} styles="flex flex-col gap-2" />
          ) : (
            <>
              {(!notifications || notifications?.length === 0) ? (
                <NoData
                  title="Chưa có thông báo nào"
                  style="h-[80px] w-[80px]"
                />
              ) : (
                <div className="flex flex-col gap-2">
                  {notifications?.map((notification: NotificationType) => (
                    <div
                      onClick={() => handleNavigateNotification(notification)}
                      key={notification?.id}
                      className="flex items-center bg-blue-2 p-2 rounded-lg cursor-pointer"
                      ref={
                        paging?.mileStoneId === notification?.id
                          ? endOfListRef
                          : undefined
                      }
                    >
                      <div className="profilePhotoWrapper pr-2">
                        <img
                          className="profile-photo"
                          src={notification?.actor?.avatar || "/person.jpg"}
                          alt="profileImage"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-base-medium">
                          {notification?.content}
                        </p>
                        <span>
                          {multiFormatDateString(
                            notification?.createDate?.toString()
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {showLoadMore && (
            <div ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
