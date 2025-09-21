import Icon from "../shared/Icon";
import ClassForm from "./ClassForm";

type Props = {
  classData: any;
};
const UpdateClass = ({ classData }: Props) => {
  return (
    <ClassForm title="Cập nhật lớp học" isUpdate classData={classData}>
      <div className="flex items-center gap-1 text-yellow-600 cursor-pointer">
        <Icon name="Pencil" size={16} />
        <span>Cập nhật</span>
      </div>
    </ClassForm>
  );
};

export default UpdateClass;
