import { Dot, Level, LevelLine } from '../types';
import { findEulerianPath } from './eulerSolver';

/**
 * Generates an Eulerian puzzle by creating a random Eulerian walk on a node lattice.
 */
export function generateRandomLevel(difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' = 'Medium', seed?: number): Level {
  const nodeCount = difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 7 : difficulty === 'Hard' ? 9 : 11;
  const maxEdges = difficulty === 'Easy' ? 7 : difficulty === 'Medium' ? 12 : difficulty === 'Hard' ? 16 : 20;

  // Generate pleasant node coordinates
  const dots: Dot[] = [];
  const centerX = 50;
  const centerY = 50;

  if (nodeCount <= 6) {
    // Polygon + center
    const outerCount = nodeCount - 1;
    for (let i = 0; i < outerCount; i++) {
      const angle = (i * 2 * Math.PI) / outerCount - Math.PI / 2;
      const radius = 35;
      dots.push({
        id: i + 1,
        x: Math.round(centerX + Math.cos(angle) * radius),
        y: Math.round(centerY + Math.sin(angle) * radius)
      });
    }
    dots.push({ id: nodeCount, x: centerX, y: centerY });
  } else {
    // 3x3 or grid-like distribution with jitter
    const cols = 3;
    const rows = Math.ceil(nodeCount / cols);
    let id = 1;
    for (let r = 0; r < rows && id <= nodeCount; r++) {
      for (let c = 0; c < cols && id <= nodeCount; c++) {
        const x = 20 + c * 30 + (Math.sin(id * 1.7) * 5);
        const y = 20 + r * 28 + (Math.cos(id * 2.3) * 5);
        dots.push({ id, x: Math.round(x), y: Math.round(y) });
        id++;
      }
    }
  }

  // Generate Eulerian path by walking along nodes
  const linesMap = new Map<string, { from: number; to: number; count: number }>();
  let current = 1;
  const walkLength = maxEdges;

  for (let step = 0; step < walkLength; step++) {
    // Pick another node not equal to current
    const availableNext = dots.filter((d) => d.id !== current);
    const nextDot = availableNext[Math.floor(Math.random() * availableNext.length)];
    const u = Math.min(current, nextDot.id);
    const v = Math.max(current, nextDot.id);
    const key = `${u}-${v}`;

    const existing = linesMap.get(key);
    if (!existing) {
      linesMap.set(key, { from: u, to: v, count: 1 });
    } else if (existing.count < 2 && difficulty !== 'Easy') {
      existing.count++;
    }

    current = nextDot.id;
  }

  const rawLines: LevelLine[] = [];
  linesMap.forEach(({ from, to, count }) => {
    if (count === 2) {
      rawLines.push({ from, to, type: 'double' });
    } else {
      // Small chance of one-way line in Hard/Expert
      const isOneWay = (difficulty === 'Hard' || difficulty === 'Expert') && Math.random() < 0.25;
      rawLines.push({
        from,
        to,
        type: isOneWay ? 'one-way' : 'normal'
      });
    }
  });

  // Ensure graph is connected and has a valid Eulerian path
  const solved = findEulerianPath(dots, rawLines);
  if (!solved || rawLines.length < 4) {
    // Fallback guaranteed template if random walk didn't produce Eulerian path
    return {
      id: Date.now(),
      worldId: 99,
      levelNumber: 1,
      title: `${difficulty} Puzzle`,
      difficulty,
      parTime: 20,
      dots: [
        { id: 1, x: 50, y: 15 },
        { id: 2, x: 20, y: 50 },
        { id: 3, x: 80, y: 50 },
        { id: 4, x: 35, y: 85 },
        { id: 5, x: 65, y: 85 }
      ],
      lines: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 5 },
        { from: 4, to: 5 },
        { from: 2, to: 3 },
        { from: 2, to: 5 },
        { from: 3, to: 4 }
      ]
    };
  }

  return {
    id: seed || Date.now(),
    worldId: 99,
    levelNumber: 1,
    title: `${difficulty} Challenge`,
    difficulty,
    parTime: Math.max(15, rawLines.length * 3),
    dots,
    lines: rawLines
  };
}

/**
 * Generate daily challenge puzzle from today's date
 */
export function getDailyLevel(): Level {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed * 31 + dateStr.charCodeAt(i)) & 0xffffff;
  }

  const generated = generateRandomLevel('Hard', seed);
  return {
    ...generated,
    id: 9999,
    title: `Daily Challenge - ${today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`,
    difficulty: 'Hard'
  };
}
