import React from 'react';
import { RotateCcw, Undo2, Lightbulb, SkipForward } from 'lucide-react';

interface ControlsProps {
  canUndo: boolean;
  canReset: boolean;
  hintsAvailable: number;
  isHintActive: boolean;
  onUndo: () => void;
  onReset: () => void;
  onUseHint: () => void;
  onSkip?: () => void;
  isComplete: boolean;
  onNextLevel?: () => void;
  accentColor?: string;
  difficulty?: string;
  visitedNodesCount?: number;
  totalNodesCount?: number;
  movesCount?: number;
}

export const Controls: React.FC<ControlsProps> = ({
  canUndo,
  canReset,
  hintsAvailable,
  isHintActive,
  onUndo,
  onReset,
  onUseHint,
  isComplete,
  onNextLevel,
  difficulty = 'Master',
  visitedNodesCount = 0,
  totalNodesCount = 0,
  movesCount = 0
}) => {
  return (
    <footer id="game-controls" className="w-full max-w-xl mx-auto px-4 pt-2 pb-6 sm:pb-8 flex flex-col items-center gap-4 sm:gap-6 select-none">
      {/* Sleek Circular Action Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {/* Undo Button */}
        <button
          id="btn-undo-move"
          onClick={onUndo}
          disabled={!canUndo || isComplete}
          className={`group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border transition-all duration-300 active:scale-95 ${
            canUndo && !isComplete
              ? 'bg-white/10 border-white/20 hover:border-emerald-400/60 hover:bg-emerald-500/15 text-white hover:text-emerald-300 shadow-lg cursor-pointer'
              : 'bg-white/[0.03] border-white/5 text-white/25 cursor-not-allowed opacity-40'
          }`}
          title="Undo last stroke"
        >
          <Undo2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-emerald-300 transition-colors" />
        </button>

        {/* Restart / Reset Button */}
        <button
          id="btn-reset-board"
          onClick={onReset}
          disabled={!canReset || isComplete}
          className={`group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border transition-all duration-300 active:scale-95 ${
            canReset && !isComplete
              ? 'bg-white/10 border-white/20 hover:border-emerald-400/60 hover:bg-emerald-500/15 text-white hover:text-emerald-300 shadow-lg cursor-pointer'
              : 'bg-white/[0.03] border-white/5 text-white/25 cursor-not-allowed opacity-40'
          }`}
          title="Reset stage"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-emerald-300 transition-colors" />
        </button>

        {/* Hero Central Action Button (Next Stage on complete or Hint Button during play) */}
        {isComplete && onNextLevel ? (
          <button
            id="btn-quick-next"
            onClick={onNextLevel}
            className="group flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-400 text-slate-950 shadow-[0_0_40px_rgba(52,211,153,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Next Stage"
          >
            <SkipForward className="w-7 h-7 sm:w-9 sm:h-9 fill-slate-950" />
            <span className="text-[10px] font-black tracking-wider uppercase mt-0.5">Next</span>
          </button>
        ) : (
          <button
            id="btn-hint"
            onClick={onUseHint}
            className={`group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 active:scale-95 cursor-pointer ${
              isHintActive
                ? 'bg-emerald-300 text-slate-950 shadow-[0_0_40px_rgba(110,231,183,0.8)] animate-pulse ring-4 ring-white/50'
                : hintsAvailable > 0
                ? 'bg-emerald-400 text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 hover:bg-emerald-300'
                : 'bg-white/10 border border-white/20 text-white/50 hover:bg-white/15'
            }`}
            title="Get Hint"
          >
            {/* Hint counter pill */}
            <span className="absolute -top-1 right-2 px-2 py-0.5 rounded-full bg-[#03170e] text-emerald-300 border border-emerald-400/40 font-mono font-black text-[10px] shadow">
              {hintsAvailable}
            </span>
            <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
            <span className="text-[10px] font-black tracking-widest uppercase mt-0.5">HINT</span>
          </button>
        )}
      </div>

      {/* Sleek Bottom Telemetry Information */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-bold tracking-widest text-emerald-100/60 uppercase px-2">
        <span>Difficulty: <strong className="text-white font-semibold">{difficulty}</strong></span>
        <span className="w-1 h-1 bg-emerald-500/40 rounded-full" />
        <span>
          Nodes: <strong className="text-white font-semibold">{visitedNodesCount < 10 ? `0${visitedNodesCount}` : visitedNodesCount}/{totalNodesCount < 10 ? `0${totalNodesCount}` : totalNodesCount}</strong>
        </span>
        <span className="w-1 h-1 bg-emerald-500/40 rounded-full" />
        <span>Moves: <strong className="text-white font-semibold">{movesCount < 10 ? `0${movesCount}` : movesCount}</strong></span>
      </div>
    </footer>
  );
};
