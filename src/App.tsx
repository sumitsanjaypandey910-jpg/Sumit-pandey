/**
 * 1LINE - One Touch Drawing Puzzle Game
 * Eulerian path brain-training puzzle game
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameProgress, Level, LevelStats, RuntimeLine, StrokeStep } from './types';
import { WORLDS_DATA, getAllLevels, getLevelById, getWorldById } from './data/levels';
import { GameBoard } from './components/GameBoard';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { VictoryModal } from './components/VictoryModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { LevelEditorModal } from './components/LevelEditorModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { soundManager } from './utils/audio';
import { findEulerianPath, findRemainingHintPath } from './utils/eulerSolver';
import { getDailyLevel } from './utils/levelGenerator';

const STORAGE_KEY = 'one_line_touch_game_progress_v1';

const defaultProgress: GameProgress = {
  completedLevels: {},
  currentLevelId: 101,
  hintsAvailable: 10,
  settings: {
    soundEnabled: true,
    hapticsEnabled: true,
    colorTheme: 'neon-cyan'
  },
  streak: 1
};

export default function App() {
  // Load saved progress from localStorage
  const [progress, setProgress] = useState<GameProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return defaultProgress;
  });

  // Current active level
  const [currentLevel, setCurrentLevel] = useState<Level>(() => {
    return getLevelById(progress.currentLevelId) || WORLDS_DATA[0].levels[0];
  });

  // Game board runtime state
  const [activeLines, setActiveLines] = useState<RuntimeLine[]>([]);
  const [strokeHistory, setStrokeHistory] = useState<StrokeStep[]>([]);
  const [currentDotId, setCurrentDotId] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [hintStep, setHintStep] = useState<{ from: number; to: number } | null>(null);
  const [isHintActive, setIsHintActive] = useState(false);

  // Modals state
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  // Daily level & streak calculation
  const dailyLevel = useMemo(() => getDailyLevel(), []);
  const todayStr = new Date().toDateString();
  const isDailyCompletedToday = progress.lastDailyDate === todayStr;

  // Persist progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Sync sound settings with audio manager
  useEffect(() => {
    soundManager.setEnabled(progress.settings.soundEnabled);
  }, [progress.settings.soundEnabled]);

  // Initialize runtime lines when current level changes
  const initLevelState = useCallback((level: Level) => {
    const initializedLines: RuntimeLine[] = level.lines.map((l, index) => {
      const type = l.type || 'normal';
      const passes = type === 'double' ? 2 : 1;
      return {
        id: `line_${index}_${l.from}_${l.to}`,
        from: l.from,
        to: l.to,
        type,
        totalPasses: passes,
        passesRemaining: passes
      };
    });

    setActiveLines(initializedLines);
    setStrokeHistory([]);
    setCurrentDotId(null);
    setIsComplete(false);
    setTimeSeconds(0);
    setIsTimerRunning(false);
    setHintsUsedCount(0);
    setHintStep(null);
    setIsHintActive(false);
    setIsVictoryOpen(false);
  }, []);

  useEffect(() => {
    initLevelState(currentLevel);
  }, [currentLevel, initLevelState]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isComplete) {
      interval = setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isComplete]);

  // Handle dot connection (move made)
  const handleDotConnect = useCallback(
    (fromId: number, toId: number, lineId: string) => {
      if (isComplete) return;

      // Start timer on first move
      if (!isTimerRunning) {
        setIsTimerRunning(true);
      }

      // Clear any active hint guide
      if (isHintActive) {
        setHintStep(null);
        setIsHintActive(false);
      }

      // Update lines state
      let updatedRemainingTotal = 0;
      const updatedLines = activeLines.map((line) => {
        if (line.id === lineId) {
          const newPasses = Math.max(0, line.passesRemaining - 1);
          updatedRemainingTotal += newPasses;
          return { ...line, passesRemaining: newPasses };
        }
        updatedRemainingTotal += line.passesRemaining;
        return line;
      });

      setActiveLines(updatedLines);
      const newHistory = [...strokeHistory, { from: fromId, to: toId, lineId }];
      setStrokeHistory(newHistory);
      setCurrentDotId(toId);

      // Play audio chime for this step in stroke with total steps progression
      const totalSteps = activeLines.reduce((acc, l) => acc + l.totalPasses, 0);
      soundManager.playDotConnect(newHistory.length, totalSteps);

      // Check win condition (all lines have 0 passes remaining)
      if (updatedRemainingTotal === 0) {
        setIsComplete(true);
        setIsTimerRunning(false);
        soundManager.playLevelComplete();

        // Calculate stars (forgiving threshold)
        const parTime = currentLevel.parTime || 25;
        let earnedStars = 3;
        if (hintsUsedCount > 1 || timeSeconds > parTime * 2.0) {
          earnedStars = 2;
        }
        if (hintsUsedCount > 3 || timeSeconds > parTime * 3.5) {
          earnedStars = 1;
        }

        // Save completed level stats
        const currentStats = progress.completedLevels[currentLevel.id];
        const bestStars = Math.max(earnedStars, currentStats?.stars || 0);
        const bestTime = currentStats?.bestTime ? Math.min(timeSeconds, currentStats.bestTime) : timeSeconds;

        const isNewCompletion = !currentStats;

        setProgress((prev) => {
          const isDaily = currentLevel.id === dailyLevel.id;
          return {
            ...prev,
            completedLevels: {
              ...prev.completedLevels,
              [currentLevel.id]: {
                stars: bestStars,
                bestTime,
                completedAt: new Date().toISOString()
              }
            },
            // Reward hint tokens generously
            hintsAvailable: prev.hintsAvailable + (isDaily ? 5 : isNewCompletion ? 2 : 1),
            streak: isDaily && !isDailyCompletedToday ? prev.streak + 1 : prev.streak,
            lastDailyDate: isDaily ? todayStr : prev.lastDailyDate
          };
        });

        // Open victory modal after brief pulse
        setTimeout(() => {
          setIsVictoryOpen(true);
        }, 500);
      }
    },
    [
      activeLines,
      currentLevel.id,
      currentLevel.parTime,
      dailyLevel.id,
      hintsUsedCount,
      isComplete,
      isDailyCompletedToday,
      isHintActive,
      isTimerRunning,
      progress.completedLevels,
      strokeHistory,
      timeSeconds,
      todayStr
    ]
  );

  // Handle first dot select
  const handleStartDotSelect = useCallback((dotId: number) => {
    setCurrentDotId(dotId);
    setIsTimerRunning(true);
  }, []);

  // Undo move
  const handleUndo = useCallback(() => {
    if (strokeHistory.length === 0 || isComplete) return;

    const lastStep = strokeHistory[strokeHistory.length - 1];
    const newHistory = strokeHistory.slice(0, strokeHistory.length - 1);

    // Restore line pass
    const updatedLines = activeLines.map((line) => {
      if (line.id === lastStep.lineId) {
        return {
          ...line,
          passesRemaining: Math.min(line.totalPasses, line.passesRemaining + 1)
        };
      }
      return line;
    });

    setActiveLines(updatedLines);
    setStrokeHistory(newHistory);
    setCurrentDotId(lastStep.from);
    soundManager.playUndo();
  }, [activeLines, isComplete, strokeHistory]);

  // Restart puzzle
  const handleReset = useCallback(() => {
    if (strokeHistory.length === 0 && currentDotId === null) return;
    initLevelState(currentLevel);
    soundManager.playReset();
  }, [currentDotId, currentLevel, initLevelState, strokeHistory.length]);

  // Use hint
  const handleUseHint = useCallback(() => {
    if (isComplete) return;

    if (progress.hintsAvailable <= 0) {
      // Free recharge if out of hints
      setProgress((prev) => ({ ...prev, hintsAvailable: prev.hintsAvailable + 4 }));
    } else {
      setProgress((prev) => ({ ...prev, hintsAvailable: Math.max(0, prev.hintsAvailable - 1) }));
    }

    setHintsUsedCount((prev) => prev + 1);
    soundManager.playHint();

    // Compute hint path dynamically
    let nextStep: { from: number; to: number } | null = null;

    if (currentDotId !== null) {
      // Find remainder from current dot
      const remainingEdges = activeLines
        .filter((l) => l.passesRemaining > 0)
        .map((l) => ({
          id: l.id,
          from: l.from,
          to: l.to,
          type: l.type,
          remaining: l.passesRemaining
        }));

      const path = findRemainingHintPath(currentDotId, remainingEdges);
      if (path && path.length >= 2) {
        nextStep = { from: path[0], to: path[1] };
      }
    }

    // Fallback: solve from scratch if stuck or at start
    if (!nextStep) {
      const fullPath = findEulerianPath(currentLevel.dots, currentLevel.lines, currentDotId || undefined);
      if (fullPath && fullPath.length >= 2) {
        nextStep = { from: fullPath[0], to: fullPath[1] };
        if (currentDotId === null) {
          setCurrentDotId(fullPath[0]);
        }
      }
    }

    if (nextStep) {
      setHintStep(nextStep);
      setIsHintActive(true);
      // Auto clear hint indicator after 4 seconds
      setTimeout(() => {
        setHintStep(null);
        setIsHintActive(false);
      }, 4000);
    }
  }, [activeLines, currentDotId, currentLevel, isComplete]);

  // Next level navigation
  const handleNextLevel = useCallback(() => {
    const allLevels = getAllLevels();
    const currentIndex = allLevels.findIndex((l) => l.id === currentLevel.id);
    if (currentIndex >= 0 && currentIndex < allLevels.length - 1) {
      const nextLvl = allLevels[currentIndex + 1];
      setCurrentLevel(nextLvl);
      setProgress((prev) => ({ ...prev, currentLevelId: nextLvl.id }));
    } else {
      // Loop back to start or world select
      setIsLevelSelectOpen(true);
    }
    setIsVictoryOpen(false);
  }, [currentLevel.id]);

  // Toggle sound setting
  const handleToggleSound = () => {
    const nextState = !progress.settings.soundEnabled;
    setProgress((prev) => ({
      ...prev,
      settings: { ...prev.settings, soundEnabled: nextState }
    }));
    soundManager.setEnabled(nextState);
    if (nextState) soundManager.playClick();
  };

  const currentWorld = getWorldById(currentLevel.worldId);

  // Line counts
  const totalLinesCount = useMemo(() => {
    return activeLines.reduce((acc, l) => acc + l.totalPasses, 0);
  }, [activeLines]);

  const completedLinesCount = useMemo(() => {
    return activeLines.reduce((acc, l) => acc + (l.totalPasses - l.passesRemaining), 0);
  }, [activeLines]);

  // Calculated stars for victory modal
  const victoryStars = useMemo(() => {
    if (hintsUsedCount === 0 && timeSeconds <= (currentLevel.parTime || 20) * 1.5) return 3;
    if (hintsUsedCount <= 1) return 2;
    return 1;
  }, [currentLevel.parTime, hintsUsedCount, timeSeconds]);

  // Calculate total stars across all worlds
  const totalStars = useMemo(() => {
    return (Object.values(progress.completedLevels || {}) as LevelStats[]).reduce(
      (acc: number, l: LevelStats) => acc + (l?.stars || 0),
      0
    );
  }, [progress.completedLevels]);

  // Visited node count
  const visitedNodesCount = useMemo(() => {
    const visitedSet = new Set<number>();
    strokeHistory.forEach((s) => {
      visitedSet.add(s.from);
      visitedSet.add(s.to);
    });
    if (currentDotId !== null) visitedSet.add(currentDotId);
    return visitedSet.size;
  }, [currentDotId, strokeHistory]);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* Sleek Ambient Lighting Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Top Header */}
      <Header
        level={currentLevel}
        world={currentWorld}
        completedLinesCount={completedLinesCount}
        totalLinesCount={totalLinesCount}
        soundEnabled={progress.settings.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenLevelSelect={() => {
          soundManager.playModalOpen();
          setIsLevelSelectOpen(true);
        }}
        onOpenHowToPlay={() => {
          soundManager.playModalOpen();
          setIsHowToPlayOpen(true);
        }}
        onOpenDaily={() => {
          soundManager.playModalOpen();
          setIsDailyOpen(true);
        }}
        onOpenEditor={() => {
          soundManager.playModalOpen();
          setIsEditorOpen(true);
        }}
        streak={progress.streak}
        totalStars={totalStars}
      />

      {/* Main Interactive Game Board View */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 z-10">
        <GameBoard
          level={currentLevel}
          strokeHistory={strokeHistory}
          currentDotId={currentDotId}
          activeLines={activeLines}
          onDotConnect={handleDotConnect}
          onStartDotSelect={handleStartDotSelect}
          hintStep={hintStep}
          isComplete={isComplete}
          accentColor={currentWorld?.accentColor || '#22d3ee'}
        />
      </main>

      {/* Bottom Controls Bar */}
      <Controls
        canUndo={strokeHistory.length > 0}
        canReset={strokeHistory.length > 0 || currentDotId !== null}
        hintsAvailable={progress.hintsAvailable}
        isHintActive={isHintActive}
        onUndo={handleUndo}
        onReset={handleReset}
        onUseHint={handleUseHint}
        isComplete={isComplete}
        onNextLevel={handleNextLevel}
        accentColor={currentWorld?.accentColor || '#22d3ee'}
        difficulty={currentLevel.difficulty}
        visitedNodesCount={visitedNodesCount}
        totalNodesCount={currentLevel.dots.length}
        movesCount={strokeHistory.length}
      />

      {/* Modals */}
      <VictoryModal
        isOpen={isVictoryOpen}
        level={currentLevel}
        stars={victoryStars}
        timeSeconds={timeSeconds}
        onNextLevel={handleNextLevel}
        onReplay={() => {
          initLevelState(currentLevel);
          setIsVictoryOpen(false);
        }}
        onLevelSelect={() => {
          setIsVictoryOpen(false);
          setIsLevelSelectOpen(true);
        }}
      />

      <LevelSelectModal
        isOpen={isLevelSelectOpen}
        onClose={() => setIsLevelSelectOpen(false)}
        progress={progress}
        onSelectLevel={(lvl) => {
          setCurrentLevel(lvl);
          setProgress((prev) => ({ ...prev, currentLevelId: lvl.id }));
        }}
        currentLevelId={currentLevel.id}
      />

      <DailyChallengeModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
        dailyLevel={dailyLevel}
        onPlayDaily={(lvl) => {
          setCurrentLevel(lvl);
        }}
        streak={progress.streak}
        isDailyCompletedToday={isDailyCompletedToday}
      />

      <LevelEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onPlaytestLevel={(lvl) => {
          setCurrentLevel(lvl);
        }}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
    </div>
  );
}
