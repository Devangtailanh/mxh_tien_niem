import ProfileInfo from "@/components/User/ProfileInfo";
import { memo, useEffect, useState } from "react";
import { IUser } from "@/types";
import { useParams } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import { useStore } from "@/stores";
import TabPanel from "@mui/lab/TabPanel";
import { observer } from "mobx-react";

import "./ProfileStyle.scss";
import LocalStorageService from "@/services/LocalStorageService";

import MainProfile from "./ProfileTab/MainProfile";
import UserFriends from "./ProfileTab/UserFriends";
import Achievements from "./ProfileTab/Achievements";

function Profile() {
  const currentUser = LocalStorageService.getLoggedInUser();

  const { profileId } = useParams();
  const { userStore } = useStore();

  const [userProfile, setUserProfile] = useState<IUser>();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const { getUserById } = userStore;

  const handleCheckIsCurrentUser = () => {
    if (currentUser?.id === userProfile?.id) setIsCurrentUser(true);
    else setIsCurrentUser(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoadingUser(true);
        const data = await getUserById(profileId as string);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    getUser();
  }, [profileId]);

  useEffect(() => {
    handleCheckIsCurrentUser();
  }, [userProfile]);

  const [profileTab, setProfileTab] = useState("0");

  function handleChangeTab(_: any, newTab: string) {
    setProfileTab(newTab);
  }

  return (
    <div className="max-w-[80%] mx-auto">
      <TabContext value={profileTab}>
        <ProfileInfo
          profileTab={profileTab}
          handleChangeTab={handleChangeTab}
          userProfile={userProfile}
          isLoading={isLoadingUser}
        />

        <TabPanel className="p-0" value="0">
          <MainProfile
            isLoadingUser={isLoadingUser}
            userProfile={userProfile}
            isCurrentUser={isCurrentUser}
          />
        </TabPanel>
        <TabPanel className="p-0" value="1">
          <UserFriends />
        </TabPanel>
        <TabPanel className="p-0" value="2">
          <Achievements />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default memo(observer(Profile));
