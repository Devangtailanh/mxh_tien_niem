import TableSkeleton from "../skeleton/TableSkeleton";
import { useStore } from "@/stores";
import { useGetAllData } from "@/lib";
import { spawn } from "child_process";

const ItemTable = ({ data, stt }: { data: any; stt: number }) => {
  return (
    <tr>
      <td className={`px-3 py-2 text-sm text-center `}>
        <span>{stt}</span>
      </td>
      <td className="px-4 py-3 text-sm text-center">{data?.course?.name}</td>
      <td className="px-4 py-3 text-sm text-center">{data?.score || 0}</td>

      <td className="px-4 py-3 text-sm text-center">
        <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          {data.courseResult.code}
        </p>
      </td>
    </tr>
  );
};

type Props = {
  userId: string;
};

const UserCourseResult = ({ userId }: Props) => {
  const { userCourseStore } = useStore();
  const { getAllCourseAdminAllow } = userCourseStore;
  const { res: userCourseData, isLoading } = useGetAllData({
    getRequest: getAllCourseAdminAllow,
    requestId: userId,
  });

  return (
    <div className="bg-white rounded-lg shadow-sm max-screen overflow-y-auto p-5">
      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
        <div className="w-full overflow-x-auto ">
          {isLoading && <TableSkeleton length={5} styles="" />}

          {!isLoading && (
            <>
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-xs tracking-wide font-bold text-left text-gray-500 uppercase border-b ">
                    <td className="px-4 py-3 text-center">STT</td>
                    <td className="px-4 py-3 text-center">Tên môn</td>
                    <td className="px-4 py-3 text-center">Điểm</td>
                    <td className="px-4 py-3 text-center">Kết quả</td>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y ">
                  {userCourseData.map((d: any, index: number) => (
                    <ItemTable key={d.id} data={d} stt={index + 1} />
                  ))}
                </tbody>
              </table>
              {userCourseData.length === 0 && (
                <span className="text-center flex justify-center mt-5">
                  Chưa có dữ liệu
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserCourseResult;
