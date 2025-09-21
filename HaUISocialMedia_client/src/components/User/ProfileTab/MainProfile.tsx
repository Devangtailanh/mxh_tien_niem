import SessionCreatePost from "@/components/Post/SessionCreatePost";
import { memo } from "react";
import { format, parseISO } from "date-fns";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { observer } from "mobx-react";
import { Grid } from "@mui/material";
import PostOfUser from "../ui/PostOfUser";
import Icon from "../../shared/Icon";

function MainProfile(props: any) {
  const { isLoadingUser, userProfile, isCurrentUser } = props;

  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12} md={5} lg={4}>
        <div className="infoCard mt-4">
          {isLoadingUser ? (
            <TableSkeleton
              styles="chats h-max-content w-full overflow-y-auto"
              length={5}
            />
          ) : (
            <div className="h-max-content overflow-y-auto ">
              <div className="flex flex-col mainProfileWrapper">
                <p className="h3-bold mb-5">Giới thiệu</p>
                <div className="flex flex-col gap-4 text-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Code" />
                    <p>
                      Mã sinh viên:{" "}
                      <span>{userProfile?.code || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Cake" />
                    <p className="flex gap-2">
                      Ngày sinh:{" "}
                      <span>
                        {" "}
                        {userProfile?.birthDate ? (
                          <>
                            {format(
                              parseISO(
                                userProfile?.birthDate?.toString() || ""
                              ),
                              "yyy-MM-dd"
                            )}
                          </>
                        ) : (
                          <span>Chưa cập nhật</span>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="CassetteTape" />
                    <p>
                      Lớp:{" "}
                      <span>
                        {userProfile?.classroomDto?.name || "Chưa cập nhật"}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mails" />
                    <p>
                      Email:{" "}
                      <span>{userProfile?.email || "Chưa cập nhật"} </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" />
                    <p>
                      SDT:{" "}
                      <span>{userProfile?.phoneNumber || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="BookUser" />
                    <p>
                      Địa chỉ:{" "}
                      <span>{userProfile?.address || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <div className={`flex-1 flex flex-col`}>
          {isCurrentUser && <SessionCreatePost />}
          <PostOfUser />
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(observer(MainProfile));
