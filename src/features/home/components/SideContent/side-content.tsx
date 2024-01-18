"use client";

import React from "react";
import RecommendedTopics from "./recommended-topics";

export const SideContent = () => {
  return (
    <div className="invisible w-72 border-l px-5 pt-[25px] dark:border-white/10 md:visible lg:min-h-[calc(100vh-65px)]">
      <RecommendedTopics />
    </div>
  );
};
