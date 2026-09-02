import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Dot, Level, RuntimeLine, StrokeStep } from '../types';
import { soundManager, triggerHaptic } from '../utils/audio';

interface GameBoardProps {
  level: Level;
  strokeHistory: StrokeStep[];
  currentDotId: number | null;
  activeLines: RuntimeLine[];
  onDotConnect: (fromId: number, toId: number, lineId: string) => void;
  onStartDotSelect: (dotId: number) => void;
  hintStep: { from: number; to: number } | null;
  isComplete: boolean;
  accentColor?: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  level,
  strokeHistory,
  currentDotId,
  activeLines,
  onDotConnect,
  onStartDotSelect,
  hintStep,
  isComplete,
  accentColor = '#10b981'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState<{ width: number; height: number }>({ width: 440, height: 440 });
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [errorLine, setErrorLine] = useState<{ from: number; to: number } | null>(null);

  // ResizeObserver for dynamic responsive sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const size = Math.min(width, height);
        if (size > 0) {
          setBoardSize({ width: size, height: size });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Convert percentage coordinates to pixel coordinates on board
  const getDotPos = useCallback(
    (dot: Dot) => {
      const padding = 42;
      const effectiveW = boardSize.width - padding * 2;
      const effectiveH = boardSize.height - padding * 2;
      return {
        x: padding + (dot.x / 100) * effectiveW,
        y: padding + (dot.y / 100) * effectiveH
      };
    },
    [boardSize]
  );

  const dotsMap = useMemo(() => {
    const map = new Map<number, Dot>();
    level.dots.forEach((d) => map.set(d.id, d));
    return map;
  }, [level.dots]);

  // Find line connecting two dots
  const findConnectingLine = useCallback(
    (dotAId: number, dotBId: number) => {
      return activeLines.find((line) => {
        if (line.passesRemaining <= 0) return false;
        if (line.type === 'one-way') {
          return line.from === dotAId && line.to === dotBId;
        }
        return (line.from === dotAId && line.to === dotBId) || (line.from === dotBId && line.to === dotAId);
      });
    },
    [activeLines]
  );

  // Check if a move from currentDotId to targetDotId is legal
  const tryMove = useCallback(
    (targetDotId: number) => {
      if (isComplete) return;

      if (currentDotId === null) {
        // First selection
        onStartDotSelect(targetDotId);
        soundManager.playDotSelect();
        triggerHaptic('light');
        return;
      }

      if (currentDotId === targetDotId) return;

      const line = findConnectingLine(currentDotId, targetDotId);
      if (line) {
        // Valid move!
        onDotConnect(currentDotId, targetDotId, line.id);
        triggerHaptic('medium');
      } else {
        // Invalid move feedback
        setErrorLine({ from: currentDotId, to: targetDotId });
        soundManager.playInvalidMove();
        triggerHaptic('warning');
        setTimeout(() => setErrorLine(null), 300);
      }
    },
    [currentDotId, findConnectingLine, isComplete, onDotConnect, onStartDotSelect]
  );

  // Find closest dot to pointer coordinates within magnetic radius
  const getNearbyDot = useCallback(
    (px: number, py: number, radius = 48): Dot | null => {
      for (const dot of level.dots) {
        const dotPos = getDotPos(dot);
        const dist = Math.hypot(dotPos.x - px, dotPos.y - py);
        if (dist <= radius) {
          return dot;
        }
      }
      return null;
    },
    [getDotPos, level.dots]
  );

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isComplete || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    setIsPointerDown(true);
    setDragPos({ x: px, y: py });

    const dot = getNearbyDot(px, py);
    if (dot) {
      tryMove(dot.id);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    setDragPos({ x: px, y: py });

    const dot = getNearbyDot(px, py, 44);
    if (dot && dot.id !== currentDotId) {
      tryMove(dot.id);
    }
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);
    setDragPos(null);
  };

  // Traversed line set for quick lookup
  const traversedCounts = useMemo(() => {
    const counts = new Map<string, number>();
    strokeHistory.forEach((s) => {
      counts.set(s.lineId, (counts.get(s.lineId) || 0) + 1);
    });
    return counts;
  }, [strokeHistory]);

  const activeDotPos = currentDotId !== null && dotsMap.get(currentDotId) ? getDotPos(dotsMap.get(currentDotId)!) : null;

  // Completion calculation for side flow velocity indicator
  const totalLines = activeLines.reduce((acc, l) => acc + l.totalPasses, 0);
  const doneLines = activeLines.reduce((acc, l) => acc + (l.totalPasses - l.passesRemaining), 0);
  const flowPercent = totalLines > 0 ? (doneLines / totalLines) * 100 : 0;

