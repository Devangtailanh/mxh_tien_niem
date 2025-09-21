import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupForm from "../form/GroupForm";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Icon from "@/components/shared/Icon";

type Props = {
  group: any;
};
const UpdateGroup = ({ group }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="outline-none">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="outline-none"
        >
          <div className="flex items-center gap-3">
            <Icon name="Pencil" size={16} />
            <span>Cập nhật nhóm</span>
          </div>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="mt-10 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật nhóm</DialogTitle>
        </DialogHeader>
        <GroupForm isUpdate data={group} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGroup;
