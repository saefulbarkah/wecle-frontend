"use client";

import React, { useEffect, useState } from "react";
import { useFindDraft } from "../../api/get-draft-article";
import { useSearchParams } from "next/navigation";
import { useIsMutating } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const EditorArticle = dynamic(
  () => import("./Editor/Editor").then((data) => data.Editor),
  {
    ssr: false,
  },
);

export const CreateArticle = () => {
  const isPublishing = useIsMutating({ mutationKey: ["create-article"] });
  const query = useSearchParams();
  const [paramId, setParamId] = useState<string | null>(null);
  const { data: article, isLoading } = useFindDraft({
    id: paramId,
  });
  const draftId = query.get("draftId");

  useEffect(() => {
    setParamId(draftId);
  }, [draftId]);

  return (
    <>
      <div className="relative h-[calc(100vh-60px)] overflow-y-auto">
        <div className="container max-w-5xl">
          {isLoading && (
            <>
              <div className="absolute inset-0 z-50 mt-[60px] cursor-not-allowed backdrop-blur-sm"></div>
            </>
          )}
          <EditorArticle
            article={article}
            isPublishing={Boolean(isPublishing)}
          />
        </div>
      </div>
    </>
  );
};