  return (
    <div className="relative w-full max-w-xl flex items-center justify-center">
      {/* Sleek Side Flow Velocity Gauge (Hidden on very compact screens) */}
      <div className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <div className="w-1.5 h-28 bg-white/10 rounded-full relative overflow-hidden border border-white/20">
          <div
            className="absolute bottom-0 w-full bg-emerald-400 shadow-[0_0_12px_#10b981] transition-all duration-300"
            style={{ height: `${flowPercent}%` }}
          />
        </div>
        <span className="text-[9px] font-bold tracking-widest text-emerald-200/60 uppercase rotate-90 origin-center mt-6 whitespace-nowrap">
          FLOW: {Math.round(flowPercent)}%
        </span>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        id="game-board-container"
        className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <svg
          id="game-board-svg"
          width={boardSize.width}
          height={boardSize.height}
          className="w-full h-full drop-shadow-[0_0_30px_rgba(16,185,129,0.25)] overflow-visible"
        >
          <defs>
            {/* Sleek Emerald Line Glow */}
            <filter id="sleek-emerald-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense active node pulse */}
            <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrowhead marker for one-way lines */}
            <marker
              id="arrowhead-unvisited"
              markerWidth="10"
              markerHeight="10"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7, 2 3.5" fill="#34d399" />
            </marker>
            <marker
              id="arrowhead-sleek"
              markerWidth="10"
              markerHeight="10"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7, 2 3.5" fill={accentColor} />
            </marker>
          </defs>

          {/* Large Watermark Stage Number in Sleek Background */}
          <text
            x="50%"
            y="54%"
            fill="rgba(255,255,255,0.04)"
            fontSize={Math.round(boardSize.width * 0.38)}
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="middle"
            fontStyle="italic"
            className="pointer-events-none select-none font-sans"
          >
            {level.levelNumber < 10 ? `0${level.levelNumber}` : level.levelNumber}
          </text>

