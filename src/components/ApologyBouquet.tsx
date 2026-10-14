import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BouquetFlower } from '../types';
import { Sparkles, Check, Heart, X, Flower2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface ApologyBouquetProps {
  flowers: BouquetFlower[];
  bloomedFlowerIds: string[];
  onBloomFlower: (id: string) => void;
  onProceedToFinale: () => void;
  recipientName: string;
}

export default function ApologyBouquet({
  flowers,
  bloomedFlowerIds,
  onBloomFlower,
  onProceedToFinale,
  recipientName,
}: ApologyBouquetProps) {
  const [selectedFlower, setSelectedFlower] = useState<BouquetFlower | null>(null);

  const handleFlowerClick = (flower: BouquetFlower) => {
    onBloomFlower(flower.id);
    setSelectedFlower(flower);
    romanticAudio.playBloom();
  };

  const isAllBloomed = flowers.length > 0 && flowers.every((f) => bloomedFlowerIds.includes(f.id));

  return (
    <section id="bouquet" className="relative my-16 rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#1b1021]/80 via-[#150d1b]/90 to-[#120c15] p-6 sm:p-10 backdrop-blur-md">
      {/* Editorial Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">
          <Flower2 className="h-4 w-4" />
          <span>Interactive Apology Bouquet</span>
          <span aria-hidden="true">·</span>
          <span>5 Symbolic Petals of Remorse</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium tracking-tight">
          A Garden of Sincere Regrets & Vows
        </h2>
        <p className="mt-3 text-sm sm:text-base text-rose-200/70 font-light leading-relaxed">
          Each flower in this bouquet holds an unspoken confession and a dedicated promise.
          Tap each bloom to open its petals and read the sorry note meant only for you, {recipientName || 'baby doll'}.
        </p>

        {/* Counter indicator */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-800/40 bg-rose-950/40 px-4 py-1.5 text-xs text-rose-200">
          <Sparkles className="h-3.5 w-3.5 text-rose-400" />
          <span>
            Flowers Unfolded:{' '}
            <strong className="text-white font-semibold">
              {bloomedFlowerIds.length} of {flowers.length}
            </strong>
          </span>
        </div>
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {flowers.map((flower, idx) => {
          const isBloomed = bloomedFlowerIds.includes(flower.id);
          return (
            <motion.div
              key={flower.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFlowerClick(flower)}
              className={`group relative flex flex-col items-center justify-between rounded-2xl border p-5 text-center cursor-pointer transition-all duration-300 ${
                isBloomed
                  ? 'border-rose-500/50 bg-rose-950/30 shadow-[0_4px_20px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/20'
                  : 'border-rose-900/30 bg-[#170e1c]/60 hover:border-rose-700/50 hover:bg-[#1d1124]'
              }`}
            >
              {/* Bloomed Badge */}
              {isBloomed && (
                <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              )}

              {/* Flower Botanical Illustration (SVG) */}
              <div className="relative my-4 flex h-24 w-24 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full blur-xl transition-opacity duration-500"
                  style={{
                    backgroundColor: flower.colorHex,
                    opacity: isBloomed ? 0.35 : 0.12,
                  }}
                />
                <svg
                  viewBox="0 0 100 100"
                  className={`h-20 w-20 transition-transform duration-500 ${
                    isBloomed ? 'scale-110 rotate-3' : 'scale-95 group-hover:scale-105'
                  }`}
                >
                  {/* Stem and leaf */}
                  <path
                    d="M 50 65 Q 52 82 50 95"
                    stroke="#15803d"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 50 80 Q 64 76 68 82 Q 62 88 50 83"
                    fill="#16a34a"
                    opacity="0.8"
                  />

                  {/* 5 Petals */}
                  {[0, 72, 144, 216, 288].map((angle, pIdx) => (
                    <g key={pIdx} transform={`rotate(${angle} 50 48)`}>
                      <ellipse
                        cx="50"
                        cy={isBloomed ? '30' : '34'}
                        rx={isBloomed ? '14' : '10'}
                        ry={isBloomed ? '19' : '14'}
                        fill={flower.colorHex}
                        opacity={isBloomed ? '0.95' : '0.75'}
                        stroke="#831843"
                        strokeWidth="0.5"
                      />
                    </g>
                  ))}

                  {/* Center core */}
                  <circle
                    cx="50"
                    cy="48"
                    r={isBloomed ? '9' : '7'}
                    fill="#fbbf24"
                    stroke="#d97706"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Text Info */}
              <div className="mt-2 w-full">
                <span className="text-[11px] font-medium uppercase tracking-wider text-rose-300/80 block">
                  Flower {idx + 1}
                </span>
                <h4 className="font-editorial text-base sm:text-lg font-medium text-white mt-0.5 truncate">
                  {flower.name}
                </h4>
                <p className="mt-1 text-xs text-rose-300/70 italic line-clamp-1">
                  {flower.symbolism}
                </p>
              </div>

              <div className="mt-4 w-full pt-3 border-t border-rose-900/30 text-xs font-medium text-rose-400 group-hover:text-rose-200 transition-colors">
                {isBloomed ? 'Tap to Re-read Note' : 'Tap to Bloom Petals'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress banner & Proceed action when all flowers are opened */}
      {isAllBloomed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-rose-950/60 p-6 text-center backdrop-blur-md"
        >
          <div className="flex items-center justify-center gap-2 text-rose-400 mb-2">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold">
              The Entire Bouquet is Now Bloomed for You
            </span>
          </div>
          <p className="text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
            Every flower has spoken its piece. There is only one final thing left to say from the deepest depths of my soul...
          </p>
          <button
            onClick={onProceedToFinale}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-rose-900/40 hover:from-rose-500 hover:to-pink-500 transition-all active:scale-[0.98]"
          >
            <span>Read The Final Climax Letter</span>
            <Sparkles className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {/* Modal / Card Reveal for Active Flower */}
      <AnimatePresence>
        {selectedFlower && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-3xl border border-rose-500/40 bg-[#1d1223] p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedFlower(null)}
                aria-label="Close flower letter"
                className="absolute top-5 right-5 rounded-full border border-rose-800/40 p-1.5 text-rose-300 hover:bg-rose-900/30 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center border border-rose-500/30 shadow-md"
                  style={{ backgroundColor: selectedFlower.colorHex + '33' }}
                >
                  <Flower2 className="h-5 w-5 text-rose-300" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold">
                    {selectedFlower.symbolism}
                  </span>
                  <h3 className="font-editorial text-2xl text-white font-medium">
                    {selectedFlower.name}
                  </h3>
                </div>
              </div>

              <div className="my-5 rounded-2xl border border-rose-900/50 bg-[#160d1b] p-5">
                <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-2">
                  My Sincere Sorry Note
                </div>
                <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-light italic">
                  "{selectedFlower.note.replace('baby doll', recipientName || 'baby doll')}"
                </p>
              </div>

              <div className="rounded-xl border border-amber-900/30 bg-amber-950/20 p-4">
                <div className="text-xs uppercase tracking-wider text-amber-300/90 font-medium mb-1">
                  My Solemn Vow to You
                </div>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  {selectedFlower.vow.replace('baby doll', recipientName || 'baby doll')}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedFlower(null)}
                  className="rounded-xl bg-rose-600/90 px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-rose-500 transition-colors"
                >
                  Keep in My Heart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
