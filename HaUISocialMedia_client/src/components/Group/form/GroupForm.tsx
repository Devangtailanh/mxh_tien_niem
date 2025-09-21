import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { z } from "zod";

import { useStore } from "@/stores";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { Textarea } from "@/components/ui/textarea";
import BackgroupUpload from "../ui/BackgroundUpload";
import { handleUploadImage } from "@/lib/utils";
import LocalStorageService from "@/services/LocalStorageService";

const formSchema = z.object({
  name: z.string().min(1, { message: "Tên lớp không được trống" }),
  description: z.string().min(1, { message: "Mô tả lớp không được trống" }),
  backGroundImage: z.custom<File[]>(),
});

type Props = {
  isUpdate?: boolean;
  isCreate?: boolean;
  data?: any;
};

const GroupForm = ({ isUpdate, isCreate, data }: Props) => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const { groupStore } = useStore();
  const { createNewGroup, updateGroup } = groupStore;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: data?.description || "",
      name: data?.name || "",
      backGroundImage: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsCreating(true);
      let url;
      if (values.backGroundImage && values?.backGroundImage[0]) {
        url = await handleUploadImage(values?.backGroundImage[0]);
      } else {
        url = data.backGroundImage;
      }
      const groupData = {
        name: values.name,
        description: values.description,
        backGroundImage: url || "",
      };
      if (data) {
        await updateGroup({ ...data, ...groupData });
        toast.success("Đã cập nhật thông tin nhóm");
      } else {
        await createNewGroup(groupData);
        toast.success("Đã tạo nhóm");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Nhóm</FormLabel>
              <FormControl>
                <Input placeholder="Tên nhóm" {...field} />
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
                <Textarea placeholder="Mô tả nhóm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="backGroundImage"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <BackgroupUpload
                  fieldChange={field.onChange}
                  mediaUrl={data?.backGroundImage || "/bg-haui.jpg"}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          {isCreate && (
            <Button
              disabled={isCreating}
              type="submit"
              className="bg-blue-600 px-5"
            >
              {isCreating ? <Loader /> : "Tạo"}
            </Button>
          )}
          {isUpdate && (
            <Button
              disabled={isCreating}
              type="submit"
              className="bg-blue-600 px-5"
            >
              {isCreating ? <Loader /> : "Cập nhật"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default GroupForm;
