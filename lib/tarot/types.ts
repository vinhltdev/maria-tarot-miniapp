export type Arcana = 'major' | 'minor';
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotMeaning {
  upright: string;
  reversed: string;
}

export interface TarotCard {
  id: string;
  name: string;
  arcana: Arcana;
  number: number;
  suit?: Suit;
  image?: string;
  meaning: TarotMeaning;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface TarotProvider<TRaw = unknown> {
  name: string;
  loadRaw: () => Promise<TRaw[]>;
}
