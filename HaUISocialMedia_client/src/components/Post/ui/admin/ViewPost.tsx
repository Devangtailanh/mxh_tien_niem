import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Link } from "react-router-dom";

import PostCard from "../../PostCard";
import Icon from "@/components/shared/Icon";

type Props = {
  post: any;
};

const ViewPost = ({ post }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
          <Icon name="Eye" size={16} />
          <span>Xem</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Thông Tin Bài Viết</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col max-h-[80vh] overflow-y-auto">
          <PostCard post={post} />

          <Link
            to={`/post/${post?.id}`}
            className="w-full text-center bg-blue-200 text-blue-600  font-semibold py-2 rounded-md mt-5"
          >
            Xem Bài Viết
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPost;
