import { ReactNode, memo, useState } from "react";

import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";
import Icon, { IconName } from "@/components/shared/Icon";

type CustomButtonFriendProps = {
  icon?: string;
  message: string;
  handleFn: any;
  id?: string;
  children: ReactNode;
  style: string;
  variant?: "default" | "outline";
  isDisable?: boolean;
};

const CustomButtonGroup = ({
  icon,
  message,
  handleFn,
  id,
  style,
  children,
  variant,
  isDisable,
}: CustomButtonFriendProps) => {
  const [isDisabling, setIsDisabling] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async (e: MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleFn(id || "");
      setIsDisabling(true);
      toast.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant={variant || "default"}
      disabled={isDisabling || isDisable}
      className={`${style && style} flex items-center gap-3`}
      onClick={(e: any) => handleClick(e)}
    >
      {isLoading && <Loader />}
      {icon && <Icon name={icon as IconName} />}
      {children}
    </Button>
  );
};

export default memo(observer(CustomButtonGroup));
