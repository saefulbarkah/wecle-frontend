import React from "react";
import TitleEditor from "./title-editor";
import ContentEditor from "./content-editor";
import { articleType } from "@/stores/article-store";
import UploadThumbnail from "./upload-thumbnail";

type TEditor = {
  article?: articleType;
  isPublishing: Boolean;
};

export const Editor = ({ article, isPublishing }: TEditor) => {
  return (
    <>
      <UploadThumbnail />
      <TitleEditor data={article} editable={!isPublishing} />
      <ContentEditor data={article} editable={!isPublishing} />
    </>
  );
};
