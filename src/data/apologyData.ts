import { ApologyMessage, BouquetFlower } from '../types';

export const INITIAL_MESSAGES: ApologyMessage[] = [
  {
    id: 1,
    chapter: "Chapter 01 · Honest Reflection",
    title: "The Weight of My Mistake",
    reflection:
      "I have spent hours sitting in quiet reflection, replaying the moment where I went wrong. Looking back, I see so clearly where I failed you. I didn't listen the way you needed me to, and I let my own carelessness overshadow your feelings. There is no justification, no excuse, and no defense—I was wrong, and the weight of that truth sits heavy in my chest.",
    confession:
      "I took your gentleness for granted in that moment, and it breaks me to know that someone as pure and tender as you had to feel hurt by the person who promised to protect your smile.",
    heartfeltQuote: "The hardest pill to swallow is knowing that the sadness in your eyes was put there by my own thoughtless actions.",
    iconName: "Compass",
    accentColor: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: 2,
    chapter: "Chapter 02 · Empathy & Heartache",
    title: "Seeing Your Hurt",
    reflection:
      "When you hurt, my entire world feels cold and fractured. Seeing your smile fade and hearing that soft sadness in your voice felt like a dagger to my soul. You deserve to feel unconditionally cherished, safe, and understood every single day—never anxious, doubted, or wounded by words or silence.",
    confession:
      "I replay the look on your face, and I wish with all my heart I could turn back the clock to hold you tight and choose tenderness instead.",
    heartfeltQuote: "Your happiness is my peace; when you are hurting because of me, there is no comfort anywhere in the world.",
    iconName: "HeartCrack",
    accentColor: "from-amber-500/20 to-rose-500/10",
  },
  {
    id: 3,
    chapter: "Chapter 03 · Reverence & Devotion",
    title: "What You Truly Mean to Me",
    reflection:
      "You are not just someone I love—you are my sanctuary, my sweetest breath of fresh air, and the brightest blessing in my life. You have given me so much warmth, so many laughs, and a kind of love that I never thought I would be lucky enough to experience. You are my delicate, beautiful baby doll, and you deserve nothing less than reverence.",
    confession:
      "Every dream I have for the future has your hand in mine. To think that I risked even a moment of our bond brings tears to my eyes.",
    heartfeltQuote: "In a noisy and chaotic world, your heart has always been my softest place to land. I will never stop cherishing you.",
    iconName: "Sparkles",
    accentColor: "from-fuchsia-500/20 to-rose-500/10",
  },
  {
    id: 4,
    chapter: "Chapter 04 · Accountability & Growth",
    title: "Owning My Faults Completely",
    reflection:
      "True love isn't just about the sweet moments; it's about holding up a mirror, shedding pride, and admitting when you have fallen short. I admit my flaws fully. I let impatience and foolish pride get between us when all that mattered was understanding you. I don't want to make hollow promises; I want to grow into a partner worthy of your heart.",
    confession:
      "I promise to pause, to breathe, and to always put your feelings first. I promise to listen to understand, not to answer.",
    heartfeltQuote: "A sincere apology is not just about words of remorse; it is a vow written into action and gentle patience.",
    iconName: "ShieldCheck",
    accentColor: "from-purple-500/20 to-rose-500/10",
  },
  {
    id: 5,
    chapter: "Chapter 05 · The Sacred Promise",
    title: "A Heart Pleading for Healing",
    reflection:
      "I am standing before you with an open heart, asking for the grace to mend what I bruised. I want to wipe away every tear, replace every sad memory with warmth, and spend every day reminding you how deeply and fiercely you are adored. You are the love of my life, my precious sweetheart, and I want nothing more than to make you feel safe in my arms again.",
    confession:
      "I love you more than words could ever stretch to say. Every beat of my heart longs to hold you close and hear you laugh again.",
    heartfeltQuote: "I will hold your hand through every storm—even the storms I caused—until the sunshine returns to your beautiful face.",
    iconName: "HeartHandshake",
    accentColor: "from-rose-600/25 to-red-500/10",
  },
];

export const BOUQUET_FLOWERS: BouquetFlower[] = [
  {
    id: "flower-1",
    name: "White Madonna Lily",
    symbolism: "Pure Sincerity & Clean Slate",
    note: "I offer this lily as a symbol of pure, undefended sincerity. No ego, no excuses—just an honest confession that I was wrong.",
    vow: "I promise to always be transparent, honest, and humble with you.",
    colorHex: "#f8fafc",
    accentGlow: "rgba(255, 255, 255, 0.4)",
  },
  {
    id: "flower-2",
    name: "Velvet Crimson Rose",
    symbolism: "Deep, Undying Love & Passion",
    note: "Even when mistakes happen, my love for you has never wavered for a single fraction of a second. You are my one and only.",
    vow: "I promise to cherish and protect your heart as the most sacred treasure I have.",
    colorHex: "#e11d48",
    accentGlow: "rgba(225, 29, 72, 0.4)",
  },
  {
    id: "flower-3",
    name: "Forget-Me-Not",
    symbolism: "Remembrance & Lingering Regret",
    note: "This flower carries the memory of how much I regret hurting you. I will never forget the lesson of caring for your feelings.",
    vow: "I promise never to forget how delicate and precious your trust is.",
    colorHex: "#60a5fa",
    accentGlow: "rgba(96, 165, 250, 0.4)",
  },
  {
    id: "flower-4",
    name: "Soft Blush Peony",
    symbolism: "Healing, Compassion & Tenderness",
    note: "A peony blossoms slowly, just like patience and healing. I am here for whatever time it takes to see your genuine smile again.",
    vow: "I promise to be gentle, patient, and softly present whenever your heart needs time.",
    colorHex: "#f472b6",
    accentGlow: "rgba(244, 114, 182, 0.4)",
  },
  {
    id: "flower-5",
    name: "Golden Sunlight Tulip",
    symbolism: "Warmth, Forgiveness & New Dawn",
    note: "A bright bloom asking for a new dawn together. May this flower bring light back to your face and warmth back into our embrace.",
    vow: "I promise to bring sunshine into our days and hold you tighter than ever before.",
    colorHex: "#fbbf24",
    accentGlow: "rgba(251, 191, 36, 0.4)",
  },
];
