import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletePost from "./ui/admin/DeletePost";
import { format, parseISO } from "date-fns";
import ViewPost from "./ui/admin/ViewPost";

type Props = {
  postData: any;
  isLoading: boolean;
};
const TablePost = ({ postData, isLoading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="capitalize">Thông tin người đăng</TableHead>
          <TableHead className="capitalize">Ngày đăng</TableHead>
          <TableHead className="capitalize">Nội Dung</TableHead>
          <TableHead className="capitalize"></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!postData ? (
          <span>Chưa có Bài đăng nào</span>
        ) : (
          <TableBody>
            {postData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={item?.creator?.avatar || "/person.jpg"}
                      alt="userpofile"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <p className="base-semibold">
                      {item?.creator?.lastName} {item?.creator?.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  {format(
                    parseISO(item?.createDate?.toString() || ""),
                    "yyy-MM-dd"
                  )}
                </TableCell>
                <TableCell className="py-2">
                  <div className="max-w-prose h-5 overflow-hidden ">
                    {item.content}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex gap-5 justify-end">
                    <ViewPost post={item} />
                    <DeletePost id={item.id} />
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

export default TablePost;
