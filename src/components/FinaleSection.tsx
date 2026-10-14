import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Shield, Check, RefreshCw, Smile } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface FinaleSectionProps {
  recipientName: string;
  senderName: string;
  onResetProgress: () => void;
}

export default function FinaleSection({
  recipientName,
  senderName,
  onResetProgress,
}: FinaleSectionProps) {
  const [forgiveState, setForgiveState] = useState<'pending' | 'forgiven' | 'needs_time'>('pending');
  const [hugCount, setHugCount] = useState<number>(0);
  const [completedVows, setCompletedVows] = useState<number[]>([0, 1, 2, 3, 4]);

  const displayName = recipientName.trim() || 'baby doll';
  const displaySender = senderName.trim() || 'Your loving boyfriend';

  const handleForgive = () => {
    setForgiveState('forgiven');
    romanticAudio.playHarpFlourish();

    // Trigger sweet rose petal & golden confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fde68a', '#ffffff'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ['#e11d48', '#fda4af', '#fef08a'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ['#e11d48', '#fda4af', '#fef08a'],
        });
      }, 350);
    } catch {
      // Confetti fallback
    }
  };

  const handleNeedsTime = () => {
    setForgiveState('needs_time');
    romanticAudio.playChime();
  };

  const handleSendHug = () => {
    setHugCount((prev) => prev + 1);
    romanticAudio.playChime();
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#fb7185', '#fda4af'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const toggleVow = (index: number) => {
    setCompletedVows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const vows = [
    `I vow to always listen patiently to understand your feelings, never to defend my ego.`,
    `I vow to choose gentleness, tenderness, and warmth in every conversation we share.`,
    `I vow never to let the sun set while leaving your heart feeling alone or unheard.`,
    `I vow to cherish and protect you, my precious ${displayName}, above all else in this world.`,
    `I vow to constantly work on becoming the partner who brings peace and joy to your life.`,
  ];

  return (
    <section id="finale" className="relative my-20 mx-auto max-w-4xl px-4 sm:px-6">
      {/* Decorative Aura */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-amber-500/20 blur-2xl opacity-60 pointer-events-none" />

      <div className="relative rounded-3xl border border-rose-500/40 bg-gradient-to-b from-[#201127]/95 via-[#1a0d20]/95 to-[#130b17] p-6 sm:p-12 shadow-2xl backdrop-blur-xl">
        {/* Subtle Top Seal */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-400/40 bg-rose-950/60 shadow-[0_0_25px_rgba(244,63,94,0.3)] mb-4">
            <Heart className="h-7 w-7 fill-rose-500 text-rose-400 animate-pulse" />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-300/80 mb-2">
            <span>The Heartfelt Climax</span>
            <span aria-hidden="true">·</span>
            <span>Unconditional Apology</span>
          </div>

          {/* EXACT REQUIRED PHRASE IN MONUMENTAL EDITORIAL SERIF */}
          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 text-balance leading-tight py-2">
            Sorry my dear baby doll
          </h1>
          <p className="font-cormorant italic text-lg sm:text-2xl text-rose-300/90 mt-2">
            "With every beat of my heart, I am truly and deeply sorry."
          </p>
        </div>

        {/* The Handwritten Style Letter */}
        <div className="relative rounded-2xl border border-rose-900/40 bg-[#160d1b]/80 p-6 sm:p-10 shadow-inner font-light leading-relaxed text-stone-200 text-sm sm:text-base space-y-5">
          <p className="font-cormorant text-xl text-rose-200 font-semibold italic">
            Dearest {displayName},
          </p>

          <p>
            If I could gather every star in the sky to spell out how genuinely sorry I am, it still wouldn't be enough to match the regret I carry in my soul. You are the gentlest, sweetest part of my entire existence. When I caused you pain, I didn't just make a mistake—I broke my own promise to be your safe harbor.
          </p>

          <p>
            I see so clearly now how deeply my thoughtlessness hurt you. I see the quiet ache that settled in your chest, and it breaks me inside to know that I was the cause. You never deserved even a moment of doubt, sadness, or frustration from me. You deserve patience that never runs dry, words that feel like a warm hug, and a partner who treats your heart like the priceless jewel it is.
          </p>

          <p>
            I don't ask you to simply forget what happened—I ask for the chance to show you, with every passing day, that I have learned, that I have listened, and that my devotion to you is unbreakable. You are my light, my comfort, and my forever baby doll.
          </p>

          <p className="font-cormorant text-lg sm:text-xl italic text-rose-300/90 pt-3 border-t border-rose-900/30">
            Forever yours, with all my love, regret, and devotion,
            <br />
            <strong className="font-editorial text-white text-base sm:text-lg not-italic block mt-1">
              — {displaySender}
            </strong>
          </p>
        </div>

        {/* Unbreakable Vows List */}
        <div id="promises" className="mt-10 rounded-2xl border border-rose-900/30 bg-rose-950/20 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-rose-400 mb-4">
            <Shield className="h-4 w-4" />
            <span>5 Sacred Vows Made Directly To You</span>
          </div>
          <div className="space-y-3">
            {vows.map((vow, idx) => {
              const isChecked = completedVows.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleVow(idx)}
                  className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'border-rose-500/40 bg-rose-950/40 text-rose-100'
                      : 'border-rose-900/20 bg-stone-900/30 text-stone-400'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isChecked
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-stone-600 bg-transparent'
                    }`}
                  >
                    {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm leading-relaxed">{vow}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Response Buttons */}
        <div className="mt-12 text-center">
          <h3 className="font-editorial text-xl sm:text-2xl text-white mb-2">
            Will you forgive me, my darling {displayName}?
          </h3>
          <p className="text-xs sm:text-sm text-rose-300/70 mb-6 font-light">
            Please choose the words that match your heart right now:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleForgive}
              className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-xl shadow-rose-900/50 hover:from-rose-500 hover:to-pink-500 hover:scale-105 active:scale-95 transition-all"
            >
              <Heart className="h-5 w-5 fill-white text-white" />
              <span>I Forgive You, Let's Hug ❤️</span>
            </button>

            <button
              onClick={handleNeedsTime}
              className="flex items-center gap-2 rounded-2xl border border-rose-800/50 bg-rose-950/30 px-6 py-4 text-xs sm:text-sm font-medium text-rose-300 hover:border-rose-600 hover:bg-rose-900/40 hover:text-white transition-all active:scale-95"
            >
              <Smile className="h-4 w-4" />
              <span>I Need A Little Time / Come Hold Me</span>
            </button>
          </div>

          {/* Virtual Hug Button */}
          <div className="mt-8 pt-6 border-t border-rose-900/30 flex flex-col items-center">
            <button
              onClick={handleSendHug}
              className="inline-flex items-center gap-2 rounded-full border border-pink-700/40 bg-pink-950/30 px-4 py-2 text-xs text-pink-300 hover:bg-pink-900/40 hover:text-pink-100 transition-colors"
            >
              <span>Send A Warm Virtual Hug</span>
              <span className="rounded-full bg-pink-800/60 px-2 py-0.5 text-[10px] font-bold text-white">
                {hugCount}
              </span>
            </button>
            {hugCount > 0 && (
              <p className="mt-2 text-xs text-rose-300/80 italic animate-fade-in">
                Sending warm, tender embrace #{hugCount} straight to you!
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Reconciliation Modal / Banner */}
        <AnimatePresence>
          {forgiveState === 'forgiven' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-[#141d18]/90 p-6 sm:p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3 border border-emerald-500/30">
                <Sparkles className="h-6 w-6" />
              </div>
              <h4 className="font-editorial text-2xl text-emerald-200 font-medium">
                Thank You For Your Gracious Heart, My Baby Doll
              </h4>
              <p className="mt-2 text-sm text-stone-200 max-w-lg mx-auto leading-relaxed">
                Your forgiveness is the most precious gift I could ever receive. I promise to spend every day protecting your peace, making you smile, and never letting you feel taken for granted. Come into my arms—everything is going to be wonderful.
              </p>
            </motion.div>
          )}

          {forgiveState === 'needs_time' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 to-[#1e1713]/90 p-6 sm:p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 mb-3 border border-amber-500/30">
                <Heart className="h-6 w-6 text-amber-300" />
              </div>
              <h4 className="font-editorial text-2xl text-amber-200 font-medium">
                Take All The Time You Need, My Sweetheart
              </h4>
              <p className="mt-2 text-sm text-stone-200 max-w-lg mx-auto leading-relaxed">
                Your feelings are completely valid and respected. There is no rush, no pressure, and no expectations. I will stay right here by your side, holding space for you, waiting patiently with love and open arms whenever you are ready.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiet Reset option */}
        <div className="mt-10 text-center">
          <button
            onClick={onResetProgress}
            className="inline-flex items-center gap-1.5 text-xs text-rose-400/60 hover:text-rose-300 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Re-read journey from Chapter 01</span>
          </button>
        </div>
      </div>
    </section>
  );
}
