import type { TarotCard } from './types';

export function validateTarotDeck(cards: TarotCard[]): void {
  if (!cards.length) {
    throw new Error('Tarot deck is empty');
  }

  const ids = new Set<string>();

  for (const card of cards) {
    if (!card.id || !card.name) {
      throw new Error('Invalid tarot card: missing id/name');
    }

    if (!Number.isFinite(card.number)) {
      throw new Error(`Invalid tarot card number: ${card.id}`);
    }

    if (!card.meaning?.upright?.trim() || !card.meaning?.reversed?.trim()) {
      throw new Error(`Invalid tarot card meanings: ${card.id}`);
    }

    if (ids.has(card.id)) {
      throw new Error(`Duplicate tarot card id: ${card.id}`);
    }

    ids.add(card.id);
  }
}
