import React, { useEffect } from 'react';
import { X, ZoomIn, Info } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption?: string;
  credit?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
  credit,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950/80 border-b border-stone-800">
          <div className="flex items-center gap-2 text-stone-200">
            <ZoomIn className="w-4 h-4 text-teal-400" />
            <h3 className="font-serif text-base md:text-lg font-medium text-stone-100 truncate">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close image modal"
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 flex items-center justify-center bg-stone-950 overflow-hidden min-h-[300px] max-h-[68vh]">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[68vh] w-auto max-w-full object-contain select-none"
          />
        </div>

        {/* Bottom Details Bar */}
        {(caption || credit) && (
          <div className="px-5 py-3 bg-stone-950/90 border-t border-stone-800 text-stone-300 text-xs md:text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            {caption && <p className="text-stone-300 italic">{caption}</p>}
            {credit && (
              <span className="text-[11px] text-stone-400 shrink-0 flex items-center gap-1">
                <Info className="w-3 h-3 text-stone-500" />
                {credit}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
