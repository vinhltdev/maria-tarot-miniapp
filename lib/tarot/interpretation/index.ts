import { normalizeTripleSpreadInput } from './normalize';
import { tongHopDienGiaiSau } from './synthesize';
import { dinhDangDienGiai } from './format';

export type {
  DauVaoDienGiaiSau,
  KetQuaDienGiaiSau,
  DienGiaiDaDinhDang,
  MucDoDienGiai,
  DauVaoLaBai,
} from './types';

export function interpretTripleSpread(
  drawnCards: Array<{ card: import('@/lib/tarot/types').TarotCard; isReversed: boolean }>,
) {
  const normalizedCards = normalizeTripleSpreadInput(drawnCards);
  const result = tongHopDienGiaiSau({
    spread: 'triple',
    cards: normalizedCards,
    locale: 'vi',
  });

  return {
    result,
    formatted: dinhDangDienGiai(result, 'deep'),
  };
}
