"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type TrailerModulProps = {
  url: string | null;
  onClose: () => void;
  title: string;
};

export const TrailerModul = ({ url, onClose, title }: TrailerModulProps) => {
  return (
    <AnimatePresence>
      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <VisuallyHidden.Root>
              <h2>{title} Trailer</h2>
            </VisuallyHidden.Root>

            <button
              onClick={onClose}
              aria-label="Close trailer"
              className="absolute top-4 right-4 text-white text-4xl z-50 hover:text-red-500 transition-colors drop-shadow-md"
            >
              <IoClose />
            </button>

            <iframe
              src={url}
              title={`${title} official trailer`}
              className="w-full h-full border-none"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
