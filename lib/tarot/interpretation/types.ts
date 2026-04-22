import type { TarotCard } from '@/lib/tarot/types';

export type SpreadPosition = 'past' | 'present' | 'future';
export type Orientation = 'upright' | 'reversed';
export type InterpretationDepth = 'short' | 'medium' | 'deep';

export interface SpreadCardInput {
  position: SpreadPosition;
  card: TarotCard;
  orientation: Orientation;
  effectiveMeaning: string;
}

export interface DeepInterpretationInput {
  spread: 'triple';
  cards: [SpreadCardInput, SpreadCardInput, SpreadCardInput];
  locale: 'vi';
}

export interface PositionReading {
  position: SpreadPosition;
  title: string;
  interpretation: string;
}

export interface DeepInterpretationSummary {
  mainTheme: string;
  warning: string;
  actions: [string, string, string];
}

export interface DeepInterpretationResult {
  spread: 'triple';
  insight: string;
  challenge: string;
  summary: DeepInterpretationSummary;
  positionReadings: [PositionReading, PositionReading, PositionReading];
  coherenceScore: number;
  usedFallback: boolean;
}

export interface FormattedInterpretation {
  insight: string;
  challenge: string;
  actions: [string, string, string];
  narrative: string;
}
