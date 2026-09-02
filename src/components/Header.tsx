import React from 'react';
import { Volume2, VolumeX, Grid, HelpCircle, Calendar, Edit3, Flame, Sparkles } from 'lucide-react';
import { Level, World } from '../types';

interface HeaderProps {
  level: Level;
  world?: World;
  completedLinesCount: number;
  totalLinesCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLevelSelect: () => void;
  onOpenHowToPlay: () => void;
  onOpenDaily: () => void;
  onOpenEditor: () => void;
  streak: number;
  totalStars?: number;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  world,
  completedLinesCount,
  totalLinesCount,
  soundEnabled,
  onToggleSound,
  onOpenLevelSelect,
  onOpenHowToPlay,
  onOpenDaily,
  onOpenEditor,
  streak,
  totalStars = 0
}) => {
  // Segmented progress capsules (5 segments)
  const segments = 5;
  const progressRatio = totalLinesCount > 0 ? completedLinesCount / totalLinesCount : 0;
  const filledSegments = Math.round(progressRatio * segments);

  return (
    <header id="game-header" className="w-full max-w-4xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-2 select-none">
      {/* Sleek Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
        {/* Left: World / Stage Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="btn-level-select"
            onClick={onOpenLevelSelect}
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-emerald-400/60 text-white hover:text-emerald-300 active:scale-95 transition-all duration-200 shadow-sm"
            title="World & Stage Selector"
          >
            <Grid className="w-5 h-5 text-emerald-400" />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase">
                {world ? world.name : 'World 01'} • STAGE {level.levelNumber < 10 ? `0${level.levelNumber}` : level.levelNumber}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold bg-white/10 text-white border border-white/20">
                {level.difficulty}
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase drop-shadow-sm">
              {level.title}
            </span>
          </div>
        </div>

        {/* Right: Progress & Stats & Utility controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Level Progress Segmented Capsules */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-emerald-100/70 tracking-wider uppercase">
              Line Flow ({completedLinesCount}/{totalLinesCount})
            </span>
            <div className="flex gap-1.5 mt-1.5">
              {Array.from({ length: segments }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                    idx < filledSegments
                      ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]'
                      : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Score / Stars Badge */}
          <div className="bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-bold text-emerald-300 text-xs sm:text-sm">
              {totalStars > 0 ? `${totalStars} ★` : '100%'}
            </span>
          </div>

          {/* Utility Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Daily Streak */}
            <button
              id="btn-daily-challenge"
              onClick={onOpenDaily}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-emerald-400/50 text-emerald-300 active:scale-95 transition-all shadow-sm"
              title="Daily Brain Challenge"
            >
              {streak > 0 ? (
                <div className="flex items-center gap-0.5">
                  <Flame className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span className="text-[10px] font-black text-white">{streak}</span>
                </div>
              ) : (
                <Calendar className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Level Studio */}
            <button
              id="btn-level-editor"
              onClick={onOpenEditor}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:text-emerald-300 hover:border-emerald-400/50 text-white/80 active:scale-95 transition-all shadow-sm"
              title="Level Studio / Builder"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Rules Guide */}
            <button
              id="btn-how-to-play"
              onClick={onOpenHowToPlay}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:text-emerald-300 hover:border-emerald-400/50 text-white/80 active:scale-95 transition-all shadow-sm"
              title="How to Play"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 hover:text-emerald-300 hover:border-emerald-400/50 text-white/80 active:scale-95 transition-all shadow-sm"
              title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
