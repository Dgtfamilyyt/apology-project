import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Check } from 'lucide-react';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  senderName: string;
  onSave: (recipient: string, sender: string) => void;
}

export default function PersonalizeModal({
  isOpen,
  onClose,
  recipientName,
  senderName,
  onSave,
}: PersonalizeModalProps) {
  const [recipient, setRecipient] = useState(recipientName);
  const [sender, setSender] = useState(senderName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(recipient.trim() || 'baby doll', sender.trim() || 'Your loving boyfriend');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-[#1d1123] p-6 sm:p-8 shadow-2xl text-left"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 rounded-full border border-rose-800/40 p-1.5 text-rose-300 hover:bg-rose-900/30 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
              <span className="text-xs font-semibold uppercase tracking-widest">Personalize Names</span>
            </div>

            <h3 className="font-editorial text-2xl text-white font-medium mb-1">
              Personalize Your Apology
            </h3>
            <p className="text-xs text-rose-200/70 mb-6 font-light">
              Customize the affectionate nickname and your signature across all 5 chapters and the finale.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Her Nickname / Name (e.g. Baby Doll, My Darling, Princess)
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="baby doll"
                  className="w-full rounded-xl border border-rose-900/50 bg-[#160d1b] px-4 py-2.5 text-sm text-white placeholder-rose-400/40 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200 mb-1.5">
                  Your Name / Signature
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your loving boyfriend"
                  className="w-full rounded-xl border border-rose-900/50 bg-[#160d1b] px-4 py-2.5 text-sm text-white placeholder-rose-400/40 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-rose-900/40 px-4 py-2 text-xs text-rose-300 hover:bg-rose-950/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:from-rose-500 hover:to-pink-500 transition-all"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      <span>Updated!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Apply Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
