import {
  TOptionsUploadMutation,
  useImbbUpload,
} from "@/features/article/api/upload-image";
import { articleType } from "@/stores/article-store";

export const useUploaImage = (options?: TOptionsUploadMutation) => {
  const { mutateAsync: uploadCover } = useImbbUpload({
    onSuccess: () => {
      if (options?.onSuccess) {
        options?.onSuccess();
      }
    },
    onMutate: () => {
      if (options?.onMutate) {
        options?.onMutate();
      }
    },
  });

  const uploadCoverArticle = async (
    article: articleType,
  ): Promise<articleType["cover"]> => {
    let cover: articleType["cover"] = null;
    if (article.cover?.type === "BASE64") {
      const response = await uploadCover({
        image: article.cover.src as string,
      });
      cover = {
        name: response.data.data.title,
        src: response.data.data.url,
        type: "URL",
      };
    } else if (article.cover?.type === "URL") {
      cover = {
        name: article.cover.name,
        src: article.cover.src,
        type: "URL",
      };
    }
    return cover;
  };

  return { uploadCoverArticle };
};
