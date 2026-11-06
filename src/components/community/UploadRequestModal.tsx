import React, { useState } from 'react';
import {
  X,
  Send,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Shield,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';
import { compressImage } from '../../utils/imageCompression';

interface UploadRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadRequestModal: React.FC<UploadRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, submitUploadRequest } = useCommunity();

  const [reqType, setReqType] = useState<'photo' | 'note' | 'text'>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  // Direct image upload from device with auto-compression
  const handleDeviceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 800, 800, 0.75);
      setMediaUrl(compressed);
    } catch (err) {
      console.warn('Image compression failed', err);
    }
  };

  const handleDownloadImage = () => {
    if (!mediaUrl) return;
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = `student_upload_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const result = submitUploadRequest(
      reqType,
      title.trim(),
      content.trim(),
      mediaUrl.trim() || undefined
    );

    if (result.success) {
      setSubmittedFeedback(result.message);
      setTimeout(() => {
        setSubmittedFeedback(null);
        setTitle('');
        setContent('');
        setMediaUrl('');
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-[#666666] hover:text-[#080808] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-[#080808]" />
          <h3 className="text-xl font-bold text-[#080808]">Send Content to Admin</h3>
        </div>

        <p className="text-xs text-[#555555] leading-relaxed mb-6">
          Students cannot directly publish to the public feed. Your submission will be reviewed by the Main Admin before appearing publicly.
        </p>

        {submittedFeedback ? (
          <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto" />
            <h4 className="text-sm font-bold text-[#080808]">Submission Sent to Admin!</h4>
            <p className="text-xs text-[#15803D]">{submittedFeedback}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Type selector */}
            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1.5 font-semibold">
                What are you submitting?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'note', label: 'Study Note', icon: FileText },
                  { id: 'photo', label: 'Photo / Image', icon: ImageIcon },
                  { id: 'text', label: 'Text / Tip', icon: MessageSquare },
                ].map((t) => {
                  const Icon = t.icon;
                  const isSel = reqType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setReqType(t.id as any)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#080808] text-white border-[#080808]'
                          : 'bg-[#F9FAFB] text-[#666666] border-[#E5E7EB] hover:text-[#080808]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-semibold text-[11px]">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold">
                Title / Topic
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. 5 Common Traps in C Pointers for Beginners"
                className="w-full px-3 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold">
                Content Details / Notes
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
                placeholder="Write your explanation, notes, or tips for the community..."
                className="w-full px-3 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
              />
            </div>

            {/* Direct Image Upload from Device */}
            {reqType === 'photo' && (
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold">
                  Upload Image Directly from Your Device
                </label>

                {mediaUrl ? (
                  <div className="relative rounded-xl border border-[#D1D5DB] p-3 bg-[#F9FAFB] space-y-2">
                    <div className="h-32 w-full rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                      <img
                        src={mediaUrl}
                        alt="Selected Upload Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Image Attached
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleDownloadImage}
                          className="px-2 py-1 rounded bg-[#FFFFFF] border border-[#D1D5DB] hover:bg-[#080808] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                          title="Save image to your device storage"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMediaUrl('')}
                          className="text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D1D5DB] hover:border-[#080808] rounded-xl p-4 text-center cursor-pointer transition-colors bg-[#F9FAFB] hover:bg-[#FFFFFF]">
                    <ImageIcon className="w-6 h-6 text-[#666666] mb-1.5" />
                    <span className="font-semibold text-[#080808] text-xs">
                      Click to Choose Image from Your Device
                    </span>
                    <span className="text-[10px] text-[#888888] font-mono mt-0.5">
                      Select JPG, PNG, WEBP directly from computer/phone storage
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDeviceImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}

            <div className="pt-2 text-[11px] text-[#666666] font-mono">
              Submitting as: <strong className="text-[#080808]">{currentUser?.name || 'Guest'}</strong> ({currentUser?.email})
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Admin</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
