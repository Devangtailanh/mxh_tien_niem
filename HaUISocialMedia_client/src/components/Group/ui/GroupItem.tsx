import { useNavigate } from "react-router-dom";

type Props = {
  group: any;
};

const GroupItem = ({ group }: Props) => {
  const navigate = useNavigate();
  const handleNavigateGroupDetail = () => {
    navigate(`/group/${group?.id}`);
    window.location.href = `/group/${group?.id}`;
  };
  return (
    <div className="flex gap-3 p-2">
      <img
        src={group?.backGroundImage || "/bg-haui.jpg"}
        alt="group-img"
        className="w-16 h-16 rounded-md object-cover"
      />
      <div>
        <p
          onClick={handleNavigateGroupDetail}
          className="small-medium max-w-40 capitalize cursor-pointer"
        >
          {group.name}
        </p>
        <p>
          Thành viên: <span>{group?.userJoins?.length}</span>
        </p>
      </div>
    </div>
  );
};

export default GroupItem;
