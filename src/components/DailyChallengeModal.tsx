import React from 'react';
import { X, Calendar, Flame, Gift, Star, Play } from 'lucide-react';
import { Level } from '../types';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyLevel: Level;
  onPlayDaily: (level: Level) => void;
  streak: number;
  isDailyCompletedToday: boolean;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  dailyLevel,
  onPlayDaily,
  streak,
  isDailyCompletedToday
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const dateFormatted = today.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      id="daily-challenge-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in select-none"
    >
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-950/95 border border-white/10 p-6 shadow-2xl text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          id="btn-close-daily"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-cyan-400" />
        </div>

        <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase block">Daily Protocol</span>
        <h2 className="text-xl font-black italic tracking-tight text-white uppercase mt-0.5">BRAIN CHALLENGE</h2>
        <p className="text-xs text-slate-400 font-mono font-semibold mt-0.5">{dateFormatted}</p>

        {/* Streak card */}
        <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Streak</span>
            <div className="flex items-center justify-center gap-1 text-base font-black text-amber-400 font-mono">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{streak} Days</span>
            </div>
          </div>
          <div className="h-7 w-px bg-white/10" />
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Reward</span>
            <div className="flex items-center justify-center gap-1 text-base font-black text-cyan-400 font-mono">
              <Gift className="w-4 h-4" />
              <span>+3 Hints</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="my-5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
          {isDailyCompletedToday ? (
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-bold">
              <Star className="w-4 h-4 fill-cyan-400" />
              <span>Today&apos;s challenge completed! Come back tomorrow for the next puzzle.</span>
            </div>
          ) : (
            <span>Solve today&apos;s procedural puzzle in one continuous stroke to keep your streak alive and earn hints!</span>
          )}
        </div>

        {/* Play Button */}
        <button
          id="btn-start-daily"
          onClick={() => {
            onPlayDaily(dailyLevel);
            onClose();
          }}
          className="w-full py-3.5 px-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.45)] active:scale-[0.98] transition-all"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isDailyCompletedToday ? 'REPLAY TODAY\'S PUZZLE' : 'START DAILY PUZZLE'}</span>
        </button>
      </div>
    </div>
  );
};
