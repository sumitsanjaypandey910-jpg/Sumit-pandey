import { Dot, LevelLine, LineType } from '../types';

export interface SolverEdge {
  id: string;
  from: number;
  to: number;
  type: LineType;
  remaining: number;
}

/**
 * Finds an Eulerian path / trail for a given graph of dots and lines.
 * Supports:
 *  - Standard undirected edges (type: 'normal')
 *  - Directed edges (type: 'one-way')
 *  - Multi-traversal edges (type: 'double', traverses twice)
 */
export function findEulerianPath(
  dots: Dot[],
  lines: LevelLine[],
  preferredStartDotId?: number
): number[] | null {
  if (!lines || lines.length === 0) return null;

  // Build list of edges with individual traversal capacities
  const edges: SolverEdge[] = [];
  lines.forEach((l, index) => {
    const type = l.type || 'normal';
    const passes = type === 'double' ? 2 : 1;
    edges.push({
      id: `edge_${index}_${l.from}_${l.to}`,
      from: l.from,
      to: l.to,
      type,
      remaining: passes
    });
  });

  const totalMoves = edges.reduce((acc, e) => acc + e.remaining, 0);
  const dotIds = dots.map((d) => d.id);

  // Helper to get degree information
  function getCandidateStartDots(): number[] {
    if (preferredStartDotId !== undefined && dotIds.includes(preferredStartDotId)) {
      return [preferredStartDotId, ...dotIds.filter((id) => id !== preferredStartDotId)];
    }
    return dotIds;
  }

  const startCandidates = getCandidateStartDots();

  // Try depth-first search with backtracking to find an Eulerian trail
  for (const startId of startCandidates) {
    const path: number[] = [startId];
    const workingEdges = edges.map((e) => ({ ...e }));

    function search(currId: number, movesLeft: number): boolean {
      if (movesLeft === 0) return true;

      for (const edge of workingEdges) {
        if (edge.remaining <= 0) continue;

        let nextId: number | null = null;
        if (edge.type === 'one-way') {
          if (edge.from === currId) {
            nextId = edge.to;
          }
        } else {
          // Undirected normal or double
          if (edge.from === currId) {
            nextId = edge.to;
          } else if (edge.to === currId) {
            nextId = edge.from;
          }
        }

        if (nextId !== null) {
          edge.remaining--;
          path.push(nextId);

          if (search(nextId, movesLeft - 1)) {
            return true;
          }

          // Backtrack
          path.pop();
          edge.remaining++;
        }
      }
      return false;
    }

    if (search(startId, totalMoves)) {
      return path;
    }
  }

  return null;
}

/**
 * Finds the remainder of an Eulerian path from the current active game state
 */
export function findRemainingHintPath(
  currentDotId: number,
  remainingEdges: { id: string; from: number; to: number; type: LineType; remaining: number }[]
): number[] | null {
  const totalMoves = remainingEdges.reduce((acc, e) => acc + e.remaining, 0);
  if (totalMoves === 0) return [];

  const path: number[] = [currentDotId];
  const workingEdges = remainingEdges.map((e) => ({ ...e }));

  function search(currId: number, movesLeft: number): boolean {
    if (movesLeft === 0) return true;

    for (const edge of workingEdges) {
      if (edge.remaining <= 0) continue;

      let nextId: number | null = null;
      if (edge.type === 'one-way') {
        if (edge.from === currId) nextId = edge.to;
      } else {
        if (edge.from === currId) nextId = edge.to;
        else if (edge.to === currId) nextId = edge.from;
      }

      if (nextId !== null) {
        edge.remaining--;
        path.push(nextId);
        if (search(nextId, movesLeft - 1)) return true;
        path.pop();
        edge.remaining++;
      }
    }
    return false;
  }

  if (search(currentDotId, totalMoves)) {
    return path;
  }

  return null;
}
