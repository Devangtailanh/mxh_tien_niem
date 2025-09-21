import { Input } from "../ui/input";
import PostForm from "./PostForm";
import { Link, useParams } from "react-router-dom";
import LocalStorage from "@/services/LocalStorageService";

const SessionCreatePost = () => {
  const { groupId } = useParams();

  const currentUser = LocalStorage.getLoggedInUser();

  return (
    <div className="w-full bg-white py-3 px-2 rounded-lg my-4 ">
      <div className="flex items-center gap-5 ">
        <Link to="/profile/1" className="flex items-center">
          <div className=" ">
            <img
              src={currentUser?.avatar || "/person.jpg"}
              alt="avatar"
              className=" w-10 h-10 rounded-full object-cover"
            />
          </div>
        </Link>
        <PostForm groupId={groupId}>
          <Input
            type="text"
            placeholder="Bạn đang nghĩ gì thế?"
            className="outline-none px-4 py-6  rounded-full bg-gray-10 border-none border-b-2"
          />
        </PostForm>
      </div>

      <div className="grid grid-cols-3 mt-4 opacity-50">
        <div className="flex gap-3 items-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <img src="/video.svg" alt="icon" className="w-8 h-8 relative" />
          <p className="font-bold text-center">Video trực tiếp</p>
        </div>
        <div className="flex gap-3 items-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <img src="/image.svg" alt="icon" className="w-8 h-8 relative" />
          <p className="font-bold text-center">Ảnh/Video</p>
        </div>
        <div className="flex gap-3 items-center p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <img src="/feeling.svg" alt="icon" className="w-8 h-8 relative" />
          <p className="font-bold text-center">Cảm xúc/hoạt động</p>
        </div>
      </div>
    </div>
  );
};

export default SessionCreatePost;
