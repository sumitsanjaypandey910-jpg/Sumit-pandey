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
              ? 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 shadow-lg'
              : 'bg-white/[0.02] border-white/5 text-slate-700 cursor-not-allowed opacity-40'
          }`}
          title="Undo last stroke"
        >
          <Undo2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-cyan-400 transition-colors" />
        </button>

        {/* Restart / Reset Button */}
        <button
          id="btn-reset-board"
          onClick={onReset}
          disabled={!canReset || isComplete}
          className={`group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border transition-all duration-300 active:scale-95 ${
            canReset && !isComplete
              ? 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 shadow-lg'
              : 'bg-white/[0.02] border-white/5 text-slate-700 cursor-not-allowed opacity-40'
          }`}
          title="Reset stage"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-cyan-400 transition-colors" />
        </button>

        {/* Hero Central Action Button (Next Stage on complete or Hint Button during play) */}
        {isComplete && onNextLevel ? (
          <button
            id="btn-quick-next"
            onClick={onNextLevel}
            className="group flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
            title="Next Stage"
          >
            <SkipForward className="w-7 h-7 sm:w-9 sm:h-9 fill-slate-950" />
            <span className="text-[10px] font-black tracking-wider uppercase mt-0.5">Next</span>
          </button>
        ) : (
          <button
            id="btn-hint"
            onClick={onUseHint}
            className={`group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 active:scale-95 ${
              isHintActive
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_40px_rgba(245,158,11,0.6)] animate-pulse'
                : hintsAvailable > 0
                ? 'bg-cyan-400 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.45)] hover:scale-105'
                : 'bg-white/10 border border-white/15 text-slate-400 hover:bg-white/15'
            }`}
            title="Get Hint"
          >
            {/* Hint counter pill */}
            <span className="absolute -top-1 right-2 px-2 py-0.5 rounded-full bg-slate-950 text-cyan-400 border border-cyan-400/40 font-mono font-black text-[10px] shadow">
              {hintsAvailable}
            </span>
            <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
            <span className="text-[10px] font-black tracking-widest uppercase mt-0.5">HINT</span>
          </button>
        )}
      </div>

      {/* Sleek Bottom Telemetry Information */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-500 uppercase px-2">
        <span>Difficulty: {difficulty}</span>
        <span className="w-1 h-1 bg-slate-700 rounded-full" />
        <span>
          Nodes: {visitedNodesCount < 10 ? `0${visitedNodesCount}` : visitedNodesCount}/
          {totalNodesCount < 10 ? `0${totalNodesCount}` : totalNodesCount}
        </span>
        <span className="w-1 h-1 bg-slate-700 rounded-full" />
        <span>Moves: {movesCount < 10 ? `0${movesCount}` : movesCount}</span>
      </div>
    </footer>
  );
};
