"use client";
import { useEffect, useState } from 'react';

export default function TarotPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      setTgUser(tg.initDataUnsafe?.user);
      tg.expand();
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#05020a] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-[#bb86fc] drop-shadow-[0_0_10px_rgba(187,134,252,0.5)]">
          TIỆM TAROT CỦA {tgUser?.first_name?.toUpperCase() || "CHỦ NHÂN"} 🔮
        </h1>
        <p className="text-sm opacity-60 mt-2">Chạm vào lá bài để xem định mệnh...</p>
      </div>

      <div 
        className="relative w-64 h-[400px] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#2e1a47] to-[#4b2c7a] rounded-2xl border-2 border-[#bb86fc] flex items-center justify-center shadow-[0_0_20px_rgba(187,134,252,0.3)]">
            <div className="text-4xl text-[#bb86fc]">✧ 🔮 ✧</div>
          </div>

          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl border-2 border-[#bb86fc] overflow-hidden shadow-[0_0_30px_rgba(187,134,252,0.6)]">
            <div className="w-full h-full flex flex-col items-center justify-center text-[#1a0a2e] p-6 text-center bg-white">
              <div className="text-7xl mb-6">🌟</div>
              <h2 className="text-2xl font-bold mb-2">THE STAR</h2>
              <div className="w-12 h-1 bg-[#bb86fc] mb-4"></div>
              <p className="text-sm italic leading-relaxed">"Hy vọng, cảm hứng và sự dẫn lối của các vì sao đang chiếu sáng con đường của bạn."</p>
            </div>
          </div>

        </div>
      </div>

      <button 
        className="mt-12 px-10 py-3 bg-[#bb86fc] text-[#1a0a2e] font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(187,134,252,0.4)]"
        onClick={() => window.location.reload()}
      >
        TRẢI BÀI MỚI
      </button>

      <div className="mt-8 text-[10px] opacity-30">Powered by Maria ✨</div>
    </main>
  );
}
