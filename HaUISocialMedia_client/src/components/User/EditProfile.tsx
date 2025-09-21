import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProfileUploader from "./ProfileUploader";
import { CalendarIcon, Loader, Pencil } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { handleUploadImage } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import LocalStorage from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

const formSchema = z.object({
  firstname: z.string().min(1, { message: "Họ không được trống" }),
  lastname: z.string().min(1, { message: "Tên không được trống" }),
  birthDate: z.date(),
  address: z.string().min(1, { message: "Địa chỉ không được trống" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phoneNumber: z.string().min(1, { message: "Số điện thoại không được trống" }),
  avatar: z.custom<File[]>(),
  gender: z.string(),
});

export type UpdateUserForm = z.infer<typeof formSchema>;

function EditProfile() {
  const navigate = useNavigate();

  const { userStore, authStore } = useStore();
  const { setUser } = authStore;
  const { updateUser } = userStore;
  const currentUser = LocalStorage.getLoggedInUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: [],
      phoneNumber: currentUser?.phoneNumber || "",
      firstname: currentUser?.firstName || "",
      lastname: currentUser?.lastName || "",
      birthDate: (currentUser?.birthDate as Date) || Date.now,
      address: currentUser?.address || "",
      gender: currentUser?.gender.toString() || "false",
      email: currentUser?.email || "",
    },
  });

  // Handler
  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      let url;
      if (values.avatar[0]) {
        url = await handleUploadImage(values.avatar[0]);
      } else {
        url = currentUser.avatar;
      }
      const data = await updateUser({
        ...currentUser,
        phoneNumber: values.phoneNumber,
        firstName: values.firstname,
        lastName: values.lastname,
        birthDate: values.birthDate,
        address: values.address,
        gender: values.gender,
        email: values.email,
        avatar: url,
      });
      toast.success("Đã cập nhật");
      setUser(data);
      navigate(`/profile/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex w-full bg-white p-10 ">
      <div className="mx-auto">
        <div className="flex-start gap-3 justify-start w-full ">
          <Pencil />
          <h2 className="text-xl md:h3-bold text-left w-full">
            Chỉnh sửa thông tin cá nhân
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 "
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser?.avatar || "/person.jpg"}
                    />
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Họ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-5">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"}>
                              {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            className="bg-white"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex px-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={"false"}
                        className="flex  gap-10"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"false"} />
                          </FormControl>
                          <FormLabel>Nam</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"true"} />
                          </FormControl>
                          <FormLabel>Nữ</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Địa chỉ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <Button type="button" className="bg-red-500 hover:bg-rose-600">
                Huỷ
              </Button>
              <Button
                disabled={isUpdating}
                type="submit"
                className="bg-blue-600 hover:bg-blue-500"
              >
                {isUpdating ? <Loader /> : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default memo(observer(EditProfile));
