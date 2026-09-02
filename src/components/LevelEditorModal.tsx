import React, { useState, useMemo } from 'react';
import { X, Plus, Trash2, Play, CheckCircle2, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { Dot, Level, LevelLine, LineType } from '../types';
import { findEulerianPath } from '../utils/eulerSolver';

interface LevelEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaytestLevel: (level: Level) => void;
}

export const LevelEditorModal: React.FC<LevelEditorModalProps> = ({
  isOpen,
  onClose,
  onPlaytestLevel
}) => {
  const [dots, setDots] = useState<Dot[]>([
    { id: 1, x: 50, y: 20 },
    { id: 2, x: 20, y: 70 },
    { id: 3, x: 80, y: 70 }
  ]);
  const [lines, setLines] = useState<LevelLine[]>([
    { from: 1, to: 2, type: 'normal' },
    { from: 2, to: 3, type: 'normal' },
    { from: 3, to: 1, type: 'normal' }
  ]);
  const [selectedDotId, setSelectedDotId] = useState<number | null>(null);
  const [activeLineType, setActiveLineType] = useState<LineType>('normal');
  const [title, setTitle] = useState('My Custom Puzzle');

  // Verify solvability
  const solutionPath = useMemo(() => {
    return findEulerianPath(dots, lines);
  }, [dots, lines]);

  const isSolvable = solutionPath !== null && lines.length > 0;

  if (!isOpen) return null;

  // Handle canvas click to place new dot
  const handleBoardClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Convert to percentage
    const x = Math.round(Math.max(10, Math.min(90, (px / rect.width) * 100)));
    const y = Math.round(Math.max(10, Math.min(90, (py / rect.height) * 100)));

    // Check if clicked near an existing dot
    const clickedDot = dots.find(
      (d) => Math.hypot((d.x / 100) * rect.width - px, (d.y / 100) * rect.height - py) < 22
    );

    if (clickedDot) {
      if (selectedDotId === null) {
        setSelectedDotId(clickedDot.id);
      } else if (selectedDotId === clickedDot.id) {
        setSelectedDotId(null);
      } else {
        // Connect or toggle line between selectedDotId and clickedDot.id
        const existingIdx = lines.findIndex(
          (l) =>
            (l.from === selectedDotId && l.to === clickedDot.id) ||
            (l.type !== 'one-way' && l.from === clickedDot.id && l.to === selectedDotId)
        );

        if (existingIdx >= 0) {
          // Remove existing line
          setLines(lines.filter((_, idx) => idx !== existingIdx));
        } else {
          // Add new line with current activeLineType
          setLines([
            ...lines,
            { from: selectedDotId, to: clickedDot.id, type: activeLineType }
          ]);
        }
        setSelectedDotId(null);
      }
    } else {
      // Place new dot if fewer than 15 dots
      if (dots.length < 15) {
        const nextId = dots.length > 0 ? Math.max(...dots.map((d) => d.id)) + 1 : 1;
        setDots([...dots, { id: nextId, x, y }]);
        setSelectedDotId(null);
      }
    }
  };

  const handleDeleteDot = (dotId: number) => {
    setDots(dots.filter((d) => d.id !== dotId));
    setLines(lines.filter((l) => l.from !== dotId && l.to !== dotId));
    if (selectedDotId === dotId) setSelectedDotId(null);
  };

  const handleClearAll = () => {
    setDots([]);
    setLines([]);
    setSelectedDotId(null);
  };

  const handleStartPlaytest = () => {
    if (!isSolvable) return;
    const customLevel: Level = {
      id: Date.now(),
      worldId: 999,
      levelNumber: 1,
      title: title.trim() || 'Custom Level',
      difficulty: lines.length > 10 ? 'Hard' : lines.length > 6 ? 'Medium' : 'Beginner',
      parTime: Math.max(15, lines.length * 3),
      dots,
      lines,
      hintPath: solutionPath || undefined
    };
    onPlaytestLevel(customLevel);
    onClose();
  };

  return (
    <div
      id="level-editor-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in select-none"
    >
      <div className="relative w-full max-w-md max-h-[90vh] rounded-3xl bg-[#041d12]/95 border border-emerald-500/30 p-5 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase block">Node Architect</span>
              <h2 className="text-base font-black italic tracking-tight text-white uppercase">LEVEL STUDIO</h2>
            </div>
          </div>

          <button
            id="btn-close-editor"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title Input & Line Type selector */}
        <div className="py-2.5 flex flex-col gap-2">
          <input
            id="editor-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Puzzle Name..."
            className="w-full px-3.5 py-2 rounded-2xl bg-white/10 border border-white/20 text-xs text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 font-medium"
          />

          <div className="flex items-center justify-between gap-2 px-1">
            <span className="text-[10px] text-emerald-200/70 font-bold uppercase tracking-wider">Line Tool:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveLineType('normal')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeLineType === 'normal'
                    ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)] font-black'
                    : 'bg-white/10 border-white/20 text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setActiveLineType('one-way')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeLineType === 'one-way'
                    ? 'bg-emerald-300 text-slate-950 border-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.6)] font-black'
                    : 'bg-white/10 border-white/20 text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                One-Way ➔
              </button>
              <button
                onClick={() => setActiveLineType('double')}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeLineType === 'double'
                    ? 'bg-white text-slate-950 border-white shadow-[0_0_12px_rgba(255,255,255,0.6)] font-black'
                    : 'bg-white/10 border-white/20 text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                2x Double
              </button>
            </div>
          </div>
        </div>

        {/* Editor Interactive Canvas */}
        <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-[#02130b] rounded-2xl border border-emerald-500/30 overflow-hidden shadow-inner my-1">
          {/* Subtle Grid dots */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

          <svg
            className="w-full h-full cursor-crosshair"
            viewBox="0 0 100 100"
            onClick={handleBoardClick}
          >
            {/* Draw lines */}
            {lines.map((line, idx) => {
              const f = dots.find((d) => d.id === line.from);
              const t = dots.find((d) => d.id === line.to);
              if (!f || !t) return null;

              if (line.type === 'double') {
                return (
                  <g key={idx}>
                    <line
                      x1={f.x - 1.2}
                      y1={f.y - 1.2}
                      x2={t.x - 1.2}
                      y2={t.y - 1.2}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={f.x + 1.2}
                      y1={f.y + 1.2}
                      x2={t.x + 1.2}
                      y2={t.y + 1.2}
                      stroke="#34d399"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              }

              if (line.type === 'one-way') {
                const midX = (f.x + t.x) / 2;
                const midY = (f.y + t.y) / 2;
                return (
                  <g key={idx}>
                    <line
                      x1={f.x}
                      y1={f.y}
                      x2={t.x}
                      y2={t.y}
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <circle cx={midX} cy={midY} r="2.2" fill="#ffffff" />
                  </g>
                );
              }

              return (
                <line
                  key={idx}
                  x1={f.x}
                  y1={f.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="#10b981"
                  strokeWidth="2"
                />
              );
            })}

            {/* Draw dots */}
            {dots.map((d) => {
              const isSelected = selectedDotId === d.id;
              return (
                <g key={d.id} transform={`translate(${d.x}, ${d.y})`}>
                  <circle
                    r={isSelected ? 6 : 4.5}
                    fill={isSelected ? '#34d399' : '#03170e'}
                    stroke={isSelected ? '#ffffff' : '#10b981'}
                    strokeWidth={isSelected ? 2 : 1.5}
                  />
                  <text
                    y="1.5"
                    fontSize="3.5"
                    fill="#ffffff"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {d.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Solver status bar */}
        <div className="mt-2 p-2.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSolvable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {isSolvable ? 'Eulerian Circuit Valid' : 'Incomplete / Unsolvable'}
            </span>
          </div>

          <span className="text-[10px] text-emerald-200/70 font-mono font-bold uppercase tracking-wider">
            {dots.length} NODES · {lines.length} VECTORS
          </span>
        </div>

        {/* Bottom actions */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleClearAll}
            className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white/70 hover:text-rose-400 hover:bg-white/20 transition-all cursor-pointer"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            id="btn-playtest"
            onClick={handleStartPlaytest}
            disabled={!isSolvable}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              isSolvable
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-[0.98] cursor-pointer'
                : 'bg-white/5 border border-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAYTEST STAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
