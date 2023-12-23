"use client";

import React from "react";

const TopicItem = ({ name }: { name: string }) => {
  return (
    <button className="rounded-xl bg-secondary/10 p-2 text-sm capitalize text-black">
      {name}
    </button>
  );
};

const RecommendedTopics = () => {
  return (
    <div className="sticky top-[70px]">
      <h2 className="font-semibold">Recommended topics</h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <TopicItem name="Programming" />
        <TopicItem name="Relationship" />
        <TopicItem name="Politics" />
        <TopicItem name="Money" />
      </div>
    </div>
  );
};

export default RecommendedTopics;
