import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, ArrowRight, Grid, Trophy, Sparkles } from 'lucide-react';
import { Level } from '../types';
import { soundManager } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  level: Level;
  stars: number;
  timeSeconds: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onLevelSelect: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  level,
  stars,
  timeSeconds,
  onNextLevel,
  onReplay,
  onLevelSelect
}) => {
  useEffect(() => {
    if (isOpen) {
      // Play sequential star chimes
      for (let i = 0; i < stars; i++) {
        setTimeout(() => {
          soundManager.playStarEarn(i);
        }, 300 + i * 220);
      }

      // Fire vibrant confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff', '#a7f3d0']
      });

      const timeout = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#ffffff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#34d399', '#ffffff']
        });
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, stars]);

  if (!isOpen) return null;

  return (
    <div
      id="victory-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300 select-none"
    >
      <div className="relative w-full max-w-sm rounded-3xl bg-[#041d12]/95 border border-emerald-400/30 p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 shadow-inner">
          <Trophy className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-bounce" />
        </div>

        <div className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase mb-1">
          Stage Cleared • 100% Flow
        </div>
        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase flex items-center justify-center gap-1.5">
          <span>{level.title}</span>
          <Sparkles className="w-5 h-5 text-emerald-300" />
        </h2>

        {/* Stars rating */}
        <div className="flex items-center justify-center gap-3 my-5">
          {[1, 2, 3].map((starIndex) => {
            const isEarned = starIndex <= stars;
            return (
              <div
                key={starIndex}
                className={`transform transition-all duration-500 ${
                  isEarned ? 'scale-110' : 'scale-90 opacity-25'
                }`}
                style={{ transitionDelay: `${starIndex * 150}ms` }}
              >
                <Star
                  className={`w-10 h-10 ${
                    isEarned
                      ? 'text-emerald-400 fill-emerald-400 drop-shadow-[0_0_14px_rgba(52,211,153,0.85)]'
                      : 'text-emerald-950'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Stats card */}
        <div className="bg-white/10 rounded-2xl p-3 border border-white/15 mb-6 flex items-center justify-around text-xs">
          <div>
            <span className="text-emerald-200/70 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Time</span>
            <span className="text-white font-mono font-bold text-sm">{timeSeconds}s</span>
          </div>
          <div className="h-6 w-px bg-white/15" />
          <div>
            <span className="text-emerald-200/70 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Rating</span>
            <span className="text-emerald-300 font-bold text-sm">
              {stars === 3 ? 'Perfect 3★' : stars === 2 ? 'Great 2★' : 'Completed 1★'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5">
          {/* Next Level Primary Button */}
          <button
            id="btn-victory-next"
            onClick={() => {
              soundManager.playClick();
              onNextLevel();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>NEXT STAGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-victory-replay"
              onClick={() => {
                soundManager.playClick();
                onReplay();
              }}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
              <span>Replay</span>
            </button>
            <button
              id="btn-victory-levels"
              onClick={() => {
                soundManager.playClick();
                onLevelSelect();
              }}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              <Grid className="w-3.5 h-3.5 text-emerald-300" />
              <span>Levels</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
