import { World, Level } from '../types';

export const WORLDS_DATA: World[] = [
  {
    id: 1,
    name: 'Dawn',
    subtitle: 'Geometric Basics',
    badge: 'Novice',
    color: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    levels: [
      // 1. Triangle
      {
        id: 101,
        worldId: 1,
        levelNumber: 1,
        title: 'Triangle Peak',
        difficulty: 'Beginner',
        parTime: 8,
        dots: [
          { id: 1, x: 50, y: 20 },
          { id: 2, x: 20, y: 80 },
          { id: 3, x: 80, y: 80 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 1 }
        ]
      },
      // 2. Square with cross (Envelope without bottom)
      {
        id: 102,
        worldId: 1,
        levelNumber: 2,
        title: 'Hourglass Box',
        difficulty: 'Beginner',
        parTime: 12,
        dots: [
          { id: 1, x: 25, y: 25 },
          { id: 2, x: 75, y: 25 },
          { id: 3, x: 25, y: 75 },
          { id: 4, x: 75, y: 75 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 4 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 1, to: 3 }
        ]
      },
      // 3. Classic House (House of Santa Claus - Eulerian classic)
      {
        id: 103,
        worldId: 1,
        levelNumber: 3,
        title: 'Classic House',
        difficulty: 'Beginner',
        parTime: 15,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 20, y: 45 },
          { id: 3, x: 80, y: 45 },
          { id: 4, x: 20, y: 85 },
          { id: 5, x: 80, y: 85 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 5 },
          { from: 2, to: 5 },
          { from: 3, to: 4 }
        ]
      },
      // 4. Diamond Star
      {
        id: 104,
        worldId: 1,
        levelNumber: 4,
        title: 'Diamond Prism',
        difficulty: 'Beginner',
        parTime: 15,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 20, y: 50 },
          { id: 3, x: 80, y: 50 },
          { id: 4, x: 50, y: 85 },
          { id: 5, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 4 },
          { from: 1, to: 5 },
          { from: 4, to: 5 }
        ]
      },
      // 5. Five Point Star
      {
        id: 105,
        worldId: 1,
        levelNumber: 5,
        title: 'Five-Point Star',
        difficulty: 'Beginner',
        parTime: 18,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 85, y: 40 },
          { id: 3, x: 72, y: 85 },
          { id: 4, x: 28, y: 85 },
          { id: 5, x: 15, y: 40 }
        ],
        lines: [
          { from: 1, to: 3 },
          { from: 3, to: 5 },
          { from: 5, to: 2 },
          { from: 2, to: 4 },
          { from: 4, to: 1 }
        ]
      },
      // 6. Double Triangle / Bowtie
      {
        id: 106,
        worldId: 1,
        levelNumber: 6,
        title: 'Bowtie Prism',
        difficulty: 'Beginner',
        parTime: 18,
        dots: [
          { id: 1, x: 20, y: 25 },
          { id: 2, x: 20, y: 75 },
          { id: 3, x: 50, y: 50 },
          { id: 4, x: 80, y: 25 },
          { id: 5, x: 80, y: 75 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 1 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 3 },
          { from: 1, to: 4 },
          { from: 2, to: 5 }
        ]
      },
      // 7. Envelope Plus
      {
        id: 107,
        worldId: 1,
        levelNumber: 7,
        title: 'The Letter Box',
        difficulty: 'Intermediate',
        parTime: 20,
        dots: [
          { id: 1, x: 50, y: 18 },
          { id: 2, x: 22, y: 45 },
          { id: 3, x: 78, y: 45 },
          { id: 4, x: 22, y: 82 },
          { id: 5, x: 78, y: 82 },
          { id: 6, x: 50, y: 63 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 2, to: 6 },
          { from: 3, to: 6 },
          { from: 2, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 6 },
          { from: 4, to: 5 }
        ]
      },
      // 8. Hexagon Star
      {
        id: 108,
        worldId: 1,
        levelNumber: 8,
        title: 'Hexa Crest',
        difficulty: 'Intermediate',
        parTime: 22,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 80, y: 32 },
          { id: 3, x: 80, y: 68 },
          { id: 4, x: 50, y: 85 },
          { id: 5, x: 20, y: 68 },
          { id: 6, x: 20, y: 32 },
          { id: 7, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 6 },
          { from: 6, to: 1 },
          { from: 1, to: 7 },
          { from: 3, to: 7 },
          { from: 5, to: 7 }
        ]
      },
      // 9. Kite Crown
      {
        id: 109,
        worldId: 1,
        levelNumber: 9,
        title: 'Royal Crown',
        difficulty: 'Intermediate',
        parTime: 22,
        dots: [
          { id: 1, x: 20, y: 30 },
          { id: 2, x: 50, y: 15 },
          { id: 3, x: 80, y: 30 },
          { id: 4, x: 35, y: 55 },
          { id: 5, x: 65, y: 55 },
          { id: 6, x: 20, y: 80 },
          { id: 7, x: 80, y: 80 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 1, to: 4 },
          { from: 2, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 5 },
          { from: 4, to: 5 },
          { from: 1, to: 6 },
          { from: 4, to: 6 },
          { from: 5, to: 7 },
          { from: 3, to: 7 },
          { from: 6, to: 7 }
        ]
      },
      // 10. Fish Origami
      {
        id: 110,
        worldId: 1,
        levelNumber: 10,
        title: 'Aqua Fish',
        difficulty: 'Intermediate',
        parTime: 25,
        dots: [
          { id: 1, x: 20, y: 50 },
          { id: 2, x: 50, y: 25 },
          { id: 3, x: 50, y: 75 },
          { id: 4, x: 75, y: 50 },
          { id: 5, x: 90, y: 30 },
          { id: 6, x: 90, y: 70 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 4 },
          { from: 4, to: 3 },
          { from: 3, to: 1 },
          { from: 2, to: 3 },
          { from: 4, to: 5 },
          { from: 5, to: 6 },
          { from: 6, to: 4 }
        ]
      },
      // 11. Castle Turret
      {
        id: 111,
        worldId: 1,
        levelNumber: 11,
        title: 'Castle Spire',
        difficulty: 'Intermediate',
        parTime: 25,
        dots: [
          { id: 1, x: 30, y: 20 },
          { id: 2, x: 50, y: 10 },
          { id: 3, x: 70, y: 20 },
          { id: 4, x: 30, y: 50 },
          { id: 5, x: 70, y: 50 },
          { id: 6, x: 20, y: 85 },
          { id: 7, x: 80, y: 85 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 1, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 5 },
          { from: 1, to: 5 },
          { from: 3, to: 4 },
          { from: 4, to: 6 },
          { from: 5, to: 7 },
          { from: 6, to: 7 },
          { from: 4, to: 7 }
        ]
      },
      // 12. Windmill
      {
        id: 112,
        worldId: 1,
        levelNumber: 12,
        title: 'Windmill Core',
        difficulty: 'Intermediate',
        parTime: 30,
        dots: [
          { id: 1, x: 50, y: 50 },
          { id: 2, x: 50, y: 15 },
          { id: 3, x: 75, y: 25 },
          { id: 4, x: 85, y: 50 },
          { id: 5, x: 75, y: 75 },
          { id: 6, x: 50, y: 85 },
          { id: 7, x: 25, y: 75 },
          { id: 8, x: 15, y: 50 },
          { id: 9, x: 25, y: 25 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 1 },
          { from: 1, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 1 },
          { from: 1, to: 6 },
          { from: 6, to: 7 },
          { from: 7, to: 1 },
          { from: 1, to: 8 },
          { from: 8, to: 9 },
          { from: 9, to: 1 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Spark',
    subtitle: 'Directional Arrows',
    badge: 'One-Way',
    color: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    levels: [
      // 1. One-way triangle introduction
      {
        id: 201,
        worldId: 2,
        levelNumber: 1,
        title: 'Arrow Vector',
        difficulty: 'Beginner',
        parTime: 10,
        dots: [
          { id: 1, x: 50, y: 20 },
          { id: 2, x: 20, y: 80 },
          { id: 3, x: 80, y: 80 }
        ],
        lines: [
          { from: 1, to: 2, type: 'one-way' },
          { from: 2, to: 3 },
          { from: 3, to: 1 }
        ]
      },
      // 2. Guided Diamond
      {
        id: 202,
        worldId: 2,
        levelNumber: 2,
        title: 'Guided Diamond',
        difficulty: 'Beginner',
        parTime: 12,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 20, y: 50 },
          { id: 3, x: 80, y: 50 },
          { id: 4, x: 50, y: 85 }
        ],
        lines: [
          { from: 1, to: 2, type: 'one-way' },
          { from: 2, to: 4, type: 'one-way' },
          { from: 4, to: 3 },
          { from: 3, to: 1 },
          { from: 2, to: 3 }
        ]
      },
      // 3. Arrow Box Cross
      {
        id: 203,
        worldId: 2,
        levelNumber: 3,
        title: 'Vortex Cross',
        difficulty: 'Intermediate',
        parTime: 16,
        dots: [
          { id: 1, x: 25, y: 25 },
          { id: 2, x: 75, y: 25 },
          { id: 3, x: 25, y: 75 },
          { id: 4, x: 75, y: 75 },
          { id: 5, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 4 },
          { from: 4, to: 3 },
          { from: 3, to: 1 },
          { from: 1, to: 5, type: 'one-way' },
          { from: 5, to: 4, type: 'one-way' },
          { from: 2, to: 5 },
          { from: 5, to: 3 }
        ]
      },
      // 4. Directional Pentagram
      {
        id: 204,
        worldId: 2,
        levelNumber: 4,
        title: 'Guided Pentagram',
        difficulty: 'Intermediate',
        parTime: 20,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 85, y: 40 },
          { id: 3, x: 72, y: 85 },
          { id: 4, x: 28, y: 85 },
          { id: 5, x: 15, y: 40 }
        ],
        lines: [
          { from: 1, to: 3, type: 'one-way' },
          { from: 3, to: 5 },
          { from: 5, to: 2, type: 'one-way' },
          { from: 2, to: 4 },
          { from: 4, to: 1 }
        ]
      },
      // 5. Dual Triangles Loop
      {
        id: 205,
        worldId: 2,
        levelNumber: 5,
        title: 'Turbine Pulse',
        difficulty: 'Intermediate',
        parTime: 22,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 20, y: 50 },
          { id: 3, x: 80, y: 50 },
          { id: 4, x: 50, y: 85 },
          { id: 5, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 5, type: 'one-way' },
          { from: 5, to: 1 },
          { from: 5, to: 3, type: 'one-way' },
          { from: 3, to: 4 },
          { from: 4, to: 5 }
        ]
      },
      // 6. Arrow House
      {
        id: 206,
        worldId: 2,
        levelNumber: 6,
        title: 'One-Way Citadel',
        difficulty: 'Advanced',
        parTime: 25,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 20, y: 45 },
          { id: 3, x: 80, y: 45 },
          { id: 4, x: 20, y: 85 },
          { id: 5, x: 80, y: 85 }
        ],
        lines: [
          { from: 1, to: 2, type: 'one-way' },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 5, type: 'one-way' },
          { from: 4, to: 5 },
          { from: 2, to: 5 },
          { from: 3, to: 4 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Horizon',
    subtitle: 'Double Stroke Lines',
    badge: '2x Double',
    color: 'from-purple-500 to-indigo-600',
    accentColor: '#a855f7',
    levels: [
      // 1. Double Line Triangle
      {
        id: 301,
        worldId: 3,
        levelNumber: 1,
        title: 'Double Peak',
        difficulty: 'Beginner',
        parTime: 12,
        dots: [
          { id: 1, x: 50, y: 20 },
          { id: 2, x: 20, y: 80 },
          { id: 3, x: 80, y: 80 }
        ],
        lines: [
          { from: 1, to: 2, type: 'double' },
          { from: 2, to: 3 },
          { from: 3, to: 1, type: 'double' }
        ]
      },
      // 2. Double Diamond
      {
        id: 302,
        worldId: 3,
        levelNumber: 2,
        title: 'Reinforced Core',
        difficulty: 'Intermediate',
        parTime: 16,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 20, y: 50 },
          { id: 3, x: 80, y: 50 },
          { id: 4, x: 50, y: 85 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 4, type: 'double' },
          { from: 4, to: 3 },
          { from: 3, to: 1 },
          { from: 2, to: 3, type: 'double' }
        ]
      },
      // 3. Double Cross Box
      {
        id: 303,
        worldId: 3,
        levelNumber: 3,
        title: 'Double Cross',
        difficulty: 'Advanced',
        parTime: 22,
        dots: [
          { id: 1, x: 25, y: 25 },
          { id: 2, x: 75, y: 25 },
          { id: 3, x: 25, y: 75 },
          { id: 4, x: 75, y: 75 },
          { id: 5, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 4 },
          { from: 4, to: 3 },
          { from: 3, to: 1 },
          { from: 1, to: 5, type: 'double' },
          { from: 2, to: 5, type: 'double' },
          { from: 3, to: 5 },
          { from: 4, to: 5 }
        ]
      },
      // 4. Double Hexagon
      {
        id: 304,
        worldId: 3,
        levelNumber: 4,
        title: 'Double Lattice',
        difficulty: 'Advanced',
        parTime: 25,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 85, y: 35 },
          { id: 3, x: 85, y: 65 },
          { id: 4, x: 50, y: 85 },
          { id: 5, x: 15, y: 65 },
          { id: 6, x: 15, y: 35 }
        ],
        lines: [
          { from: 1, to: 2, type: 'double' },
          { from: 2, to: 3 },
          { from: 3, to: 4, type: 'double' },
          { from: 4, to: 5 },
          { from: 5, to: 6, type: 'double' },
          { from: 6, to: 1 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Mastermind',
    subtitle: 'Hybrid Puzzles & Mazes',
    badge: 'Expert',
    color: 'from-emerald-500 to-teal-700',
    accentColor: '#10b981',
    levels: [
      // 1. Star of David Hybrid
      {
        id: 401,
        worldId: 4,
        levelNumber: 1,
        title: 'Star Matrix',
        difficulty: 'Master',
        parTime: 28,
        dots: [
          { id: 1, x: 50, y: 10 },
          { id: 2, x: 85, y: 30 },
          { id: 3, x: 85, y: 70 },
          { id: 4, x: 50, y: 90 },
          { id: 5, x: 15, y: 70 },
          { id: 6, x: 15, y: 30 },
          { id: 7, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 3 },
          { from: 3, to: 5 },
          { from: 5, to: 1 },
          { from: 2, to: 4 },
          { from: 4, to: 6 },
          { from: 6, to: 2 },
          { from: 1, to: 7, type: 'one-way' },
          { from: 7, to: 4, type: 'one-way' },
          { from: 2, to: 7, type: 'double' }
        ]
      },
      // 2. Quantum Web
      {
        id: 402,
        worldId: 4,
        levelNumber: 2,
        title: 'Quantum Web',
        difficulty: 'Master',
        parTime: 32,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 25, y: 35 },
          { id: 3, x: 75, y: 35 },
          { id: 4, x: 25, y: 65 },
          { id: 5, x: 75, y: 65 },
          { id: 6, x: 50, y: 85 },
          { id: 7, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4, type: 'double' },
          { from: 3, to: 5, type: 'double' },
          { from: 4, to: 6 },
          { from: 5, to: 6 },
          { from: 2, to: 7, type: 'one-way' },
          { from: 7, to: 5, type: 'one-way' },
          { from: 3, to: 7 },
          { from: 7, to: 4 }
        ]
      }
    ]
  }
];

export function getAllLevels(): Level[] {
  return WORLDS_DATA.flatMap((w) => w.levels);
}

export function getLevelById(id: number): Level | undefined {
  return getAllLevels().find((l) => l.id === id);
}

export function getWorldById(worldId: number): World | undefined {
  return WORLDS_DATA.find((w) => w.id === worldId);
}
