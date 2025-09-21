import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Link } from "react-router-dom";

import Icon from "@/components/shared/Icon";
import { format, parseISO } from "date-fns";

type Props = {
  user: any;
};

const UserDetail = ({ user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
          <Icon name="Eye" size={16} />
          <span>Xem</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Thông Tin Người dùng
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="w-full h-[150px] relative">
            <img
              src={user?.background || "/bg-haui.jpg"}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2 -mt-6">
            <div className="z-50">
              <img
                src={user?.avatar || "/person.jpg"}
                alt="avartar"
                className=" w-24 h-24 object-cover rounded-full"
              />
            </div>
            <div className="z-50">
              <p className="text-[28px] font-bold">
                {user?.lastName} {user?.firstName}
              </p>
            </div>
          </div>

          <div className="h-max-content overflow-y-auto justify-items-center">
            <div className="mt-5 flex flex-col items-center">
              <p className="h3-bold mb-5">Giới thiệu</p>
              <div className="flex flex-col gap-5 w-full items-center text-lg">
                <div className="flex items-center gap-3 bg-blue-2 w-full py-2 px-5">
                  <Icon name="Code" />
                  <p>
                    Mã sinh viên: <span>{user?.code || "Chưa cập nhật"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-blue-2 w-full py-2 px-5">
                  <Icon name="Cake" />
                  <p className="flex gap-2">
                    Ngày sinh:{" "}
                    <span>
                      {" "}
                      {user?.birthDate ? (
                        <>
                          {format(
                            parseISO(user?.birthDate?.toString() || ""),
                            "yyy-MM-dd"
                          )}
                        </>
                      ) : (
                        <span>Chưa cập nhật</span>
                      )}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-blue-2 w-full py-2 px-5">
                  <Icon name="Mails" />
                  <p>
                    Email: <span>{user?.email || "Chưa cập nhật"} </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-blue-2 w-full py-2 px-5">
                  <Icon name="Phone" />
                  <p>
                    SDT: <span>{user?.phoneNumber || "Chưa cập nhật"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-blue-2 w-full py-2 px-5">
                  <Icon name="BookUser" />
                  <p>
                    Địa chỉ: <span>{user?.address || "Chưa cập nhật"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to={`/profile/${user?.id}`}
            className="w-full text-center bg-blue-200 text-blue-600  font-semibold py-2 rounded-md mt-5"
          >
            Xem Profile
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetail;
