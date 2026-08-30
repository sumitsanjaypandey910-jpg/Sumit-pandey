import React, { useState } from 'react';
import { X, Lock, Star, Grid } from 'lucide-react';
import { WORLDS_DATA } from '../data/levels';
import { GameProgress, Level, LevelStats } from '../types';
import { soundManager } from '../utils/audio';

interface LevelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: GameProgress;
  onSelectLevel: (level: Level) => void;
  currentLevelId: number;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  isOpen,
  onClose,
  progress,
  onSelectLevel,
  currentLevelId
}) => {
  const [activeWorldId, setActiveWorldId] = useState<number>(1);

  if (!isOpen) return null;

  const currentWorld = WORLDS_DATA.find((w) => w.id === activeWorldId) || WORLDS_DATA[0];

  // Calculate total stars across all worlds
  const totalStars = (Object.values(progress.completedLevels || {}) as LevelStats[]).reduce(
    (acc: number, l: LevelStats) => acc + (l.stars || 0),
    0
  );

  return (
    <div
      id="level-select-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in select-none"
    >
      <div className="relative w-full max-w-md max-h-[85vh] rounded-3xl bg-slate-950/95 border border-white/10 p-5 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Grid className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase block">Campaign Hub</span>
              <h2 className="text-base font-black italic tracking-tight text-white uppercase">SELECT STAGE</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5 text-xs text-cyan-400 font-mono font-bold">
              <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              <span>{totalStars}</span>
            </div>
            <button
              id="btn-close-level-select"
              onClick={() => {
                soundManager.playModalClose();
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* World Tabs */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
          {WORLDS_DATA.map((world) => {
            const isSelected = world.id === activeWorldId;
            return (
              <button
                key={world.id}
                id={`world-tab-${world.id}`}
                onClick={() => {
                  soundManager.playClick();
                  setActiveWorldId(world.id);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                }`}
              >
                <span>{world.name}</span>
                <span className="text-[9px] opacity-80 font-normal">({world.badge})</span>
              </button>
            );
          })}
        </div>

        {/* World Info Card */}
        <div className="mb-3 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">{currentWorld.name} - {currentWorld.subtitle}</div>
            <div className="text-[11px] text-slate-400">{currentWorld.levels.length} Stages Available</div>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {currentWorld.badge}
          </span>
        </div>

        {/* Stage Grid */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-3 sm:grid-cols-4 gap-2.5 my-1">
          {currentWorld.levels.map((lvl, index) => {
            const stats = progress.completedLevels[lvl.id];
            const isCompleted = !!stats;
            // Level is unlocked if it's the first in world 1, or completed, or previous level is completed
            const isUnlocked =
              (currentWorld.id === 1 && index === 0) ||
              isCompleted ||
              (index > 0 && !!progress.completedLevels[currentWorld.levels[index - 1].id]) ||
              (currentWorld.id > 1 && index === 0);

            const isCurrent = lvl.id === currentLevelId;

            return (
              <button
                key={lvl.id}
                id={`level-card-${lvl.id}`}
                onClick={() => {
                  if (isUnlocked) {
                    soundManager.playClick();
                    onSelectLevel(lvl);
                    onClose();
                  } else {
                    soundManager.playInvalidMove();
                  }
                }}
                disabled={!isUnlocked}
                className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border transition-all text-center aspect-square ${
                  isCurrent
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] ring-1 ring-cyan-400'
                    : isCompleted
                    ? 'bg-white/5 border-white/15 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10'
                    : isUnlocked
                    ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/5 cursor-pointer'
                    : 'bg-white/[0.01] border-white/5 text-slate-700 cursor-not-allowed'
                }`}
              >
                {/* Level number */}
                <div className="text-sm font-black italic tracking-tighter mt-1 font-mono">
                  {isUnlocked ? (lvl.levelNumber < 10 ? `0${lvl.levelNumber}` : lvl.levelNumber) : <Lock className="w-3.5 h-3.5 mx-auto text-slate-700" />}
                </div>

                {/* Level Title */}
                <div className="text-[10px] text-slate-400 truncate w-full px-1 font-medium">
                  {lvl.title}
                </div>

                {/* Stars / locked footer */}
                <div className="flex items-center justify-center gap-0.5 mb-0.5">
                  {isCompleted ? (
                    [1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-2.5 h-2.5 ${
                          s <= (stats.stars || 1) ? 'text-cyan-400 fill-cyan-400' : 'text-slate-800'
                        }`}
                      />
                    ))
                  ) : isUnlocked ? (
                    <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">Ready</span>
                  ) : (
                    <span className="text-[9px] text-slate-700 uppercase tracking-wider">Locked</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
