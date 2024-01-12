"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import "./write-comment.css";
import { Button } from "@/components/ui/button";
import { useCreateComment } from "@/features/article/api/create-new-comment";
import { ArticleType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { socket } from "@/socket/socket";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useAuthOverlay } from "@/features/auth/store/auth-overlay-store";

const formSchema = z.object({
  comment: z.string({ required_error: "Form is required" }),
});

type formSchema = z.infer<typeof formSchema>;

const WriteComment = ({ article }: { article: ArticleType }) => {
  const session = useAuth((state) => state.session);
  const authOverlay = useAuthOverlay((state) => state);
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    setError,
  } = useForm<formSchema>({ resolver: zodResolver(formSchema) });

  const query = useQueryClient();

  const { mutateAsync, isPending } = useCreateComment({
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["comment-article"] });
      if (socket?.connected) {
        socket.emit("send-notification", {
          sender: session?.id,
          receiver: article.author.user,
          message: `commented on your article`,
          targetUrl:
            process.env.NEXT_PUBLIC_BASE_URL + "/article/" + article.slug,
        });
      }
    },
  });

  const router = useRouter();

  const handleAddComment = async (data: formSchema) => {
    if (!session) {
      router.push("/auth/login");
      return;
    }
    if (data.comment.trim() === "") {
      return setError("comment", {
        type: "required",
        message: "*Field must be not empty",
      });
    }

    await mutateAsync({
      articleId: article._id,
      userId: session?.id as string,
      text: data.comment,
      token: session?.token as string,
    });
    setValue("comment", "");
  };

  return (
    <>
      <div className="relative mt-8">
        {session ? null : (
          <button
            className="absolute inset-0 z-50 h-full w-full cursor-pointer bg-transparent"
            onClick={() => {
              if (!session) {
                toast("You need login first");
                authOverlay.setOpen(true);
                return;
              }
            }}
          />
        )}
        <div className="flex w-full gap-2">
          <Avatar>
            {session && (
              <Image
                src={session.avatar as string}
                width={48}
                height={48}
                className="h-10 w-10"
                alt={`${session.name}`}
              />
            )}
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <form onSubmit={handleSubmit(handleAddComment)}>
              <textarea
                className={`w-full appearance-none rounded border-none p-3 outline-none  ring-1 focus:ring-2 dark:bg-secondary-800/20 ${
                  errors.comment
                    ? "ring-danger"
                    : "ring-secondary focus:ring-primary dark:ring-white/10"
                }`}
                placeholder="Add your comment here"
                rows={2}
                {...register("comment", { required: true })}
              />
              {errors.comment && (
                <p className="text-md font-semibold text-danger">
                  {errors.comment.message}
                </p>
              )}
              <div className="mt-2">
                <Button
                  className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                  isLoading={isPending}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteComment;
