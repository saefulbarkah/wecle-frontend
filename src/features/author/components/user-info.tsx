"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useFollow, useUnFollow } from "@/hooks/use-follow";
import { AuthorService } from "@/services/author/author-service";
import { author } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FollowComp = ({
  isFollowing,
  isPending,
  onFollowClick,
  disabled = false,
  onUnFollowClick,
}: {
  isPending?: {
    following: boolean;
    unFollowing: boolean;
  };
  isFollowing?: boolean;
  onFollowClick: () => void;
  onUnFollowClick: () => void;
  disabled?: boolean;
}) => {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setIsRender(true);
  }, []);

  const unfollowButton = () => {
    return (
      <Button
        className="rounded-full"
        variant={"outline"}
        onClick={onUnFollowClick}
      >
        Unfollow
      </Button>
    );
  };

  const followButton = () => {
    return (
      <Button
        className="rounded-full "
        variant={"success"}
        onClick={onFollowClick}
        disabled={disabled}
      >
        Follow
      </Button>
    );
  };

  if (!isRender)
    return <Skeleton className="h-10 w-20 rounded-full px-4 py-2" />;
  if (isPending?.following || isPending?.unFollowing) {
    return (
      <Button
        variant={"outline"}
        className="pointer-events-none cursor-not-allowed rounded-full"
      >
        <Loader2 className="animate-spin" />
      </Button>
    );
  }
  return <>{isFollowing ? unfollowButton() : followButton()}</>;
};

export const AuthorInfo = ({ author }: { author: author }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["author-info", author._id],
    queryFn: () => AuthorService.find(author._id),
    initialData: author,
  });

  const {
    onFollowing,
    session,
    isPending: followPending,
    isFollowing,
  } = useFollow(author);

  const { onUnFollow, isPending: unfollowingPending } = useUnFollow();

  return (
    <div className="pt-10 dark:border-white/10 md:w-52 md:border-l md:pt-14 lg:w-80">
      <div className="static top-[0px] md:sticky md:pl-7 md:pr-5">
        <div className="md:min-h-[calc(100vh-120px)]">
          <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-0">
            <Avatar className="h-14 w-14 md:h-20 md:w-20">
              <Image
                src={data.avatar}
                fill
                alt={data.name}
                className="object-cover"
              />
            </Avatar>
            <div className="flex flex-col md:mt-5">
              <p className="text-2xl font-bold md:text-base">{data.name}</p>
              <p className="text-base font-semibold text-secondary">
                {data.followers.length} Followers
              </p>
            </div>
          </div>
          <div className="mt-2 hidden md:block">
            <p className="text-sm leading-relaxed">{data.about}</p>
          </div>
          <div className="mt-10 md:mt-5">
            {session?.author_id !== data._id && (
              <FollowComp
                isPending={{
                  following: followPending,
                  unFollowing: unfollowingPending,
                }}
                isFollowing={isFollowing}
                onFollowClick={() => {
                  if (!session) return router.push("/auth/login");
                  onFollowing(session?.author_id as string, data._id);
                }}
                onUnFollowClick={() => {
                  onUnFollow(session?.author_id as string, data._id);
                }}
              />
            )}
          </div>
          <div className="mt-10 hidden md:block">
            <h3 className="font-bold">Following</h3>
            <div className="mt-5 flex flex-col gap-2">
              {data.followings.map((item, i) => (
                <React.Fragment key={i}>
                  {i < 4 && (
                    <div className="flex justify-between">
                      <Link
                        href={"/author/" + item.author._id}
                        className="flex items-center gap-2"
                      >
                        <Avatar className="h-6 w-6 border">
                          <Image
                            src={item.author.avatar}
                            width={200}
                            height={200}
                            alt={`Avatar ${item.author.name}`}
                          />
                        </Avatar>
                        <p className="text-sm hover:underline">
                          {item.author.name}
                        </p>
                      </Link>
                    </div>
                  )}
                </React.Fragment>
              ))}
              {data.followings.length > 4 && (
                <Link
                  href={"/asdad"}
                  className="mt-2 text-sm text-black/80 hover:text-black"
                >
                  See all (20)
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
