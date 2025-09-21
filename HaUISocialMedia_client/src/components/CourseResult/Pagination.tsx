import { Button } from "../ui/button";

type Props = {
  isLeftDisable: boolean;
  isRightDisable: boolean;
  setPaging: any;
};

const Pagination = ({ isLeftDisable, isRightDisable, setPaging }: Props) => {
  const handlePrev = () => {
    setPaging((prev: any) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  };
  const handleNext = () => {
    setPaging((prev: any) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  };
  return (
    <div className="mt-5 flex justify-center flex-wrap gap-5">
      <Button disabled={isLeftDisable} onClick={handlePrev}>
        Trước
      </Button>
      <Button disabled={isRightDisable} onClick={handleNext}>
        Sau
      </Button>
    </div>
  );
};

export default Pagination;
