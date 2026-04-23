import type { DauVaoLaBai } from './types';
import type { TarotCard } from '@/lib/tarot/types';

const viTriTheoChiSo: Array<'past' | 'present' | 'future'> = ['past', 'present', 'future'];

export function normalizeTripleSpreadInput(
  drawnCards: Array<{ card: TarotCard; isReversed: boolean }>,
): [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai] {
  if (drawnCards.length !== 3) {
    throw new Error('Triple spread yêu cầu đúng 3 lá bài.');
  }

  return drawnCards.map((item, index) => ({
    position: viTriTheoChiSo[index],
    card: item.card,
    orientation: item.isReversed ? 'reversed' : 'upright',
    yNghiaHieuLuc: item.isReversed ? item.card.meaning.reversed : item.card.meaning.upright,
  })) as [DauVaoLaBai, DauVaoLaBai, DauVaoLaBai];
}
