'use client';
import { Button } from '@/components/ui/button';
import { Editor, FloatingMenu as Menu } from '@tiptap/react';
import { ImagePlus, LucidePlus } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';

type props = {
  editor: Editor | null;
};

export const FloatingMenu = ({ editor }: props) => {
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
                    <Button
                      variant={'outline'}
                      className="rounded-full cursor-pointer border-slate-900/50"
                      size={'icon'}
                      onClick={() => alert('upload image')}
                    >
                      <ImagePlus />
                    </Button>
                    <Button
                      variant={'outline'}
                      className="rounded-full cursor-pointer border-slate-900/50"
                      size={'icon'}
                      onClick={() => alert('upload image')}
                    >
                      <ImagePlus />
                    </Button>
                    <Button
                      variant={'outline'}
                      className="rounded-full cursor-pointer border-slate-900/50"
                      size={'icon'}
                      onClick={() => alert('upload image')}
                    >
                      <ImagePlus />
                    </Button>
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
