import GroupForm from "./form/GroupForm";

const CreateGroup = () => {
  return (
    <div className="bg-white w-2/3 mx-auto p-5 mt-10">
      <h2 className="h3-bold my-5">Tạo Nhóm</h2>
      <GroupForm isCreate />
    </div>
  );
};

export default CreateGroup;
