import { Volume2, VolumeX, Sparkles, SlidersHorizontal } from 'lucide-react';

interface HeaderBarProps {
  recipientName: string;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenPersonalize: () => void;
}

export default function HeaderBar({
  recipientName,
  isAudioPlaying,
  onToggleAudio,
  onOpenPersonalize,
}: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 border-b border-rose-900/30 bg-[#120c15]/85 px-6 py-4 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        className="font-editorial text-lg tracking-wide text-rose-200 transition-colors hover:text-white whitespace-nowrap shrink-0"
      >
        For My {recipientName || 'Baby Doll'}
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-rose-300/70">
        <a
          href="#apologies"
          className="transition-colors hover:text-rose-100 whitespace-nowrap shrink-0"
        >
          Apology Journey
        </a>
        <a
          href="#bouquet"
          className="transition-colors hover:text-rose-100 whitespace-nowrap shrink-0"
        >
          Apology Bouquet
        </a>
        <a
          href="#finale"
          className="transition-colors hover:text-rose-100 whitespace-nowrap shrink-0"
        >
          The Letter
        </a>
        <a
          href="#promises"
          className="transition-colors hover:text-rose-100 whitespace-nowrap shrink-0"
        >
          Our Promises
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenPersonalize}
          aria-label="Personalize names & notes"
          className="flex items-center gap-1.5 rounded-full border border-rose-800/40 bg-rose-950/30 px-3 py-1.5 text-xs text-rose-300 transition-colors hover:border-rose-500/50 hover:bg-rose-900/40 hover:text-rose-100 whitespace-nowrap shrink-0"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Personalize</span>
        </button>

        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
            isAudioPlaying
              ? 'border-rose-500/50 bg-rose-500/20 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
              : 'border-rose-900/40 bg-stone-900/50 text-rose-300/70 hover:border-rose-700/60 hover:text-rose-200'
          }`}
          title={isAudioPlaying ? 'Mute romantic ambient music' : 'Play soft romantic ambient piano'}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="h-3.5 w-3.5 animate-pulse text-rose-400" />
              <span>Music Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="h-3.5 w-3.5 text-rose-400/60" />
              <span>Play Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
