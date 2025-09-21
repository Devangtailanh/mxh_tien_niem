import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useStore } from "@/stores";
import { useState } from "react";
import { toast } from "react-toastify";
import LocalStorageService from "@/services/LocalStorageService";

export type CreateCommentType = {
  content: string;
  post: {
    id: string;
  };
  repliedComment?: {
    id: string;
  };
};

const formSchema = z.object({
  comment: z.string().min(2, {
    message: "Bình luận không được để trống.",
  }),
});
type CommentProps = {
  postId: string;
  repliCommentId?: string;
};
const Comment = ({ postId, repliCommentId }: CommentProps) => {
  const currentUser = LocalStorageService.getLoggedInUser();
  const { commentStore } = useStore();
  const { createComment } = commentStore;
  const [isCreateComment, setIsCreateConmment] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let newComment: CreateCommentType;
    if (repliCommentId) {
      newComment = {
        content: values.comment,
        post: {
          id: postId,
        },
        repliedComment: {
          id: repliCommentId,
        },
      };
    } else {
      newComment = {
        content: values.comment,
        post: {
          id: postId,
        },
      };
    }
    try {
      setIsCreateConmment(true);
      await createComment(newComment);
      toast.success("Đã bình luận");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreateConmment(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
        <div className="flex items-center gap-2 ">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex  gap-3 flex-1 p-2 space-y-0">
                <img
                  src={currentUser?.avatar || "/person.jpg"}
                  alt="profile-photo"
                  className="size-10 object-cover rounded-full"
                  onClick={() =>
                    (window.location.href = `/profile/${currentUser?.id}`)
                  }
                />

                <FormControl>
                  <Input
                    placeholder="Viết bình luận..."
                    {...field}
                    className="p-4 py-2 border-none bg-blue-2 "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isCreateComment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Comment;
