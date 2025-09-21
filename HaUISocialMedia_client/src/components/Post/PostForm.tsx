import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import FileUploader from "./FileUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { IPost } from "@/types";
import { useStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { handleUploadImage } from "@/lib/utils";
import { Input } from "../ui/input";
import LocalStorageService from "@/services/LocalStorageService";
import DrawIcon from '@mui/icons-material/Draw';

export type CreatePostType = {
  content: string;
  images: any[];
};

const formSchema = z.object({
  content: z.string().min(1, { message: "Hãy chia sẻ suy nghĩ của bạn" }),

  file: z.custom<File[]>(),
});

type PostFormProps = {
  children: ReactNode;
  post?: IPost;
  groupId?: any;
};

const PostForm = ({ children, post, groupId }: PostFormProps) => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const images = post && post?.images.map((i) => i.image);

  const { postStore } = useStore();
  const { createPost, updatePost } = postStore;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post?.content || "",
      file: [],
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      let images = [];
      let imgItem = {
        image: "",
        description: "",
      };

      let url;

      console.log(values.file.length);
      if (post) {
        if (images.length + values.file.length > 6) {
          toast.warning("Bạn đã đăng quá số ảnh cho phép");
          return;
        }
      } else if (values.file.length > 6) {
        toast.warning("Bạn đã đăng quá số ảnh cho phép");
        return;
      }
      for (let i = 0; i < values.file.length; i++) {
        if (values.file[i]) {
          url = await handleUploadImage(values.file[i]);
          imgItem = { ...imgItem, image: url as string };
          images.push(imgItem);
        }
      }

      if (post && values.file.length > 0) images = [...post.images, images];

      let group = {
        id: "",
      };
      if (groupId) {
        group.id = groupId;
      }

      const newPost: CreatePostType = {
        content: values.content,
        images: images,
        ...(groupId && { group }),
      };

      if (post) {
        await updatePost({
          ...post,
          content: values.content,
          images: images,
        });
        toast.success("Đã cập nhật bài viết");
        setTimeout(() => {
          navigate(0);
        }, 500);
      } else {
        await createPost(newPost);
        setTimeout(() => {
          toast.success("Đã tạo bài viết");
        }, 500);
        navigate(0);
      }
    } catch (error) {
      console.log("[Create_Post]", error);
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-3xl overflow-y-auto ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-9 w-full"
          >
            <DialogHeader>
              <DialogTitle className="text-center h3-bold">
                Tạo bài viết
              </DialogTitle>

              <div className="flex gap-2 items-center mt-2">
                <img
                  src={currentUser?.avatar || "/person.jpg"}
                  alt="profile-img"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <p className="base-semibold">
                    {currentUser?.lastName} {currentUser?.firstName}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="flex gap-8 flex-col">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`${currentUser?.firstName} ơi, bạn đang nghĩ gì thế?`}
                        className="border-none py-4  shadow-none text-[16px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl={images || []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="w-full">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full capitalize"
              >
                <DrawIcon className="mr-2" />
                {isLoading ? "Đang đăng..." : "Đăng "}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;
