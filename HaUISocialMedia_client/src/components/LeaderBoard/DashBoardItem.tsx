
import { memo} from "react";

import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

function DashBoardItem({ data, stt }: { data: any; stt: number }) {
    const navigate = useNavigate();

    return (
        <tr
            onClick={() => {
                navigate(`/profile/${data?.user.id}`);
                window.location.href = `/profile/${data?.user.id}`;
            }}
        >
            <td className={`px-3 py-2 text-sm text-center `}>
                <span>{stt}</span>
            </td>

            <td className="px-4 py-3">
                <div className="flex justify-center gap-10 text-sm m-0">
                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src={data?.user?.avatar || "/person.jpg"}
                            alt="image"
                        />
                    </div>
                </div>
            </td>

            <td className="px-4 py-3 text-sm text-center">
                {data?.user?.code || "Chưa cập nhật"}
            </td>
            <td className="px-4 py-3 text-sm text-center">{data?.user?.lastName}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.user.firstName}</td>

            <td className="px-4 py-3 text-sm text-center">
                <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                    {data?.user.username}
                </p>
            </td>

            <td className="px-4 py-3 text-sm text-center">{data?.numsOfA}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.numsOfBPlus}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.numsOfB}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.numsOfCPlus}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.numsOfC}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.numsOfDPlus}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.numsOfD}</td>
            <td className="px-4 py-3 text-sm text-center">{data?.averageScore}</td>
        </tr>
    );
};

export default memo(observer(DashBoardItem));