import React from 'react';
import { X, Calendar, Flame, Gift, Star, Play } from 'lucide-react';
import { Level } from '../types';
import { soundManager } from '../utils/audio';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in select-none"
    >
      <div className="relative w-full max-w-sm rounded-3xl bg-[#041d12]/95 border border-emerald-500/30 p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close */}
        <button
          id="btn-close-daily"
          onClick={() => {
            soundManager.playModalClose();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 shadow-inner">
          <Calendar className="w-8 h-8 text-emerald-400" />
        </div>

        <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase block">Daily Protocol</span>
        <h2 className="text-xl font-black italic tracking-tight text-white uppercase mt-0.5">BRAIN CHALLENGE</h2>
        <p className="text-xs text-emerald-200/70 font-mono font-semibold mt-0.5">{dateFormatted}</p>

        {/* Streak card */}
        <div className="mt-4 p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-around">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70 block mb-0.5">Streak</span>
            <div className="flex items-center justify-center gap-1 text-base font-black text-emerald-300 font-mono">
              <Flame className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>{streak} Days</span>
            </div>
          </div>
          <div className="h-7 w-px bg-white/15" />
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70 block mb-0.5">Reward</span>
            <div className="flex items-center justify-center gap-1 text-base font-black text-white font-mono">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>+3 Hints</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="my-5 p-3 rounded-2xl bg-white/10 border border-white/15 text-xs text-white/90">
          {isDailyCompletedToday ? (
            <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-bold">
              <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
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
            soundManager.playClick();
            onPlayDaily(dailyLevel);
            onClose();
          }}
          className="w-full py-3.5 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isDailyCompletedToday ? 'REPLAY TODAY\'S PUZZLE' : 'START DAILY PUZZLE'}</span>
        </button>
      </div>
    </div>
  );
};
