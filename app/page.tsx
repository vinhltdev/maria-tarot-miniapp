"use client";

import { useEffect, useState, useCallback } from 'react';
import { drawCards, getTarotDeck } from '@/lib/tarot';
import type { TarotCard } from '@/lib/tarot/types';

type DrawMode = 'single' | 'triple';

interface TelegramWebAppUser {
  first_name?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe?: {
    user?: TelegramWebAppUser;
  };
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

  if (isDeckLoading) {
    return (
      <main className="min-h-screen bg-[#05020a] flex items-center justify-center text-[#bb86fc]">
        Đang chuẩn bị bộ bài...
      </main>
    );
  }

  if (deckError) {
    return (
      <main className="min-h-screen bg-[#05020a] flex items-center justify-center text-center p-6 text-white">
        <p>{deckError}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05020a] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#bb86fc] opacity-5 blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-6 z-10 animate-fade-in w-full">
        <h1 className="text-xl font-bold text-[#bb86fc] drop-shadow-[0_0_10px_rgba(187,134,252,0.5)] tracking-wider px-4">
          TIỆM TAROT CỦA {tgUser?.first_name?.toUpperCase() || 'CHỦ NHÂN'} 🔮
        </h1>

        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => !isDrawing && setMode('single')}
            className={`text-[9px] font-bold px-4 py-1.5 rounded-full border transition-all duration-300 ${
              mode === 'single'
                ? 'bg-[#bb86fc] text-[#1a0a2e] border-[#bb86fc] shadow-[0_0_15px_rgba(187,134,252,0.4)]'
                : 'border-[#bb86fc]/30 text-[#bb86fc]/50 hover:border-[#bb86fc]/60'
            }`}
          >
            RÚT 1 LÁ
          </button>
          <button
            onClick={() => !isDrawing && setMode('triple')}
            className={`text-[9px] font-bold px-4 py-1.5 rounded-full border transition-all duration-300 ${
              mode === 'triple'
                ? 'bg-[#bb86fc] text-[#1a0a2e] border-[#bb86fc] shadow-[0_0_15px_rgba(187,134,252,0.4)]'
                : 'border-[#bb86fc]/30 text-[#bb86fc]/50 hover:border-[#bb86fc]/60'
            }`}
          >
            TRẢI 3 LÁ (Q.KHỨ - H.TẠI - T.LAI)
          </button>
        </div>
      </div>

      <div className={`flex flex-wrap justify-center items-center gap-4 z-10 transition-all duration-500 w-full max-w-lg ${isDrawing ? 'opacity-40 scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
        {drawnCards.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {mode === 'triple' && (
              <span className="text-[8px] text-[#bb86fc] font-black tracking-[0.2em] mb-2 opacity-80 bg-[#bb86fc]/10 px-2 py-0.5 rounded">
                {spreadLabels[idx]}
              </span>
            )}
            <div
              className={`relative ${mode === 'single' ? 'w-60 h-[380px]' : 'w-28 h-[180px]'} cursor-pointer transition-transform duration-300 hover:scale-105`}
              style={{ perspective: '1200px' }}
              onClick={() => toggleFlip(idx)}
            >
              <div
                className="relative w-full h-full duration-700 preserve-3d transition-transform shadow-2xl rounded-xl"
                style={{ transform: item.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2e1a47] to-[#1a0b2e] rounded-xl border-2 border-[#bb86fc]/40 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-1.5 border border-[#bb86fc]/20 rounded-lg"></div>
                  <div className={`${mode === 'single' ? 'text-4xl' : 'text-2xl'} text-[#bb86fc] animate-pulse`}>✧</div>
                  <div className={`mt-2 text-[#bb86fc]/40 ${mode === 'single' ? 'text-[8px]' : 'text-[6px]'} tracking-[0.3em] uppercase`}>Maria</div>
                </div>

                <div className="absolute inset-0 backface-hidden rounded-xl border-2 border-[#bb86fc] overflow-hidden bg-white text-[#1a0a2e]" style={{ transform: 'rotateY(180deg)' }}>
                  <div className="w-full h-full flex flex-col">
                    <div className="relative h-3/5 w-full bg-[#f8f4ff] border-b border-[#bb86fc]/20 overflow-hidden">
                      {item.card.image && !brokenCardImages[item.card.id] ? (
                        <img
                          src={item.card.image}
                          alt={item.card.name}
                          onError={() => {
                            setBrokenCardImages((prev) => ({ ...prev, [item.card.id]: true }));
                          }}
                          className={`w-full h-full object-cover transition-transform duration-500 ${item.isReversed ? 'rotate-180 scale-x-[-1]' : ''}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#6f5298] font-semibold bg-[#f3eaff]">
                          Ảnh bài tạm thời không khả dụng
                        </div>
                      )}
                      <div className="absolute top-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded-[4px] text-[6px] font-bold uppercase tracking-tighter">
                        {item.isReversed ? 'REVERSED' : 'UPRIGHT'}
                      </div>
                    </div>
                    <div className="flex-1 p-2 flex flex-col items-center justify-center text-center">
                      <h2 className={`${mode === 'single' ? 'text-sm' : 'text-[9px]'} font-black uppercase leading-tight text-[#2e1a47]`}>
                        {item.card.name}
                      </h2>
                      {mode === 'single' && (
                        <p className="text-[9px] mt-2 italic px-1 leading-relaxed text-gray-600">
                          &ldquo;{item.isReversed ? item.card.meaning.reversed : item.card.meaning.upright}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mode === 'triple' && !isDrawing && drawnCards.length === 3 && drawnCards.every((c) => c.isFlipped) && (
        <div className="mt-6 p-4 bg-[#1a0b2e]/80 border border-[#bb86fc]/20 rounded-xl max-w-xs text-center z-10 animate-fade-in backdrop-blur-sm">
          <h3 className="text-[#bb86fc] text-[10px] font-bold mb-2 tracking-widest uppercase">Tổng quan trải bài</h3>
          <p className="text-[9px] text-gray-300 leading-relaxed">
            Sự kết hợp của 3 lá bài này cho thấy dòng chảy năng lượng từ {drawnCards[0].card.name} ({spreadLabels[0]}) qua {drawnCards[1].card.name} ({spreadLabels[1]}) đến {drawnCards[2].card.name} ({spreadLabels[2]}). Hãy lắng nghe trực giác của bạn.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center z-10">
        <button
          disabled={isDrawing || !deck.length}
          className={`px-10 py-3.5 rounded-full font-bold tracking-[0.2em] text-[11px] transition-all duration-300 shadow-[0_0_25px_rgba(187,134,252,0.2)] ${
            isDrawing
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
              : 'bg-[#bb86fc] text-[#1a0a2e] hover:scale-105 active:scale-95 hover:shadow-[0_0_35px_rgba(187,134,252,0.4)]'
          }`}
          onClick={handleDraw}
        >
          {isDrawing ? 'ĐANG XÀO BÀI...' : mode === 'single' ? 'RÚT LÁ BÀI MỚI' : 'TRẢI BÀI MỚI'}
        </button>

        <p className="mt-4 text-[9px] text-[#bb86fc]/40 tracking-[0.3em] uppercase animate-pulse">
          {isDrawing ? 'Vũ trụ đang trả lời...' : 'Chạm vào bài để lật'}
        </p>
      </div>

      <div className="absolute bottom-4 text-[8px] opacity-20 tracking-[0.4em] uppercase pointer-events-none">
        Powered by Vinh Luong 🔮
      </div>
    </main>
  );
}
