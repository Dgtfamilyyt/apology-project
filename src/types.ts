export interface ApologyMessage {
  id: number;
  chapter: string;
  title: string;
  reflection: string;
  confession: string;
  heartfeltQuote: string;
  iconName: string;
  accentColor: string;
}

export interface BouquetFlower {
  id: string;
  name: string;
  symbolism: string;
  note: string;
  vow: string;
  colorHex: string;
  accentGlow: string;
}

export interface ApologyConfig {
  recipientName: string;
  senderName: string;
  specialDate?: string;
  customMessage?: string;
}
