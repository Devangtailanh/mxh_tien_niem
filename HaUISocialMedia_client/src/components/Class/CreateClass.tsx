import Icon from "../shared/Icon";
import { Button } from "../ui/button";
import ClassForm from "./ClassForm";

const CreateClass = () => {
  return (
    <ClassForm title="Tạo lớp học" isCreate>
      <Button className="flex gap-2 items-center">
        <Icon name="Plus" />
        <span>Tạo lớp học</span>
      </Button>
    </ClassForm>
  );
};

export default CreateClass;