          {/* --- Background Guide Skeleton Lines & Filled Neon Strokes --- */}
          {activeLines.map((line) => {
            const fromDot = dotsMap.get(line.from);
            const toDot = dotsMap.get(line.to);
            if (!fromDot || !toDot) return null;

            const p1 = getDotPos(fromDot);
            const p2 = getDotPos(toDot);
            const traversedCount = traversedCounts.get(line.id) || 0;
            const isFullyTraversed = line.passesRemaining === 0;
            const isPartiallyTraversed = line.totalPasses === 2 && traversedCount === 1;

            // Double line rendering (dual parallel lines offset by normal vector)
            if (line.type === 'double') {
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const len = Math.hypot(dx, dy) || 1;
              const nx = (-dy / len) * 4.5;
              const ny = (dx / len) * 4.5;

              return (
                <g key={line.id} id={`line-${line.id}`}>
                  {/* Track 1 Skeleton / Active */}
                  <line
                    x1={p1.x + nx}
                    y1={p1.y + ny}
                    x2={p2.x + nx}
                    y2={p2.y + ny}
                    stroke={traversedCount >= 1 ? accentColor : 'rgba(255,255,255,0.12)'}
                    strokeWidth={traversedCount >= 1 ? 7 : 4}
                    strokeLinecap="round"
                    filter={traversedCount >= 1 ? 'url(#sleek-emerald-glow)' : undefined}
                    className={traversedCount >= 1 ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}
                  />
                  {/* Track 2 Skeleton / Active */}
                  <line
                    x1={p1.x - nx}
                    y1={p1.y - ny}
                    x2={p2.x - nx}
                    y2={p2.y - ny}
                    stroke={
                      traversedCount >= 2
                        ? accentColor
                        : isPartiallyTraversed
                        ? 'rgba(52,211,153,0.35)'
                        : 'rgba(255,255,255,0.12)'
                    }
                    strokeWidth={traversedCount >= 2 ? 7 : 4}
                    strokeLinecap="round"
                    filter={traversedCount >= 2 ? 'url(#sleek-emerald-glow)' : undefined}
                    className={traversedCount >= 2 ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}
                  />
                  {/* Double badge indicator if not fully traversed */}
                  {!isFullyTraversed && (
                    <g transform={`translate(${(p1.x + p2.x) / 2}, ${(p1.y + p2.y) / 2})`}>
                      <circle
                        r={9}
                        fill="#03170e"
                        stroke="#34d399"
                        strokeWidth={1.5}
                        className="shadow"
                      />
                      <text
                        y={3}
                        fill="#a7f3d0"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        2x
                      </text>
                    </g>
                  )}
                </g>
              );
            }

            // One-way directional line
            if (line.type === 'one-way') {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

              return (
                <g key={line.id} id={`line-${line.id}`}>
                  {/* Skeleton background */}
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={isFullyTraversed ? accentColor : 'rgba(255,255,255,0.14)'}
                    strokeWidth={isFullyTraversed ? 8 : 6}
                    strokeLinecap="round"
                    filter={isFullyTraversed ? 'url(#sleek-emerald-glow)' : undefined}
                    className={isFullyTraversed ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}
                  />
                  {/* Directional Chevron */}
                  <g transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                    <path
                      d="M -7 -6 L 2 0 L -7 6"
                      fill="none"
                      stroke={isFullyTraversed ? '#ffffff' : '#34d399'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              );
            }

            // Normal single line: sleek subtle white skeleton if unvisited, vibrant emerald if traversed
            return (
              <g key={line.id} id={`line-${line.id}`}>
                {/* Guide Skeleton line */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={isFullyTraversed ? accentColor : 'rgba(255,255,255,0.14)'}
                  strokeWidth={isFullyTraversed ? 8 : 6}
                  strokeLinecap="round"
                  filter={isFullyTraversed ? 'url(#sleek-emerald-glow)' : undefined}
                  className={isFullyTraversed ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}
                />
              </g>
            );
          })}

          {/* --- Hint Ghost Trail --- */}
          {hintStep && (
            <g id="hint-ghost-line" className="animate-pulse">
              {(() => {
                const f = dotsMap.get(hintStep.from);
                const t = dotsMap.get(hintStep.to);
                if (!f || !t) return null;
                const p1 = getDotPos(f);
                const p2 = getDotPos(t);
                return (
                  <>
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#34d399"
                      strokeWidth="6"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      filter="url(#intense-glow)"
                      className="opacity-95"
                    />
                    <circle cx={p1.x} cy={p1.y} r={16} fill="none" stroke="#ffffff" strokeWidth="2.5" />
                    <circle cx={p2.x} cy={p2.y} r={16} fill="none" stroke="#ffffff" strokeWidth="2.5" />
                  </>
                );
              })()}
            </g>
          )}

          {/* --- Error Rejection Flash --- */}
          {errorLine && (
            <g id="error-flash-line">
              {(() => {
                const f = dotsMap.get(errorLine.from);
                const t = dotsMap.get(errorLine.to);
                if (!f || !t) return null;
                const p1 = getDotPos(f);
                const p2 = getDotPos(t);
                return (
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="#f87171"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-ping opacity-80"
                  />
                );
              })()}
            </g>
          )}

          {/* --- Dynamic Rubber Band Stroke Trail to Cursor --- */}
          {isPointerDown && activeDotPos && dragPos && !isComplete && (
            <line
              id="active-drag-trail"
              x1={activeDotPos.x}
              y1={activeDotPos.y}
              x2={dragPos.x}
              y2={dragPos.y}
              stroke={accentColor}
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-90 transition-all duration-75"
            />
          )}

          {/* --- Graph Nodes / Dots (Sleek High-Contrast Geometric Spheres) --- */}
          {level.dots.map((dot) => {
            const pos = getDotPos(dot);
            const isActive = currentDotId === dot.id;
            const isVisited = strokeHistory.some((s) => s.from === dot.id || s.to === dot.id);
            const isHintTarget = hintStep && (hintStep.from === dot.id || hintStep.to === dot.id);

            return (
              <g
                key={dot.id}
                id={`dot-${dot.id}`}
                className="cursor-pointer transition-transform duration-150"
                transform={`translate(${pos.x}, ${pos.y})`}
              >
                {/* Invisible generous touch target */}
                <circle r="30" fill="transparent" />

                {/* Active pulsing emerald aura */}
                {isActive && (
                  <>
                    <circle
                      r="22"
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="2.5"
                      className="animate-ping opacity-50"
                    />
                    <circle
                      r="16"
                      fill={accentColor}
                      className="opacity-35"
                      filter="url(#intense-glow)"
                    />
                  </>
                )}

                {/* Outer sleek circle (Crisp White base, Emerald when visited) */}
                <circle
                  r={isActive ? 14 : isVisited ? 12 : 11}
                  fill={
                    isActive
                      ? accentColor
                      : isVisited
                      ? accentColor
                      : '#ffffff'
                  }
                  stroke={
                    isActive
                      ? '#ffffff'
                      : isHintTarget
                      ? '#34d399'
                      : isVisited
                      ? '#ffffff'
                      : 'rgba(255,255,255,0.8)'
                  }
                  strokeWidth={isActive ? 3 : 2}
                  className={`transition-all duration-200 ${
                    isActive
                      ? 'shadow-lg shadow-emerald-500/60'
                      : isVisited
                      ? 'shadow-md shadow-emerald-500/40'
                      : 'shadow-md shadow-black/40'
                  }`}
                />

                {/* Inner center core pip */}
                <circle
                  r={isActive ? 6 : isVisited ? 4.5 : 3.5}
                  fill={isActive ? '#02150c' : isVisited ? '#02150c' : '#052216'}
                  className="transition-all duration-200"
                />

                {/* Optional node label */}
                {dot.label && (
                  <text
                    y="22"
                    fill="#a7f3d0"
                    fontSize="10"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {dot.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
