import React from "react";
import TitleEditor from "./title-editor";
import ContentEditor from "./content-editor";
import UploadThumbnail from "./upload-thumbnail";
import { ArticleTypeResponse } from "@/types";

type TEditor = {
  article?: ArticleTypeResponse;
  isPublishing: Boolean;
};

export const Editor = ({ article, isPublishing }: TEditor) => {
  return (
    <>
      <UploadThumbnail data={article} />
      <TitleEditor data={article} editable={!isPublishing} />
      <ContentEditor data={article} editable={!isPublishing} />
    </>
  );
};
