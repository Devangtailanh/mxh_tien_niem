import AuthStore from "./components/Auth/AuthStore";
import ChatStore from "./components/ChatV2/ChatStore";
import RelationshipStore from "./components/Relationship/RelationshipStore";
import { createContext, useContext } from "react";
import UserStore from "./components/User/UserStore";
import PostStore from "./components/Post/PostStore";
import NotificationStore from "./components/Notification/NotificationStore";
import LikeStore from "./components/Like/LikeStore";
import CommentStore from "./components/Comment/CommentStore";
import CourseStore from "./components/Course/CourseStore";
import CourseResultStore from "./components/CourseResult/CourseResultStore";
import ClassStore from "./components/Class/ClassStore";
import UserCourseStore from "./components/UserCourse/UserCourseStore";
import LeaderBoardStore from "./components/LeaderBoard/LeaderBoardStore";
import GroupStore from "./components/Group/GroupStore";
import LoadingTotalStore from "./components/Search/LoadingTotalStore";

export const stores = {
  chatStore: new ChatStore(),
  authStore: new AuthStore(),
  relationshipStore: new RelationshipStore(),
  userStore: new UserStore(),
  postStore: new PostStore(),
  notificationStore: new NotificationStore(),
  likeStore: new LikeStore(),
  commentStore: new CommentStore(),
  courseStore: new CourseStore(),
  courseResultStore: new CourseResultStore(),
  classStore: new ClassStore(),
  userCourseStore: new UserCourseStore(),
  leaderBoardStore: new LeaderBoardStore(),
  groupStore: new GroupStore(),
  loadingTotalStore: new LoadingTotalStore(),
};

export const StoreContext = createContext(stores);

export function useStore() {
  return useContext(StoreContext);
}
