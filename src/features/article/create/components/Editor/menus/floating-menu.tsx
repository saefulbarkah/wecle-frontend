"use client";
import { Button } from "@/components/ui/button";
import { Editor, FloatingMenu as Menu } from "@tiptap/react";
import { ImagePlus, LucidePlus } from "lucide-react";
import React, { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDropzone, FileRejection, ErrorCode } from "react-dropzone";
import toast from "react-hot-toast";
import { create } from "zustand";

type floatingProps = {
  editor: Editor | null;
};

type State = {
  isOpen: boolean;
};
type Action = {
  setOpen: (val: boolean) => void;
  toggle: () => void;
};

const useFloatingState = create<State & Action>((set) => ({
  isOpen: false,
  setOpen: (val) => set({ isOpen: val }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const FloatingMenu = ({ editor }: floatingProps) => {
  const floating = useFloatingState((state) => state);

  if (!editor) return;

  return (
    <Menu
      editor={editor}
      className="-translate-x-[200%]"
      tippyOptions={{ duration: 100 }}
    >
      <div className="relative">
        <div className="flex h-full w-full items-center">
          <Button
            variant={floating.isOpen ? "secondary" : "outline"}
            className={`cursor-pointer rounded-full border-slate-900/50 transition ${
              floating.isOpen && "rotate-45"
            }`}
            size={"icon"}
            onClick={() => floating.toggle()}
          >
            <LucidePlus className={`transition `} />
          </Button>

          <AnimatePresence>
            {floating.isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, cursor: "none", pointerEvents: "none" }}
                className="absolute -right-6 translate-x-full"
              >
                <div className="min-w-[400px] bg-white dark:bg-dark">
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

// upload image component
type uploadImageProps = React.PropsWithChildren & floatingProps & {};

const UploadImage = ({ editor }: uploadImageProps) => {
  const floating = useFloatingState((state) => state);

  const onDrop = useCallback(
    (acceptedFiles: File[], FileRejection: FileRejection[]) => {
      FileRejection.map((item) => {
        item.errors.map(({ code, message }) => {
          switch (code) {
            case ErrorCode.FileTooLarge:
              toast.error(message);
              break;
            case ErrorCode.FileInvalidType:
              toast.error("Invalid image format");
              break;

            default:
              // Handle other or unknown error codes
              console.error(`Unknown error code: ${code}`);
              break;
          }
        });
      });

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          editor?.commands.setImage({
            src: result,
            alt: file.name,
          });
        };
        reader.readAsDataURL(file);
        setTimeout(() => {
          editor?.commands.enter();
        }, 200);
      }
      floating.setOpen(false);
    },
    [],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    maxSize: 5242880,
    maxFiles: 1,
    noDrag: true,
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".webp"],
    },
  });

  return (
    <label className="relative" {...getRootProps}>
      <input type="file" className="peer sr-only" {...getInputProps} />
      <Button
        variant={"outline"}
        className="cursor-pointer rounded-full border-slate-900/50"
        size={"icon"}
        onClick={open}
      >
        <ImagePlus />
      </Button>
    </label>
  );
};
