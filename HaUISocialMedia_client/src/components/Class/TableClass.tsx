import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteClass from "./DeleteClass";
import ListStudent from "./ListStudent";
import UpdateClass from "./UpdateClass";

type Props = {
  classData: any;
  isLoading: boolean;
};
const TableClass = ({ classData, isLoading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã Lớp</TableHead>
          <TableHead>Tên Lớp</TableHead>
          <TableHead>Mô Tả</TableHead>
          <TableHead className="text-center">Sinh Viên</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!classData ? (
          <span>Chưa có lơp học nào</span>
        ) : (
          <TableBody>
            {classData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-center">
                  {item.students ? item.students.lenght : 0}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-5 justify-end">
                    <UpdateClass classData={item} />
                    <DeleteClass id={item.id} />
                    <ListStudent students={item?.students} />
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

export default TableClass;
