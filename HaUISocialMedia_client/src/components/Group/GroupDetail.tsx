import { useStore } from "@/stores";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupDetailHeader from "./ui/GroupDetailHeader";
import LocalStorageService from "@/services/LocalStorageService";

import GroupContent from "./ui/GroupContent";
import ProfileInfoSkeletion from "../skeleton/ProfileInfoSkeletion";

const GroupDetail = () => {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState<any>();
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const currentUser = LocalStorageService.getLoggedInUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const { groupStore } = useStore();
  const { findById } = groupStore;

  useEffect(() => {
    const getGroup = async () => {
      try {
        setIsLoadingGroup(true);
        const data = await findById(groupId as string);
        setGroupData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingGroup(false);
      }
    };
    getGroup();
  }, []);

  useEffect(() => {
    if (groupData && groupData.user) {
      const checkUserIsAdmin = groupData?.userJoins?.find(
        (menber: any) =>
          menber?.user?.id === currentUser?.id && menber.role === "ADMIN"
      );
      if (checkUserIsAdmin) setIsAdmin(true);
      else setIsAdmin(false);
    }
  }, [groupData]);

  if (isLoadingGroup) return <ProfileInfoSkeletion />;

  return (
    <div className="w-full flex flex-col ">
      <GroupDetailHeader group={groupData} isAdmin={isAdmin} />
      <GroupContent group={groupData} />
    </div>
  );
};

export default GroupDetail;
