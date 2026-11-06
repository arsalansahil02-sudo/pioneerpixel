import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#191919] border border-white/60 text-white shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
      <span className="text-xs font-medium tracking-wide">{message}</span>
      <button
        onClick={onClose}
        type="button"
        className="p-1 text-[#888888] hover:text-white rounded transition-colors ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
