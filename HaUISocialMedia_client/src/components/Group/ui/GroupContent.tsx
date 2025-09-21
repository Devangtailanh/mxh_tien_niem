import SessionCreatePost from "@/components/Post/SessionCreatePost";
import { useNavigate } from "react-router-dom";
import MenberList from "./MenberList";
import ListPostOfGroup from "./ListPostOfGroup";
import { IPost } from "@/types";

type Props = {
  group: any;
};
const GroupContent = ({ group }: Props) => {
  const navigate = useNavigate();
  const handleNavigateProfile = (id: string) => {
    navigate(`/profile/${id}`);
    window.location.href = `/profile/${id}`;
  };
  return (
    <div className="w-full mx-auto mt-5 pb-10">
      <div className=" w-full grid grid-cols-[2fr_1fr] gap-8">
        <div className="flex gap-5 flex-col">
          <SessionCreatePost />
          <ListPostOfGroup groupId={group?.id} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-white flex gap-3 flex-col p-3 max-h-[300px] overflow-y-auto rounded-md shadow-md mt-4">
            <p className="small-medium">Giới thiệu</p>
            <p>{group?.description}</p>
          </div>

          <div className="bg-white flex gap-3 flex-col p-3 max-h-[300px] overflow-y-auto rounded-md shadow-md">
            <p className="small-medium">Danh sách thành viên</p>

            <div className="flex flex-col gap-3">
              {group?.userJoins?.slice(0, 5)?.map((menber: any) => (
                <div className="flex gap-2 items-center" key={menber?.id}>
                  <img
                    src={menber?.user?.avatar || "/person.jpg"}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span
                    onClick={() => handleNavigateProfile(menber?.user.id)}
                    className="cursor-pointer small-medium"
                  >
                    {menber?.user?.lastName} {menber?.user?.firstName}
                  </span>
                </div>
              ))}

              <MenberList group={group}>
                <span className="bg-slate-200 small-medium cursor-pointer flex items-center p-2 w-full justify-center rounded-md">
                  Xem thêm
                </span>
              </MenberList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupContent;
