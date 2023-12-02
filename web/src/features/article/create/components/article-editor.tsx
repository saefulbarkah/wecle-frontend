'use client';

import React, { useEffect, useState } from 'react';
import { ContentEditor, TitleEditor } from './Editor';
import { useFindDraft } from '../../api/get-draft-article';
import { useSearchParams } from 'next/navigation';
import { useIsMutating } from '@tanstack/react-query';
import { useArticleState } from '@/stores/article-store';

export const CreateArticle = () => {
  const isPublishing = useIsMutating({ mutationKey: ['create-article'] });
  const query = useSearchParams();
  const [paramId, setParamId] = useState<string | null>(null);
  const { data: article, isLoading } = useFindDraft({
    id: paramId,
  });
  const draftId = query.get('draftId');

  useEffect(() => {
    setParamId(draftId);
  }, [draftId]);

  return (
    <>
      <div className="h-[calc(100vh-60px)] overflow-y-auto">
        <div className="container max-w-5xl">
          {isLoading && (
            <>
              <div className="absolute inset-0 backdrop-blur-sm z-50 mt-[60px] cursor-not-allowed"></div>
            </>
          )}
          <TitleEditor data={article} editable={Boolean(!isPublishing)} />
          <ContentEditor data={article} editable={Boolean(!isPublishing)} />
        </div>
      </div>
    </>
  );
};
