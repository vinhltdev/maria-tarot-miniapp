import { majorArcana } from '@/data/tarot';
import type { TarotProvider } from '../types';

type LegacyTarotCard = (typeof majorArcana)[number];

export const fallbackTarotProvider: TarotProvider<LegacyTarotCard> = {
  name: 'fallback-local-major-arcana',
  async loadRaw() {
    return majorArcana;
  },
};
