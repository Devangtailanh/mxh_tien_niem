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
import DeleteStudent from "./DeleteStudent";
import { Item } from "@radix-ui/react-radio-group";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];
type Props = {
  students: any;
};
const TableStudent = ({ students }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tên sinh viên</TableHead>
          <TableHead>Ngày sinh</TableHead>
          <TableHead>Mô Tả</TableHead>
          <TableHead>SDT</TableHead>
          <TableHead>Địa chỉ</TableHead>

          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students?.map((invoice: any) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.lastName + ' ' + invoice.firstName}</TableCell>
            <TableCell>{invoice.birthDate}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.phoneNumber}</TableCell>
            <TableCell>{invoice.address}</TableCell>

            <TableCell className="text-right">
              <div className="flex gap-5 justify-end">
                <DeleteStudent />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableStudent;
