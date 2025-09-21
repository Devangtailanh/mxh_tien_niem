import { Skeleton } from "../ui/skeleton";

type Props = {
  length: number;
  styles: string;
};
const TableSkeleton = ({ length, styles }: Props) => {
  return (
    <div className={`${styles} space-y-4`}>
      {Array.from({ length }).map((_, i) => (
        <Skeleton className="h-8 w-full" key={i} />
      ))}
    </div>
  );
};

export default TableSkeleton;
