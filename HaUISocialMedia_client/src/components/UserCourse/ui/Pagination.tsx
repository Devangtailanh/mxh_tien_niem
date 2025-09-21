import Icon from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";

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
    <div className="my-5 flex justify-center flex-wrap gap-5">
      <Button disabled={isLeftDisable} onClick={handlePrev}>
        <Icon name="ArrowLeft" />
      </Button>
      <Button disabled={isRightDisable} onClick={handleNext}>
        <Icon name="ArrowRight" />
      </Button>
    </div>
  );
};

export default Pagination;
