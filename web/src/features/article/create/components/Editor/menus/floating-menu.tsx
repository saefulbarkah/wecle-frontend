'use client';
import { Button } from '@/components/ui/button';
import { Editor, FloatingMenu as Menu } from '@tiptap/react';
import { ImagePlus, LucidePlus } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { nanoid } from 'nanoid';

type floatingProps = {
  editor: Editor | null;
};

export const FloatingMenu = ({ editor }: floatingProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  if (!editor) return;

  return (
    <Menu
      editor={editor}
      className="-translate-x-[200%]"
      tippyOptions={{ duration: 100 }}
    >
      <div className="relative">
        <div className="flex items-center h-full w-full">
          <Button
            variant={isOpen ? 'secondary' : 'outline'}
            className={`transition rounded-full cursor-pointer border-slate-900/50 ${
              isOpen && 'rotate-45'
            }`}
            size={'icon'}
            onClick={() => setOpen((state) => !state)}
          >
            <LucidePlus className={`transition `} />
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, cursor: 'none', pointerEvents: 'none' }}
                className="absolute -right-6 translate-x-full "
              >
                <div className="min-w-[400px] bg-white">
                  <div className="flex items-center gap-3">
                    <UploadImage editor={editor} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Menu>
  );
};

type uploadImageProps = React.PropsWithChildren & floatingProps & {};
const UploadImage = ({ editor }: uploadImageProps) => {
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileName = file.name.split('.')[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');

      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = reader.result as string;
            editor?.chain().focus().setImage({ src: result }).run();
          };
        },
        'image/jpeg',
        0.5
      );
    };
  };

  return (
    <label className="relative">
      <input
        type="file"
        ref={fileRef}
        className="hidden peer"
        onChange={handleUploadImage}
      />
      <Button
        variant={'outline'}
        className="rounded-full cursor-pointer border-slate-900/50"
        size={'icon'}
        onClick={() => fileRef.current?.click()}
      >
        <ImagePlus />
      </Button>
    </label>
  );
};
