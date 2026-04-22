"use client";

import { useEffect, useState, useCallback } from 'react';
import { drawCards, getTarotDeck } from '@/lib/tarot';
import { interpretTripleSpread } from '@/lib/tarot/interpretation';
import type { TarotCard } from '@/lib/tarot/types';

type DrawMode = 'single' | 'triple';

interface TelegramWebAppUser {
  first_name?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe?: { user?: TelegramWebAppUser };
}

interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  isFlipped: boolean;
}

export default function TarotPage() {
  const [mode, setMode] = useState<DrawMode>('single');
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [tgUser, setTgUser] = useState<TelegramWebAppUser | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDeckLoading, setIsDeckLoading] = useState(true);
  const [deckError, setDeckError] = useState<string | null>(null);
  const [brokenCardImages, setBrokenCardImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const tg = (window as Window & { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      setTgUser(tg.initDataUnsafe?.user ?? null);
    }
  }, []);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await getTarotDeck();
        setDeck(loadedDeck);
      } catch (error) {
        console.error('[tarot-page] failed to load deck', error);
        setDeckError('Không thể tải bộ bài tarot. Vui lòng thử lại sau.');
      } finally {
        setIsDeckLoading(false);
      }
    };
    loadDeck();
  }, []);

  const handleDraw = useCallback(() => {
    if (!deck.length) return;
    setIsDrawing(true);
    setTimeout(() => {
      const count = mode === 'single' ? 1 : 3;
      const selectedCards = drawCards(deck, count);
      const nextCards: DrawnCard[] = selectedCards.map((card) => ({
        card,
        isReversed: Math.random() > 0.7,
        isFlipped: false,
      }));
      setDrawnCards(nextCards);
      setBrokenCardImages({});
      setIsDrawing(false);
    }, 800);
  }, [deck, mode]);

  useEffect(() => {
    if (!deck.length) return;
    handleDraw();
  }, [mode, deck, handleDraw]);

  const toggleFlip = (index: number) => {
    if (isDrawing) return;
    setDrawnCards((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], isFlipped: !updated[index].isFlipped };
      return updated;
    });
  };

  const spreadLabels = ['QUÁ KHỨ', 'HIỆN TẠI', 'TƯƠNG LAI'];
  const tripleInterpretation =
    mode === 'triple' && drawnCards.length === 3
      ? interpretTripleSpread(drawnCards.map((item) => ({ card: item.card, isReversed: item.isReversed })))
      : null;

  if (isDeckLoading) return <main className="min-h-screen bg-[#05020a] flex items-center justify-center text-[#bb86fc]">Đang chuẩn bị bộ bài...</main>;
  if (deckError) return <main className="min-h-screen bg-[#05020a] flex items-center justify-center text-center p-6 text-white"><p>{deckError}</p></main>;

  return (
    <main className="min-h-screen bg-[#05020a] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden relative">
      <div className="text-center mb-6 z-10 animate-fade-in w-full">
        <h1 className="text-xl font-bold text-[#bb86fc] tracking-wider px-4">TIỆM TAROT CỦA {tgUser?.first_name?.toUpperCase() || 'CHỦ NHÂN'} 🔮</h1>
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={() => !isDrawing && setMode('single')} className="text-[9px] font-bold px-4 py-1.5 rounded-full border">RÚT 1 LÁ</button>
          <button onClick={() => !isDrawing && setMode('triple')} className="text-[9px] font-bold px-4 py-1.5 rounded-full border">TRẢI 3 LÁ</button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 z-10 w-full max-w-lg">
        {drawnCards.map((item, idx) => (
          <div key={item.card.id} className="flex flex-col items-center">
            {mode === 'triple' && <span className="text-[8px] text-[#bb86fc] font-black mb-2">{spreadLabels[idx]}</span>}
            <div className={`relative ${mode === 'single' ? 'w-60 h-[380px]' : 'w-28 h-[180px]'} cursor-pointer`} onClick={() => toggleFlip(idx)}>
              <div className="relative w-full h-full rounded-xl">
                {!item.isFlipped ? (
                  <div className="absolute inset-0 rounded-xl border-2 border-[#bb86fc]/40 flex items-center justify-center">✧</div>
                ) : (
                  <div className="absolute inset-0 rounded-xl border-2 border-[#bb86fc] overflow-hidden bg-white text-[#1a0a2e]">
                    <div className="relative h-3/5 w-full bg-[#f8f4ff] border-b border-[#bb86fc]/20 overflow-hidden">
                      {item.card.image && !brokenCardImages[item.card.id] ? (
                        <img
                          src={item.card.image}
                          alt={item.card.name}
                          onError={() => setBrokenCardImages((prev) => ({ ...prev, [item.card.id]: true }))}
                          className={`w-full h-full object-cover ${item.isReversed ? 'rotate-180 scale-x-[-1]' : ''}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px]">Ảnh bài tạm thời không khả dụng</div>
                      )}
                    </div>
                    <div className="flex-1 p-2 text-center">
                      <h2 className={`${mode === 'single' ? 'text-sm' : 'text-[9px]'} font-black uppercase`}>{item.card.name}</h2>
                      {mode === 'single' && <p className="text-[9px] mt-2 italic">&ldquo;{item.isReversed ? item.card.meaning.reversed : item.card.meaning.upright}&rdquo;</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mode === 'triple' && !isDrawing && drawnCards.length === 3 && drawnCards.every((c) => c.isFlipped) && tripleInterpretation && (
        <div className="mt-6 p-4 bg-[#1a0b2e]/80 border border-[#bb86fc]/20 rounded-xl max-w-md text-left z-10 space-y-3">
          <h3 className="text-[#bb86fc] text-[10px] font-bold uppercase">Kiến giải trải bài sâu</h3>
          <div>
            <h4 className="text-[10px] text-[#d9b8ff] font-bold uppercase">Insight chính</h4>
            <p className="text-[11px] text-gray-200 mt-1">{tripleInterpretation.formatted.insight}</p>
          </div>
          <div>
            <h4 className="text-[10px] text-[#ffb7b7] font-bold uppercase">Cảnh báo</h4>
            <p className="text-[11px] text-gray-200 mt-1">{tripleInterpretation.result.summary.warning}</p>
          </div>
          <div>
            <h4 className="text-[10px] text-[#b8ffd7] font-bold uppercase">Hành động gợi ý</h4>
            <ul className="mt-1 space-y-1">{tripleInterpretation.formatted.actions.map((action) => <li key={action} className="text-[11px] text-gray-200">• {action}</li>)}</ul>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center z-10">
        <button disabled={isDrawing || !deck.length} className="px-10 py-3.5 rounded-full font-bold text-[11px]" onClick={handleDraw}>
          {isDrawing ? 'ĐANG XÀO BÀI...' : mode === 'single' ? 'RÚT LÁ BÀI MỚI' : 'TRẢI BÀI MỚI'}
        </button>
      </div>
    </main>
  );
}
