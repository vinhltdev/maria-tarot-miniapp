import { majorArcana } from '@/data/tarot';
import type { TarotProvider } from '../types';

type LegacyTarotCard = (typeof majorArcana)[number];

export const primaryTarotProvider: TarotProvider<LegacyTarotCard> = {
  name: 'primary-local-major-arcana',
  async loadRaw() {
    return majorArcana;
  },
};
