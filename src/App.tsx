import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_MESSAGES, BOUQUET_FLOWERS } from './data/apologyData';
import { romanticAudio } from './utils/audio';
import HeaderBar from './components/HeaderBar';
import PetalCanvas from './components/PetalCanvas';
import MessageCard from './components/MessageCard';
import ApologyBouquet from './components/ApologyBouquet';
import FinaleSection from './components/FinaleSection';
import PersonalizeModal from './components/PersonalizeModal';
import {
  Heart,
  Sparkles,
  BookOpen,
  Flower2,
  ChevronDown,
  Volume2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // State for customization
  const [recipientName, setRecipientName] = useState(() => {
    return localStorage.getItem('apology_recipient') || 'baby doll';
  });
  const [senderName, setSenderName] = useState(() => {
    return localStorage.getItem('apology_sender') || 'Your loving boyfriend';
  });

  // State for reading progress
  // maxUnlocked: 1 to 5 for messages, 6 for bouquet, 7 for finale
  const [maxUnlocked, setMaxUnlocked] = useState<number>(() => {
    const saved = localStorage.getItem('apology_unlocked');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [activeChapter, setActiveChapter] = useState<number>(() => {
    const saved = localStorage.getItem('apology_unlocked');
    return saved ? Math.min(parseInt(saved, 10), 5) : 1;
  });

  // State for bloomed flowers
  const [bloomedFlowers, setBloomedFlowers] = useState<string[]>(() => {
    const saved = localStorage.getItem('apology_bloomed_flowers');
    return saved ? JSON.parse(saved) : [];
  });

  // Audio playing state
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);

  // Sync state to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('apology_recipient', recipientName);
  }, [recipientName]);

  useEffect(() => {
    localStorage.setItem('apology_sender', senderName);
  }, [senderName]);

  useEffect(() => {
    localStorage.setItem('apology_unlocked', maxUnlocked.toString());
  }, [maxUnlocked]);

  useEffect(() => {
    localStorage.setItem('apology_bloomed_flowers', JSON.stringify(bloomedFlowers));
  }, [bloomedFlowers]);

  // Audio toggle handler
  const handleToggleAudio = () => {
    const playing = romanticAudio.toggleAmbient();
    setIsAudioPlaying(playing);
  };

  // Unlock next message card handler
  const handleUnlockNext = (currentId: number) => {
    romanticAudio.playChime();
    const nextStep = currentId + 1;

    if (nextStep > maxUnlocked) {
      setMaxUnlocked(nextStep);
    }

    if (nextStep <= 5) {
      setActiveChapter(nextStep);
      // Smooth scroll to next card
      setTimeout(() => {
        const nextElement = document.getElementById(`chapter-${nextStep}`);
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      // Reached bouquet stage
      setTimeout(() => {
        const bouquetElement = document.getElementById('bouquet');
        if (bouquetElement) {
          bouquetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Flower bloom handler
  const handleBloomFlower = (flowerId: string) => {
    if (!bloomedFlowers.includes(flowerId)) {
      const updated = [...bloomedFlowers, flowerId];
      setBloomedFlowers(updated);

      if (updated.length >= BOUQUET_FLOWERS.length && maxUnlocked < 7) {
        setMaxUnlocked(7);
      }
    }
  };

  // Proceed directly to finale
  const handleProceedToFinale = () => {
    if (maxUnlocked < 7) {
      setMaxUnlocked(7);
    }
    romanticAudio.playChime();
    setTimeout(() => {
      const finaleElement = document.getElementById('finale');
      if (finaleElement) {
        finaleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Reset progress handler
  const handleResetProgress = () => {
    setMaxUnlocked(1);
    setActiveChapter(1);
    setBloomedFlowers([]);
    localStorage.removeItem('apology_unlocked');
    localStorage.removeItem('apology_bloomed_flowers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePersonalize = (newRecipient: string, newSender: string) => {
    setRecipientName(newRecipient);
    setSenderName(newSender);
  };

  return (
    <div className="relative min-h-screen bg-[#120c15] text-[#fce7f3] antialiased selection:bg-rose-500/30 selection:text-white">
      {/* Background Petal Particle Simulation */}
      <PetalCanvas />

      {/* Top Bar Contract Navigation */}
      <HeaderBar
        recipientName={recipientName}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
      />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Hero Section */}
        <section className="text-center pt-8 pb-16 max-w-3xl mx-auto">
          {/* Subtle Heart Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-4 py-1.5 text-xs text-rose-300 backdrop-blur-md mb-6">
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="font-medium tracking-wide">A Sincere Confession of Remorse & Love</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white text-balance leading-[1.1]">
            To My Dearest <span className="italic text-rose-300">{recipientName}</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-rose-200/80 font-light leading-relaxed max-w-2xl mx-auto">
            I built this space for you because a standard message could never hold the weight of my regret.
            Take your time reading each chapter below. There are no excuses here—only pure honesty, deep reflection, and a heart that loves you beyond measure.
          </p>

          {/* Audio invitation if music is currently off */}
          {!isAudioPlaying && (
            <button
              onClick={handleToggleAudio}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/30 px-5 py-2.5 text-xs text-rose-300 hover:border-rose-400 hover:bg-rose-900/40 hover:text-white transition-all shadow-sm"
            >
              <Volume2 className="h-4 w-4 text-rose-400" />
              <span>Click to play gentle soothing ambient piano as you read</span>
            </button>
          )}

          {/* Quick Chapter Step Indicator */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {INITIAL_MESSAGES.map((msg) => {
              const isUnlocked = msg.id <= maxUnlocked;
              const isCurrent = msg.id === activeChapter;
              return (
                <button
                  key={msg.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    setActiveChapter(msg.id);
                    const el = document.getElementById(`chapter-${msg.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.35)] scale-105'
                      : isUnlocked
                      ? 'border border-rose-800/40 bg-rose-950/30 text-rose-300 hover:border-rose-600 hover:text-white'
                      : 'border border-rose-950/40 bg-stone-900/40 text-stone-600 cursor-not-allowed'
                  }`}
                >
                  <span>Chapter {msg.id}</span>
                  {msg.id < maxUnlocked && (
                    <CheckCircle2 className="h-3 w-3 text-rose-300" />
                  )}
                </button>
              );
            })}

            {/* Bouquet & Finale Shortcut Tabs if unlocked */}
            <a
              href="#bouquet"
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                maxUnlocked >= 6
                  ? 'border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:text-white'
                  : 'border border-rose-950/40 bg-stone-900/30 text-stone-600 pointer-events-none'
              }`}
            >
              Apology Bouquet
            </a>

            <a
              href="#finale"
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                maxUnlocked >= 7
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'border border-rose-950/40 bg-stone-900/30 text-stone-600 pointer-events-none'
              }`}
            >
              The Climax Letter
            </a>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#apologies"
              className="text-rose-400/60 hover:text-rose-300 transition-colors animate-bounce"
              aria-label="Scroll to apologies"
            >
              <ChevronDown className="h-6 w-6" />
            </a>
          </div>
        </section>

        {/* 5 Sequential Heartfelt Apology Message Cards */}
        <section id="apologies" className="space-y-8 my-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-rose-900/30 pb-3 text-xs uppercase tracking-widest text-rose-400/80">
            <span>The 5 Apology Chapters</span>
            <span>
              Unlocked: {Math.min(maxUnlocked, 5)} of 5
            </span>
          </div>

          {INITIAL_MESSAGES.map((message) => {
            const isUnlocked = message.id <= maxUnlocked;
            const isActive = message.id === activeChapter;
            const isCompleted = message.id < maxUnlocked;

            return (
              <div key={message.id} id={`chapter-${message.id}`} className="scroll-mt-24">
                <MessageCard
                  message={message}
                  isUnlocked={isUnlocked}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  onSelect={() => {
                    if (isUnlocked) setActiveChapter(message.id);
                  }}
                  onUnlockNext={() => handleUnlockNext(message.id)}
                  isLastChapter={message.id === 5}
                  recipientName={recipientName}
                />
              </div>
            );
          })}
        </section>

        {/* Transition callout to the bouquet */}
        {maxUnlocked >= 6 && (
          <div className="my-12 text-center">
            <div className="inline-flex items-center gap-2 text-rose-300 text-sm">
              <Flower2 className="h-4 w-4 text-rose-400" />
              <span>You have read all 5 chapters. Now, please receive my digital bouquet below.</span>
            </div>
          </div>
        )}

        {/* Interactive Apology Bouquet with 5 Blooming Flowers */}
        <ApologyBouquet
          flowers={BOUQUET_FLOWERS}
          bloomedFlowerIds={bloomedFlowers}
          onBloomFlower={handleBloomFlower}
          onProceedToFinale={handleProceedToFinale}
          recipientName={recipientName}
        />

        {/* The Grand Finale Section */}
        <FinaleSection
          recipientName={recipientName}
          senderName={senderName}
          onResetProgress={handleResetProgress}
        />
      </main>

      {/* Quiet, Respectful Footer */}
      <footer className="border-t border-rose-950/40 bg-[#0d0710] py-10 text-center text-xs text-rose-300/60 font-light">
        <div className="mx-auto max-w-xl px-4 space-y-2">
          <p className="font-editorial text-sm text-rose-200">
            "Sorry my dear baby doll"
          </p>
          <p>
            Crafted with deep remorse, gentle patience, and eternal devotion for {recipientName || 'baby doll'}.
          </p>
          <div className="pt-2 text-[11px] text-stone-500">
            Forever in my heart · Always by your side
          </div>
        </div>
      </footer>

      {/* Personalize modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        recipientName={recipientName}
        senderName={senderName}
        onSave={handleSavePersonalize}
      />
    </div>
  );
}
