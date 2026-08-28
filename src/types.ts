export type LineType = 'normal' | 'one-way' | 'double';

export interface Dot {
  id: number;
  x: number; // Percentage 0 - 100
  y: number; // Percentage 0 - 100
  isWarp?: boolean;
  warpTargetId?: number;
  label?: string;
}

export interface LevelLine {
  from: number;
  to: number;
  type?: LineType;
}

export interface RuntimeLine {
  id: string;
  from: number;
  to: number;
  type: LineType;
  totalPasses: number;
  passesRemaining: number;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master' | 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface Level {
  id: number;
  worldId: number;
  levelNumber: number;
  title: string;
  difficulty: Difficulty;
  dots: Dot[];
  lines: LevelLine[];
  hintPath?: number[]; // Sequence of dot IDs that solve the puzzle
  parTime?: number; // Target seconds for 3 stars
}

export interface World {
  id: number;
  name: string;
  subtitle: string;
  badge: string;
  color: string;
  accentColor: string;
  levels: Level[];
}

export interface StrokeStep {
  from: number;
  to: number;
  lineId: string;
}

export interface LevelStats {
  stars: number;
  bestTime: number;
  completedAt: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  colorTheme: 'neon-cyan' | 'amber-glow' | 'emerald' | 'crimson';
}

export interface GameProgress {
  completedLevels: Record<number, LevelStats>;
  currentLevelId: number;
  hintsAvailable: number;
  settings: GameSettings;
  streak: number;
  lastDailyDate?: string;
}
