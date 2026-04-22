import type { DeepInterpretationResult, FormattedInterpretation, InterpretationDepth } from './types';

function buildNarrative(result: DeepInterpretationResult, depth: InterpretationDepth): string {
  if (depth === 'short') return `${result.insight} ${result.summary.warning}`;
  if (depth === 'medium') return `${result.insight}\n\n${result.challenge}\n\n${result.summary.warning}`;

  return [
    result.insight,
    result.challenge,
    result.summary.warning,
    `Hành động đề xuất: ${result.summary.actions.join(' ')}`,
  ].join('\n\n');
}

export function formatInterpretation(
  result: DeepInterpretationResult,
  depth: InterpretationDepth = 'deep',
): FormattedInterpretation {
  return {
    insight: result.insight,
    challenge: result.challenge,
    actions: result.summary.actions,
    narrative: buildNarrative(result, depth),
  };
}
