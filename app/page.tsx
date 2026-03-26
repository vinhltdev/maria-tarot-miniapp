"use client";
import { useEffect, useState, useCallback } from 'react';
import { majorArcana, TarotCard } from '../data/tarot';

export default function TarotPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);
  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      setTgUser(tg.initDataUnsafe?.user);
      tg.expand();
    }
    // Khởi tạo lá bài đầu tiên ngẫu nhiên
    drawNewCard();
  }, []);

  const drawNewCard = useCallback(() => {
    setIsDrawing(true);
    setIsFlipped(false);
    
    // Giả lập hiệu ứng xào bài trong 600ms
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * majorArcana.length);
      const randomReversed = Math.random() > 0.7; // 30% tỉ lệ bài ngược
      
      setCurrentCard(majorArcana[randomIndex]);
      setIsReversed(randomReversed);
      setIsDrawing(false);
    }, 600);
  }, []);

  const handleFlip = () => {
    if (!isDrawing) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <main className="min-h-screen bg-[#05020a] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#bb86fc] opacity-5 blur-[120px] pointer-events-none"></div>

      <div className="text-center mb-8 z-10 animate-fade-in">
        <h1 className="text-2xl font-bold text-[#bb86fc] drop-shadow-[0_0_10px_rgba(187,134,252,0.5)] tracking-wider">
          TIỆM TAROT CỦA {tgUser?.first_name?.toUpperCase() || "CHỦ NHÂN"} 🔮
        </h1>
        <p className="text-xs opacity-50 mt-2 uppercase tracking-[0.2em]">Khám phá thông điệp từ vũ trụ</p>
      </div>

      <div 
        className={`relative w-64 h-[420px] cursor-pointer transition-all duration-500 ${isDrawing ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
        style={{ perspective: '1200px' }}
        onClick={handleFlip}
      >
        <div 
          className="relative w-full h-full duration-700 preserve-3d transition-transform shadow-2xl rounded-2xl"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          
          {/* Back Face (Mặt sau) */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2e1a47] to-[#1a0b2e] rounded-2xl border-2 border-[#bb86fc]/40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-2 border border-[#bb86fc]/20 rounded-xl"></div>
            <div className="text-5xl text-[#bb86fc] animate-pulse">✧</div>
            <div className="mt-4 text-[#bb86fc]/60 text-[10px] tracking-[0.3em] uppercase">Maria Tarot</div>
          </div>

          {/* Front Face (Mặt trước) */}
          <div className="absolute inset-0 backface-hidden rounded-2xl border-2 border-[#bb86fc] overflow-hidden shadow-[0_0_40px_rgba(187,134,252,0.2)]" style={{ transform: 'rotateY(180deg)' }}>
            <div className="w-full h-full flex flex-col bg-white text-[#1a0a2e]">
              {/* Card Image Area */}
              <div className="relative h-3/5 w-full bg-[#f8f4ff] flex items-center justify-center overflow-hidden border-b border-[#bb86fc]/20">
                {currentCard && (
                  <img 
                    src={currentCard.image} 
                    alt={currentCard.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}
                  />
                )}
                <div className="absolute top-2 right-2 bg-black/10 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter">
                  {isReversed ? 'Reversed' : 'Upright'}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-[#bb86fc] font-bold tracking-[0.2em] mb-1">MAJOR ARCANA</span>
                <h2 className="text-xl font-black mb-2 tracking-tight uppercase">{currentCard?.name}</h2>
                <div className="w-8 h-0.5 bg-[#bb86fc] mb-3"></div>
                <p className="text-[11px] leading-relaxed font-medium italic px-2">
                  "{isReversed ? currentCard?.meaning.reversed : currentCard?.meaning.upright}"
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-10 flex flex-col items-center z-10">
        <button 
          disabled={isDrawing}
          className={`px-8 py-3 rounded-full font-bold tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(187,134,252,0.3)] ${
            isDrawing 
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
            : 'bg-[#bb86fc] text-[#1a0a2e] hover:scale-105 active:scale-95'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            drawNewCard();
          }}
        >
          {isDrawing ? 'ĐANG XÀO BÀI...' : 'RÚT LÁ BÀI MỚI'}
        </button>
        
        <p className="mt-4 text-[10px] text-[#bb86fc]/50 tracking-[0.2em] uppercase">
          {isFlipped ? 'Chạm để úp bài' : 'Chạm để lật bài'}
        </p>
      </div>

      <div className="absolute bottom-6 text-[9px] opacity-20 tracking-[0.4em] uppercase pointer-events-none">
        Powered by Vinh Luong 🔮
      </div>
    </main>
  );
}
