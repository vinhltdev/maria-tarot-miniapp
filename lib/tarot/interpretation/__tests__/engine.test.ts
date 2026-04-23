import test from 'node:test';
import assert from 'node:assert/strict';

import { interpretTripleSpread } from '@/lib/tarot/interpretation';
import { getTarotDeck } from '@/lib/tarot';
import type { TarotCard } from '@/lib/tarot/types';

function taoLaBaiRut(deck: TarotCard[], index: number, isReversed = false) {
  return {
    card: deck[index],
    isReversed,
  };
}

test('consistency: cùng đầu vào thì khối diễn giải ổn định', async () => {
  const deck = await getTarotDeck();
  const input = [
    taoLaBaiRut(deck, 0, false),
    taoLaBaiRut(deck, 1, true),
    taoLaBaiRut(deck, 2, false),
  ] as const;

  const first = interpretTripleSpread([...input]);
  const second = interpretTripleSpread([...input]);

  assert.equal(first.formatted.diemSangCotLoi, second.formatted.diemSangCotLoi);
  assert.equal(first.result.tongKet.dieuCanTranh, second.result.tongKet.dieuCanTranh);
  assert.deepEqual(first.formatted.viecNenLam, second.formatted.viecNenLam);
});

test('output có hành động cụ thể, dễ hiểu và đủ 3 mốc thời gian', async () => {
  const deck = await getTarotDeck();
  const { result, formatted } = interpretTripleSpread([
    taoLaBaiRut(deck, 3, true),
    taoLaBaiRut(deck, 4, false),
    taoLaBaiRut(deck, 5, false),
  ]);

  assert.ok(result.diemSangCotLoi.trim().length > 0);
  assert.ok(result.xungLucNoiTam.trim().length > 0);
  assert.ok(result.tongKet.dieuCanTranh.trim().length > 0);
  assert.equal(formatted.viecNenLam.length, 3);

  const [a24h, a7d, a30d] = formatted.viecNenLam;
  assert.ok(a24h.includes('[24h]'));
  assert.ok(a7d.includes('[7 ngày]'));
  assert.ok(a30d.includes('[30 ngày]'));

  for (const action of formatted.viecNenLam) {
    assert.ok(action.trim().length > 20);
  }
});

test('không chứa từ tiếng Anh bị cấm trong narrative (trừ tên lá)', async () => {
  const deck = await getTarotDeck();
  const { formatted, result } = interpretTripleSpread([
    taoLaBaiRut(deck, 6, false),
    taoLaBaiRut(deck, 7, false),
    taoLaBaiRut(deck, 8, true),
  ]);

  const vanBan = [
    formatted.diemSangCotLoi,
    result.xungLucNoiTam,
    result.tongKet.dieuCanTranh,
    ...formatted.viecNenLam,
    formatted.vanBanDayDu,
  ].join(' ');

  const tuTiengAnhBiCam = [
    'insight',
    'warning',
    'challenge',
    'action',
    'actions',
    'core',
    'narrative',
    'template',
    'fallback',
    'energy',
  ];

  for (const tu of tuTiengAnhBiCam) {
    assert.equal(new RegExp(`\\b${tu}\\b`, 'i').test(vanBan), false, `Phát hiện từ bị cấm: ${tu}`);
  }
});

test('no-duplicate-template basic check giữa hai trải bài khác nhau', async () => {
  const deck = await getTarotDeck();
  const spreadA = interpretTripleSpread([
    taoLaBaiRut(deck, 6, false),
    taoLaBaiRut(deck, 7, false),
    taoLaBaiRut(deck, 8, true),
  ]);

  const spreadB = interpretTripleSpread([
    taoLaBaiRut(deck, 15, true),
    taoLaBaiRut(deck, 16, true),
    taoLaBaiRut(deck, 17, false),
  ]);

  assert.notEqual(spreadA.formatted.diemSangCotLoi, spreadB.formatted.diemSangCotLoi);
  assert.notEqual(spreadA.result.tongKet.dieuCanTranh, spreadB.result.tongKet.dieuCanTranh);
});
