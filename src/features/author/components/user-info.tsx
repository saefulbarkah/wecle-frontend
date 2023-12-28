"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthOverlay } from "@/features/auth/store";
import { useFollow, useUnFollow } from "@/hooks/use-follow";
import { AuthorService } from "@/services/author/author-service";
import { author } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
        className="rounded-full"
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
  if (isPending?.following) {
    return unfollowButton();
  }
  if (isPending?.unFollowing) {
    return followButton();
  }
  return <>{isFollowing ? unfollowButton() : followButton()}</>;
};

export const AuthorInfo = ({ author }: { author: author }) => {
  const setOpenAuth = useAuthOverlay((state) => state.setOpen);
  const { data } = useQuery({
    queryKey: ["author-info"],
    queryFn: () => AuthorService.find(author._id),
    initialData: author,
  });

  const {
    onFollowing,
    session,
    isPending: followPending,
    isFollowing,
  } = useFollow();

  const { onUnFollow, isPending: unfollowingPending } = useUnFollow();

  return (
    <div className="w-80 border-l pt-14">
      <div className="sticky top-[0px] pl-7 pr-5">
        <div>
          <Avatar className="h-20 w-20 border">
            <Image src={data.avatar} width={200} height={200} alt="jgondoe" />
          </Avatar>
          <div className="mt-5 flex flex-col">
            <p className="text-base font-bold">{data.name}</p>
            <p className="text-base">{data.followers.length} Followers</p>
          </div>
          <div className="mt-2">
            <p className="text-sm leading-relaxed">{data.about}</p>
          </div>
          <div className="mt-5">
            {session?.author_id !== data._id && (
              <FollowComp
                isPending={{
                  following: followPending,
                  unFollowing: unfollowingPending,
                }}
                isFollowing={isFollowing}
                onFollowClick={() => {
                  if (!session) return setOpenAuth(true);
                  onFollowing(session?.author_id as string, data._id);
                }}
                onUnFollowClick={() => {
                  onUnFollow(session?.author_id as string, data._id);
                }}
              />
            )}
          </div>
          <div className="mt-10">
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
