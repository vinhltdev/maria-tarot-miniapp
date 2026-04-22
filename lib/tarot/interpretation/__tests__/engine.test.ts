import test from 'node:test';
import assert from 'node:assert/strict';

import { interpretTripleSpread } from '@/lib/tarot/interpretation';
import { getTarotDeck } from '@/lib/tarot';
import type { TarotCard } from '@/lib/tarot/types';

function makeDrawn(deck: TarotCard[], index: number, isReversed = false) {
  return {
    card: deck[index],
    isReversed,
  };
}

test('consistency: same input should return stable interpretation blocks', async () => {
  const deck = await getTarotDeck();
  const input = [makeDrawn(deck, 0, false), makeDrawn(deck, 1, true), makeDrawn(deck, 2, false)] as const;

  const first = interpretTripleSpread([...input]);
  const second = interpretTripleSpread([...input]);

  assert.equal(first.formatted.insight, second.formatted.insight);
  assert.equal(first.result.summary.warning, second.result.summary.warning);
  assert.deepEqual(first.formatted.actions, second.formatted.actions);
});

test('actionable output: non-empty insight/challenge/actions', async () => {
  const deck = await getTarotDeck();
  const { result, formatted } = interpretTripleSpread([
    makeDrawn(deck, 3, true),
    makeDrawn(deck, 4, false),
    makeDrawn(deck, 5, false),
  ]);

  assert.ok(result.insight.trim().length > 0);
  assert.ok(result.challenge.trim().length > 0);
  assert.ok(result.summary.warning.trim().length > 0);
  assert.equal(formatted.actions.length, 3);
  for (const action of formatted.actions) {
    assert.ok(action.trim().length > 0);
  }
});

test('no-duplicate-template basic check across different spreads', async () => {
  const deck = await getTarotDeck();
  const spreadA = interpretTripleSpread([
    makeDrawn(deck, 6, false),
    makeDrawn(deck, 7, false),
    makeDrawn(deck, 8, true),
  ]);

  const spreadB = interpretTripleSpread([
    makeDrawn(deck, 15, true),
    makeDrawn(deck, 16, true),
    makeDrawn(deck, 17, false),
  ]);

  assert.notEqual(spreadA.formatted.insight, spreadB.formatted.insight);
  assert.notEqual(spreadA.result.summary.warning, spreadB.result.summary.warning);
});
