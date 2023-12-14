'use client';

import React from 'react';

const TopicItem = ({ name }: { name: string }) => {
  return (
    <button className="p-2 bg-secondary/10 text-sm text-black rounded-xl capitalize">
      {name}
    </button>
  );
};

const RecommendedTopics = () => {
  return (
    <div className="sticky top-[70px]">
      <h2 className="font-semibold">Recommended topics</h2>
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <TopicItem name="Programming" />
        <TopicItem name="Relationship" />
        <TopicItem name="Politics" />
        <TopicItem name="Money" />
      </div>
    </div>
  );
};

export default RecommendedTopics;
