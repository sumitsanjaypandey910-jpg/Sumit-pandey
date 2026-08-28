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
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 active:scale-95 transition-all duration-200"
            title="World & Stage Selector"
          >
            <Grid className="w-5 h-5 text-cyan-400" />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-cyan-400 uppercase">
                {world ? world.name : 'World 01'} • STAGE {level.levelNumber < 10 ? `0${level.levelNumber}` : level.levelNumber}
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold bg-white/5 text-slate-400 border border-white/10">
                {level.difficulty}
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase">
              {level.title}
            </span>
          </div>
        </div>

        {/* Right: Progress & Stats & Utility controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Level Progress Segmented Capsules */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Line Flow ({completedLinesCount}/{totalLinesCount})
            </span>
            <div className="flex gap-1.5 mt-1.5">
              {Array.from({ length: segments }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                    idx < filledSegments
                      ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Score / Stars Badge */}
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-2xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono font-bold text-cyan-400 text-xs sm:text-sm">
              {totalStars > 0 ? `${totalStars} ★` : '100%'}
            </span>
          </div>

          {/* Utility Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Daily Streak */}
            <button
              id="btn-daily-challenge"
              onClick={onOpenDaily}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/40 text-amber-300 active:scale-95 transition-all"
              title="Daily Brain Challenge"
            >
              {streak > 0 ? (
                <div className="flex items-center gap-0.5">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-black text-amber-300">{streak}</span>
                </div>
              ) : (
                <Calendar className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Level Studio */}
            <button
              id="btn-level-editor"
              onClick={onOpenEditor}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-400 active:scale-95 transition-all"
              title="Level Studio / Builder"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Rules Guide */}
            <button
              id="btn-how-to-play"
              onClick={onOpenHowToPlay}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-400 active:scale-95 transition-all"
              title="How to Play"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-500/40 text-slate-400 active:scale-95 transition-all"
              title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
