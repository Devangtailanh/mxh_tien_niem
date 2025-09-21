import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoData from "../shared/NoData";
import LocalStorageService from "@/services/LocalStorageService";
import { IUser } from "@/types";
import DeleteUser from "./ui/admin/DeleteUser";
import UserDetail from "./ui/admin/UserDetail";
import BlockUser from "./ui/BlockUser";
import UnBlockUser from "./ui/UnBlockUser";
// import UpdateClass from "./UpdateStatusUser";
type Props = {
  userData: any;
  isLoading: boolean;
};
const TableUser = ({ userData, isLoading }: Props) => {
  console.log(userData);
  const currentUser = LocalStorageService.getLoggedInUser();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã SV </TableHead>
          <TableHead>Họ </TableHead>
          <TableHead>Tên </TableHead>
          <TableHead>Email </TableHead>
          <TableHead>Giới tính</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!userData ? (
          <NoData title="Chưa có người dùng" />
        ) : (
          <TableBody>
            {userData
              ?.filter((item: IUser) => item?.id !== currentUser?.id)
              .map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.code || "Chưa cập nhật"}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.email || "Chưa cập nhật"}</TableCell>
                  <TableCell>{item.gender ? "Nữ" : "Nam"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-5 justify-end">
                      {item?.disable ? (
                        <UnBlockUser id={item?.id} />
                      ) : (
                        <BlockUser id={item.id} />
                      )}
                      <UserDetail user={item} />
                      {/* <DeleteUser id={item.id} /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </>
    </Table>
  );
};

export default TableUser;
