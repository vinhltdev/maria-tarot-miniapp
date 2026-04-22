import { primaryTarotProvider } from './providers/primary';
import { fallbackTarotProvider } from './providers/fallback';
import type { TarotCard } from './types';
import { validateTarotDeck } from './validate';

type LegacyTarotCard = {
  id: string;
  name: string;
  image?: string;
  meaning: {
    upright: string;
    reversed: string;
  };
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function normalizeLegacyMajorDeck(cards: LegacyTarotCard[], source: string): TarotCard[] {
  return cards.map((card) => {
    const number = Number(card.id);

    return {
      id: `major-${number}-${slugify(card.name)}`,
      name: card.name.trim(),
      arcana: 'major',
      number,
      image: card.image,
      meaning: {
        upright: card.meaning.upright.trim(),
        reversed: card.meaning.reversed.trim(),
      },
      metadata: {
        source,
      },
    };
  });
}

async function loadFromProvider(provider: typeof primaryTarotProvider): Promise<TarotCard[]> {
  const rawDeck = await provider.loadRaw();
  const normalized = normalizeLegacyMajorDeck(rawDeck, provider.name);
  validateTarotDeck(normalized);

  return normalized;
}

export async function getTarotDeck(): Promise<TarotCard[]> {
  try {
    return await loadFromProvider(primaryTarotProvider);
  } catch (primaryError) {
    console.warn('[tarot-loader] primary provider failed, using fallback', primaryError);
    return loadFromProvider(fallbackTarotProvider);
  }
}

export function drawCards(deck: TarotCard[], count: number): TarotCard[] {
  if (count <= 0) return [];

  const pool = [...deck];
  const cards: TarotCard[] = [];
  const drawCount = Math.min(count, pool.length);

  for (let i = 0; i < drawCount; i += 1) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const card = pool.splice(randomIndex, 1)[0];
    cards.push(card);
  }

  return cards;
}
