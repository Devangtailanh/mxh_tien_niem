import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateBackgroundImgForm from "./UpdateBackgroundImgForm";
import Icon from "@/components/shared/Icon";

type Props = {
  backgroundImg: any;
};
const UpdateBackgroupImg = ({ backgroundImg }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="outline-none">
        <div className="flex items-center gap-2 small-medium text-slate-700 bg-white px-8 py-2 rounded-md">
          <Icon name="Camera" />
          <span>Thêm ảnh bìa</span>
        </div>
      </DialogTrigger>
      <DialogContent className="mt-10 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm ảnh bìa</DialogTitle>
        </DialogHeader>
        <UpdateBackgroundImgForm backgroundImg={backgroundImg} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBackgroupImg;
