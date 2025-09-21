import { memo, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { observer } from "mobx-react";
import Icon, { IconName } from "../shared/Icon";
import { useNavigate } from "react-router-dom";

type CustomButtonFriendProps = {
  icon?: string;
  isSecondary?: boolean;
  title: string;
  message: string;
  handleFn: any;
  id?: string;
};

const CustomButtonFriend = ({
  icon,
  title,
  message,
  handleFn,
  id,
  isSecondary = false,
}: CustomButtonFriendProps) => {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async (e: MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleFn(id || "");
      setIsDisable(true);
      toast.success(message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isDisable}
      className={`${
        isSecondary
          ? "bg-grey-2 text-black hover:bg-blue-2"
          : "bg-blue-600 hover:bg-blue-500"
      } flex items-center gap-3 w-full`}
      onClick={(e: any) => handleClick(e)}
    >
      {isLoading && <Loader />}
      {icon && <Icon name={icon as IconName} />}
      {isDisable ? message : title}
    </Button>
  );
};

export default memo(observer(CustomButtonFriend));
