import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useStore } from "@/stores";
import { useGetAllData } from "@/lib";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export type CreatePostType = {
  idCourse: String;
  idCourseResult: String;
  score: number;
};

const formSchema = z.object({
  idCourse: z.string({
    required_error: "Chọn môn học",
  }),
  idCourseResult: z.string({
    required_error: "Chọn kết quả học tập",
  }),
  score: z.coerce
    .number()
    .min(0, {
      message: "Điểm không hợp lệ",
    })
    .max(10, {
      message: "Điểm không hợp lệ",
    }),
});

type PostFormProps = {
  children: ReactNode;
};

const UpdateResult = ({ children }: PostFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { courseResultStore, courseStore, userCourseStore } = useStore();
  const { getAllCourseResult } = courseResultStore;
  const { getAllCourse } = courseStore;
  const { res: courses } = useGetAllData({ getRequest: getAllCourse });
  const { res: courseResults } = useGetAllData({
    getRequest: getAllCourseResult,
  });
  const { createUserCourse } = userCourseStore;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      score: values.score,
      course: {
        id: values.idCourse,
      },
      courseResult: {
        id: values.idCourseResult,
      },
    };

    try {
      setIsLoading(true);
      await createUserCourse(data);
      toast.success("Đã gửi yêu cầu cập nhật, vui lòng chờ quản trị viên phê duyệt", { delay: 5000 });
      setTimeout(() => {
        navigate(0);
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (courses === null) alert("co loi");
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[50%] h-max ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between "
          >
            <p className="text-body-medium mb-10">Chia sẻ kết quả học tập</p>
            <div className="flex justify-center gap-5 flex-wrap">
              <div className="flex flex-col gap-5">
                <FormField
                  control={form?.control}
                  name="idCourse"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Môn học</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[300px] justify-between",
                                !field?.value && "text-muted-foreground"
                              )}
                            >
                              {field?.value
                                ? courses?.find(
                                  (course) => course?.id === field?.value
                                )?.name
                                : "Lựa chọn môn học"}

                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="flex-start w-[300px] p-0 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Tìm môn học..."
                              className="h-9"
                            />
                            <CommandEmpty>Không có môn học nào.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {courses?.map((course) => (
                                  <CommandItem
                                    value={course?.id}
                                    key={course?.id}
                                    onSelect={() => {
                                      form.setValue("idCourse", course?.id);
                                    }}
                                  >
                                    {course.code} - {course?.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        course?.id === field?.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form?.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Điểm</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Điểm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form?.control}
                  name="idCourseResult"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Kết quả học tập</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[300px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? courseResults?.find(
                                  (courseResult) =>
                                    courseResult?.id === field?.value
                                )?.name
                                : "Lựa chọn kết quả học tập"}

                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="flex-start w-[300px] p-0 bg-white">
                          <Command>
                            <CommandInput
                              placeholder="Tìm kiếm kết quả..."
                              className="h-9"
                            />
                            <CommandEmpty>Chưa có kết quả nào.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {courseResults?.map((courseResult) => (
                                  <CommandItem
                                    value={courseResult?.id}
                                    key={courseResult?.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "idCourseResult",
                                        courseResult?.id
                                      );
                                    }}
                                  >
                                    {courseResult?.code} - {courseResult?.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        courseResult?.id === field?.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button disabled={isLoading} className="w-96 self-center mt-5" style={{ backgroundColor: "#0056ff" }}>
              {isLoading ? <Loader /> : (
                <>
                  <ScheduleSendIcon className="mr-4" />
                  Gửi yêu cầu phê duyệt
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateResult;
