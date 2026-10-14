import { motion } from 'motion/react';
import { ApologyMessage } from '../types';
import { CheckCircle2, ChevronRight, Heart, Sparkles, Compass, HeartCrack, ShieldCheck, HeartHandshake } from 'lucide-react';

interface MessageCardProps {
  message: ApologyMessage;
  isUnlocked: boolean;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onUnlockNext: () => void;
  isLastChapter: boolean;
  recipientName: string;
}

export default function MessageCard({
  message,
  isUnlocked,
  isActive,
  isCompleted,
  onSelect,
  onUnlockNext,
  isLastChapter,
  recipientName,
}: MessageCardProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="h-5 w-5 text-rose-400" />;
      case 'HeartCrack':
        return <HeartCrack className="h-5 w-5 text-rose-400" />;
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-rose-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5 text-rose-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="h-5 w-5 text-rose-400" />;
      default:
        return <Heart className="h-5 w-5 text-rose-400" />;
    }
  };

  // Locked card preview
  if (!isUnlocked) {
    return (
      <div className="relative rounded-2xl border border-rose-950/60 bg-[#170e1c]/40 p-6 backdrop-blur-sm opacity-50 transition-all select-none">
        <div className="flex items-center justify-between text-xs text-rose-300/50 mb-3">
          <span>{message.chapter}</span>
          <span aria-hidden="true">·</span>
          <span>Locked</span>
        </div>
        <h3 className="font-editorial text-lg text-stone-400">
          Chapter {message.id} · Awaiting Your Reading
        </h3>
        <p className="mt-2 text-xs text-stone-500 italic">
          Please finish reading the preceding chapter to unlock this heartfelt confession.
        </p>
      </div>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onSelect}
      className={`group relative rounded-2xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-300 cursor-pointer ${
        isActive
          ? 'border-rose-500/50 bg-[#1c1122]/90 shadow-[0_10px_35px_-5px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/20'
          : 'border-rose-900/30 bg-[#160d1b]/70 hover:border-rose-700/40 hover:bg-[#1a0f20]'
      }`}
    >
      {/* Top clean unboxed metadata with typographic separators */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-rose-300/70 mb-4">
        <div className="flex items-center gap-2">
          {getIcon(message.iconName)}
          <span className="font-medium tracking-wide text-rose-300">{message.chapter}</span>
          <span aria-hidden="true" className="text-rose-800">·</span>
          <span>Apology Letter {message.id} of 5</span>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-xs text-rose-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Read with love</span>
          </div>
        )}
      </div>

      {/* Primary Headline */}
      <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-white mb-4">
        {message.title}
      </h3>

      {/* Main Narrative Reflection */}
      <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
        <p className="first-letter:text-3xl first-letter:font-editorial first-letter:text-rose-400 first-letter:float-left first-letter:mr-2">
          {message.reflection.replace('baby doll', recipientName || 'baby doll')}
        </p>

        {/* Confession block with delicate all-around border (no thick left accent border) */}
        <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4 sm:p-5">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-1">
            My Honest Confession
          </div>
          <p className="text-xs sm:text-sm italic text-rose-200/90 leading-relaxed">
            "{message.confession.replace('baby doll', recipientName || 'baby doll')}"
          </p>
        </div>

        {/* Heartfelt Quote */}
        <p className="font-cormorant italic text-base sm:text-lg text-rose-300/80 pt-2 border-t border-rose-900/20">
          — {message.heartfeltQuote}
        </p>
      </div>

      {/* Action to proceed to next chapter */}
      {isActive && (
        <div className="mt-6 pt-5 border-t border-rose-900/30 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-stone-400">
            {isLastChapter ? 'Ready to open the Apology Bouquet & Letter?' : `Next: Chapter 0${message.id + 1}`}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUnlockNext();
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-lg shadow-rose-900/30 hover:from-rose-500 hover:to-pink-500 transition-all active:scale-[0.98]"
          >
            <span>{isLastChapter ? 'Continue to Apology Bouquet' : 'I Understand, Next Chapter'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.article>
  );
}
