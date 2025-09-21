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
type Props = {
  classData: any;
  isLoading: boolean;
};
const TableCourseResult = ({ classData, isLoading }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Mã Khóa học</TableHead>
          <TableHead>Tên của khóa học</TableHead>
          <TableHead>Mô Tả</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <>
        {!classData ? (
          <span>Chưa có Kết quả khóa học nào</span>
        ) : (
          <TableBody>
            {classData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-5 justify-end"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </>
    </Table>
  );
};

export default TableCourseResult;
