'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDraft } from '@/hooks';
import React, { useState } from 'react';

export const PublishMenu = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const { data } = useDraft();

  const handlePublish = () => {
    if (!data) return;
    console.log('published');
  };

  return (
    <div className="relative">
      <Popover
        open={data?.content ? false : showAlert}
        onOpenChange={setShowAlert}
      >
        <PopoverTrigger asChild>
          <Button
            variant={'success'}
            size={'sm'}
            className={`${data?.content ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => handlePublish()}
          >
            Publish
          </Button>
        </PopoverTrigger>
        <PopoverContent className="relative translate-y-4 rounded-lg shadow-sm">
          <i className="absolute pointer-events-none cursor-none top-0 inset-x-0 translate-x-[80%] sm:translate-x-[75%] md:translate-x-[75%] lg:translate-x-[48%] -translate-y-3">
            <svg xmlns="http://www.w3.org/2000/svg">
              {/* Main Triangle */}
              <polygon
                points="7.538,2 1,12 14,12"
                fill="white" // Make the triangle transparent to show only the border
              />

              {/* Top-Left Border */}
              <polygon
                points="7.538,2 1,12 7.538,2"
                stroke="rgba(100, 116, 139, 0.2)" // Border color
                strokeWidth="0.7" // Border width
                fill="transparent" // Make the triangle transparent to show only the border
              />

              {/* Right Border */}
              <polygon
                points="7.538,2 14,12 7.538,2"
                stroke="rgba(100, 116, 139, 0.2)" // Border color
                strokeWidth="0.7" // Border width
                fill="transparent" // Make the triangle transparent to show only the border
              />
            </svg>
          </i>
          <p className="text-center">
            you are disallowed to publish when content is nothing
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
