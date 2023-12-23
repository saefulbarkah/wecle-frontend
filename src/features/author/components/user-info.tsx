"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { author } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const AuthorInfo = ({ data }: { data: author }) => {
  const handleFollowing = () => {
    alert("Following user");
  };
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
            <Button
              className="rounded-full"
              variant={"success"}
              onClick={() => handleFollowing()}
            >
              Follow
            </Button>
          </div>
          <div className="mt-10">
            <h3 className="font-bold">Following</h3>
            <div className="mt-5 flex flex-col gap-2">
              {data.followings.map((item, i) => (
                <React.Fragment key={i}>
                  {i < 4 && (
                    <div className="flex justify-between">
                      <Link href={"/adad"} className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border">
                          <Image
                            src={"https://ui-avatars.com/api/?name=John+Doe"}
                            width={200}
                            height={200}
                            alt="jgondoe"
                          />
                        </Avatar>
                        <p className="text-sm hover:underline">saeful barkah</p>
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
