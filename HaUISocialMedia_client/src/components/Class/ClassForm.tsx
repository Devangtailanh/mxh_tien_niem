import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";

import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useStore } from "@/stores";
import Loader from "../shared/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  code: z.string().min(1, { message: "Mã lớp không được trống" }),
  name: z.string().min(1, { message: "Tên lớp không được trống" }),
  description: z.string().min(1, { message: "Mô tả lớp không được trống" }),
});

type Props = {
  children: ReactNode;
  title: string;
  data?: any;
  isUpdate?: boolean;
  isCreate?: boolean;
  classData?: any;
};

const ClassForm = ({
  title,
  isUpdate,
  isCreate,
  children,
  classData,
}: Props) => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const { classStore } = useStore();
  const { createClass, updateClass } = classStore;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: classData?.code || "",
      description: classData?.description || "",
      name: classData?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsCreating(true);
      if (classData) {
        await updateClass({ ...classData, ...values });
        toast.success("Đã cập nhật lớp học");
      } else {
        await createClass(values);
        toast.success("Đã tạo lớp học");
      }
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã lớp học</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã lớp học" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên lớp học</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên lớp học" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả lớp học" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              {isCreate && (
                <Button disabled={isCreating} type="submit">
                  {isCreating ? <Loader /> : "Tạo"}
                </Button>
              )}
              {isUpdate && (
                <Button disabled={isCreating} type="submit">
                  {isCreating ? <Loader /> : "Cập nhật"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassForm;
