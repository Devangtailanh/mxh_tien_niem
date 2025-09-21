import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoData from "@/components/shared/NoData";
import { format, parseISO } from "date-fns";
import AcceptResult from "./AcceptResult";
import DenyResult from "./DenyResult";
type Props = {
  dataCourseResult: any;
};
const TableUserCourseResult = ({ dataCourseResult }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="capitalize">Sinh Viên</TableHead>
          <TableHead className="capitalize">Ngày Yêu Cầu</TableHead>
          <TableHead className="capitalize">Tên Môn</TableHead>
          <TableHead className="text-center capitalize">Kết Quả</TableHead>
          <TableHead className="text-center capitalize">Điểm</TableHead>
          <TableHead className="capitalize"></TableHead>
        </TableRow>
      </TableHeader>
      <>
        <TableBody>
          {dataCourseResult.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="max-w-[300px]">
                <div className="flex items-center gap-2">
                  <img
                    src={item?.user?.avatar || "/person.jpg"}
                    alt="userpofile"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <p className="base-semibold">
                    {item?.user?.lastName} {item?.user?.firstName}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                {format(
                  parseISO(item?.modifyDate?.toString() || ""),
                  "yyy-MM-dd"
                )}
              </TableCell>
              <TableCell className="">{item.course.name}</TableCell>
              <TableCell className="text-center">
                {item.courseResult.code}
              </TableCell>

              <TableCell className="text-center">{item.score}</TableCell>

              <TableCell className="text-right">
                <div className="flex gap-5 justify-end">
                  <DenyResult id={item.id} />
                  <AcceptResult id={item.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    </Table>
  );
};

export default TableUserCourseResult;
