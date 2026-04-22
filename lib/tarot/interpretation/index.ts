import { normalizeTripleSpreadInput } from './normalize';
import { synthesizeDeepInterpretation } from './synthesize';
import { formatInterpretation } from './format';

export type {
  DeepInterpretationInput,
  DeepInterpretationResult,
  FormattedInterpretation,
  InterpretationDepth,
  SpreadCardInput,
} from './types';

export function interpretTripleSpread(
  drawnCards: Array<{ card: import('@/lib/tarot/types').TarotCard; isReversed: boolean }>,
) {
  const normalizedCards = normalizeTripleSpreadInput(drawnCards);
  const result = synthesizeDeepInterpretation({
    spread: 'triple',
    cards: normalizedCards,
    locale: 'vi',
  });

  return {
    result,
    formatted: formatInterpretation(result, 'deep'),
  };
}
