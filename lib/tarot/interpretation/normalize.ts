import type { SpreadPosition, SpreadCardInput } from './types';
import type { TarotCard } from '@/lib/tarot/types';

interface RawDrawnCard {
  card: TarotCard;
  isReversed: boolean;
}

const positions: SpreadPosition[] = ['past', 'present', 'future'];

export function normalizeTripleSpreadInput(drawnCards: RawDrawnCard[]): [SpreadCardInput, SpreadCardInput, SpreadCardInput] {
  if (drawnCards.length !== 3) {
    throw new Error('normalizeTripleSpreadInput requires exactly 3 cards');
  }

  return positions.map((position, index) => {
    const item = drawnCards[index];
    const orientation = item.isReversed ? 'reversed' : 'upright';

    return {
      position,
      card: item.card,
      orientation,
      effectiveMeaning: item.isReversed ? item.card.meaning.reversed : item.card.meaning.upright,
    };
  }) as [SpreadCardInput, SpreadCardInput, SpreadCardInput];
}
