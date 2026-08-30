import { World, Level } from '../types';

export const WORLDS_DATA: World[] = [
  // -------------------------------------------------------------
  // WORLD 1: FLORA & NATURE (Real-Life Floral & Botanical Shapes)
  // -------------------------------------------------------------
  {
    id: 1,
    name: 'Flora',
    subtitle: 'Floral & Botanical Shapes',
    badge: 'Nature',
    color: 'from-rose-500 to-pink-600',
    accentColor: '#f43f5e',
    levels: [
      // 1. Spring Blossom (4-petal floral rosette)
      {
        id: 101,
        worldId: 1,
        levelNumber: 1,
        title: 'Spring Blossom',
        difficulty: 'Beginner',
        parTime: 20,
        dots: [
          { id: 1, x: 50, y: 50 },
          { id: 2, x: 50, y: 15 },
          { id: 3, x: 85, y: 50 },
          { id: 4, x: 50, y: 85 },
          { id: 5, x: 15, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 1 },
          { from: 1, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 1 },
          { from: 1, to: 3 },
          { from: 1, to: 5 }
        ]
      },
      // 2. Garden Tulip (Stem, Leaf, and 3-pointed Petal Cup)
      {
        id: 102,
        worldId: 1,
        levelNumber: 2,
        title: 'Garden Tulip',
        difficulty: 'Beginner',
        parTime: 22,
        dots: [
          { id: 1, x: 25, y: 20 },
          { id: 2, x: 50, y: 35 },
          { id: 3, x: 75, y: 20 },
          { id: 4, x: 50, y: 55 },
          { id: 5, x: 50, y: 88 },
          { id: 6, x: 25, y: 70 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 4, to: 1 },
          { from: 2, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 6 },
          { from: 6, to: 4 }
        ]
      },
      // 3. Lotus Bloom (Symmetric Water Lily)
      {
        id: 103,
        worldId: 1,
        levelNumber: 3,
        title: 'Lotus Bloom',
        difficulty: 'Beginner',
        parTime: 25,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 25, y: 35 },
          { id: 3, x: 75, y: 35 },
          { id: 4, x: 20, y: 65 },
          { id: 5, x: 80, y: 65 },
          { id: 6, x: 50, y: 85 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 4 },
          { from: 4, to: 6 },
          { from: 6, to: 5 },
          { from: 5, to: 3 },
          { from: 3, to: 1 },
          { from: 2, to: 3 },
          { from: 4, to: 5 },
          { from: 2, to: 5 },
          { from: 3, to: 4 }
        ]
      },
      // 4. Monarch Butterfly (Symmetric Wing Lattice)
      {
        id: 104,
        worldId: 1,
        levelNumber: 4,
        title: 'Monarch Butterfly',
        difficulty: 'Intermediate',
        parTime: 28,
        dots: [
          { id: 1, x: 50, y: 18 },
          { id: 2, x: 18, y: 30 },
          { id: 3, x: 82, y: 30 },
          { id: 4, x: 50, y: 50 },
          { id: 5, x: 22, y: 75 },
          { id: 6, x: 78, y: 75 },
          { id: 7, x: 50, y: 85 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 4 },
          { from: 3, to: 6 },
          { from: 4, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 6 },
          { from: 5, to: 7 },
          { from: 6, to: 7 }
        ]
      },
      // 5. Golden Sunflower (Central Seed Core with Radial Rays)
      {
        id: 105,
        worldId: 1,
        levelNumber: 5,
        title: 'Golden Sunflower',
        difficulty: 'Intermediate',
        parTime: 30,
        dots: [
          { id: 1, x: 50, y: 12 },
          { id: 2, x: 85, y: 32 },
          { id: 3, x: 85, y: 68 },
          { id: 4, x: 50, y: 88 },
          { id: 5, x: 15, y: 68 },
          { id: 6, x: 15, y: 32 },
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
          { from: 4, to: 7 }
        ]
      },
      // 6. Autumn Maple (Branching Veins and Leaf Lobes)
      {
        id: 106,
        worldId: 1,
        levelNumber: 6,
        title: 'Autumn Maple',
        difficulty: 'Intermediate',
        parTime: 32,
        dots: [
          { id: 1, x: 50, y: 12 },
          { id: 2, x: 25, y: 32 },
          { id: 3, x: 75, y: 32 },
          { id: 4, x: 50, y: 52 },
          { id: 5, x: 20, y: 72 },
          { id: 6, x: 80, y: 72 },
          { id: 7, x: 50, y: 92 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 6 },
          { from: 5, to: 4 },
          { from: 6, to: 4 },
          { from: 5, to: 7 },
          { from: 6, to: 7 },
          { from: 4, to: 7 },
          { from: 2, to: 3 },
          { from: 5, to: 6 }
        ]
      },
      // 7. Wild Orchid (Exotic Botanical Flower with Wing Petals)
      {
        id: 107,
        worldId: 1,
        levelNumber: 7,
        title: 'Wild Orchid',
        difficulty: 'Advanced',
        parTime: 35,
        dots: [
          { id: 1, x: 50, y: 45 },
          { id: 2, x: 50, y: 15 },
          { id: 3, x: 18, y: 35 },
          { id: 4, x: 82, y: 35 },
          { id: 5, x: 25, y: 70 },
          { id: 6, x: 75, y: 70 },
          { id: 7, x: 50, y: 88 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 1, to: 5 },
          { from: 1, to: 6 },
          { from: 1, to: 7 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 6 },
          { from: 5, to: 7 },
          { from: 6, to: 7 }
        ]
      },
      // 8. Mystic Rose (Multi-Layered Rosette Petal Matrix)
      {
        id: 108,
        worldId: 1,
        levelNumber: 8,
        title: 'Mystic Rose',
        difficulty: 'Master',
        parTime: 38,
        dots: [
          { id: 1, x: 50, y: 50 },
          { id: 2, x: 50, y: 15 },
          { id: 3, x: 80, y: 30 },
          { id: 4, x: 80, y: 70 },
          { id: 5, x: 50, y: 85 },
          { id: 6, x: 20, y: 70 },
          { id: 7, x: 20, y: 30 }
        ],
        lines: [
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 6 },
          { from: 6, to: 7 },
          { from: 7, to: 2 },
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 1, to: 5 },
          { from: 1, to: 6 },
          { from: 1, to: 7 },
          { from: 7, to: 3 },
          { from: 6, to: 4 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // WORLD 2: HORIZON (Nautical, Maritime & Architecture - One-Way)
  // -------------------------------------------------------------
  {
    id: 2,
    name: 'Horizon',
    subtitle: 'Nautical & Architecture',
    badge: 'One-Way',
    color: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    levels: [
      // 1. Wind Compass
      {
        id: 201,
        worldId: 2,
        levelNumber: 1,
        title: 'Wind Compass',
        difficulty: 'Beginner',
        parTime: 18,
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
      // 2. Nautical Sailboat
      {
        id: 202,
        worldId: 2,
        levelNumber: 2,
        title: 'Nautical Sailboat',
        difficulty: 'Beginner',
        parTime: 25,
        dots: [
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 25, y: 50 },
          { id: 3, x: 50, y: 50 },
          { id: 4, x: 15, y: 75 },
          { id: 5, x: 30, y: 90 },
          { id: 6, x: 70, y: 90 },
          { id: 7, x: 85, y: 75 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 1, to: 3 },
          { from: 4, to: 3 },
          { from: 3, to: 7 },
          { from: 4, to: 5 },
          { from: 5, to: 6 },
          { from: 6, to: 7 },
          { from: 4, to: 6 },
          { from: 3, to: 5 },
          { from: 3, to: 6 }
        ]
      },
      // 3. Breeze Kite
      {
        id: 203,
        worldId: 2,
        levelNumber: 3,
        title: 'Breeze Kite',
        difficulty: 'Beginner',
        parTime: 22,
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
      // 4. Star Compass
      {
        id: 204,
        worldId: 2,
        levelNumber: 4,
        title: 'Star Compass',
        difficulty: 'Intermediate',
        parTime: 30,
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
      // 5. Lighthouse Beacon
      {
        id: 205,
        worldId: 2,
        levelNumber: 5,
        title: 'Lighthouse Beacon',
        difficulty: 'Intermediate',
        parTime: 32,
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
      // 6. Palace Spire
      {
        id: 206,
        worldId: 2,
        levelNumber: 6,
        title: 'Palace Spire',
        difficulty: 'Intermediate',
        parTime: 35,
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
      },
      // 7. Eiffel Monument (Grand Architectural Spire)
      {
        id: 207,
        worldId: 2,
        levelNumber: 7,
        title: 'Eiffel Monument',
        difficulty: 'Advanced',
        parTime: 38,
        dots: [
          { id: 1, x: 50, y: 10 },
          { id: 2, x: 40, y: 35 },
          { id: 3, x: 60, y: 35 },
          { id: 4, x: 30, y: 65 },
          { id: 5, x: 70, y: 65 },
          { id: 6, x: 15, y: 90 },
          { id: 7, x: 85, y: 90 },
          { id: 8, x: 50, y: 75 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 2, to: 4, type: 'one-way' },
          { from: 3, to: 5 },
          { from: 2, to: 5 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 7, type: 'one-way' },
          { from: 6, to: 8 },
          { from: 7, to: 8 },
          { from: 4, to: 8 },
          { from: 5, to: 8 }
        ]
      },
      // 8. Galleon Warship (Grand Multi-Mast Rigging with Keel Lattice)
      {
        id: 208,
        worldId: 2,
        levelNumber: 8,
        title: 'Galleon Warship',
        difficulty: 'Master',
        parTime: 42,
        dots: [
          { id: 1, x: 30, y: 20 },
          { id: 2, x: 65, y: 15 },
          { id: 3, x: 15, y: 55 },
          { id: 4, x: 50, y: 55 },
          { id: 5, x: 85, y: 55 },
          { id: 6, x: 50, y: 85 },
          { id: 7, x: 75, y: 80 },
          { id: 8, x: 25, y: 80 }
        ],
        lines: [
          { from: 1, to: 2, type: 'double' },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 2, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 3, to: 5 },
          { from: 3, to: 8 },
          { from: 8, to: 6 },
          { from: 6, to: 7 },
          { from: 7, to: 5 },
          { from: 8, to: 7 },
          { from: 4, to: 6 },
          { from: 4, to: 8 },
          { from: 4, to: 7 }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // WORLD 3: FAUNA (Wildlife & Gemstones - 2x Double Stroke Lines)
  // -------------------------------------------------------------
  {
    id: 3,
    name: 'Fauna',
    subtitle: 'Wildlife & Gemstones',
    badge: '2x Double',
    color: 'from-purple-500 to-indigo-600',
    accentColor: '#a855f7',
    levels: [
      // 1. Double Mountain Peak
      {
        id: 301,
        worldId: 3,
        levelNumber: 1,
        title: 'Double Mountain',
        difficulty: 'Beginner',
        parTime: 20,
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
      // 2. Oceanic Angelfish
      {
        id: 302,
        worldId: 3,
        levelNumber: 2,
        title: 'Oceanic Angelfish',
        difficulty: 'Intermediate',
        parTime: 26,
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
      // 3. Brilliant Diamond
      {
        id: 303,
        worldId: 3,
        levelNumber: 3,
        title: 'Brilliant Diamond',
        difficulty: 'Intermediate',
        parTime: 25,
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
      // 4. Honeycomb Cell
      {
        id: 304,
        worldId: 3,
        levelNumber: 4,
        title: 'Honeycomb Cell',
        difficulty: 'Intermediate',
        parTime: 32,
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
      // 5. Emerald Dragonfly (Double-Reinforced Thorax & Tail)
      {
        id: 305,
        worldId: 3,
        levelNumber: 5,
        title: 'Emerald Dragonfly',
        difficulty: 'Advanced',
        parTime: 36,
        dots: [
          { id: 1, x: 50, y: 12 },
          { id: 2, x: 15, y: 25 },
          { id: 3, x: 85, y: 25 },
          { id: 4, x: 50, y: 38 },
          { id: 5, x: 20, y: 55 },
          { id: 6, x: 80, y: 55 },
          { id: 7, x: 50, y: 68 },
          { id: 8, x: 50, y: 92 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 4 },
          { from: 1, to: 4, type: 'double' },
          { from: 4, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 7 },
          { from: 6, to: 7 },
          { from: 4, to: 7 },
          { from: 7, to: 8, type: 'double' }
        ]
      },
      // 6. Royal Stag Antlers (Branching Antler Lattice)
      {
        id: 306,
        worldId: 3,
        levelNumber: 6,
        title: 'Royal Stag Antlers',
        difficulty: 'Master',
        parTime: 40,
        dots: [
          { id: 1, x: 50, y: 80 },
          { id: 2, x: 50, y: 55 },
          { id: 3, x: 30, y: 35 },
          { id: 4, x: 70, y: 35 },
          { id: 5, x: 15, y: 45 },
          { id: 6, x: 85, y: 45 },
          { id: 7, x: 20, y: 15 },
          { id: 8, x: 80, y: 15 },
          { id: 9, x: 50, y: 25 }
        ],
        lines: [
          { from: 1, to: 2, type: 'double' },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 2 },
          { from: 6, to: 2 },
          { from: 3, to: 7 },
          { from: 4, to: 8 },
          { from: 7, to: 9 },
          { from: 8, to: 9 },
          { from: 3, to: 9, type: 'double' },
          { from: 4, to: 9, type: 'double' }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // WORLD 4: COSMOS (Celestial Constellations & Hybrid Mazes)
  // -------------------------------------------------------------
  {
    id: 4,
    name: 'Cosmos',
    subtitle: 'Constellations & Star Mazes',
    badge: 'Expert',
    color: 'from-emerald-500 to-teal-700',
    accentColor: '#10b981',
    levels: [
      // 1. Orion Matrix
      {
        id: 401,
        worldId: 4,
        levelNumber: 1,
        title: 'Orion Matrix',
        difficulty: 'Advanced',
        parTime: 38,
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
      // 2. Nebula Spiral
      {
        id: 402,
        worldId: 4,
        levelNumber: 2,
        title: 'Nebula Spiral',
        difficulty: 'Advanced',
        parTime: 42,
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
      },
      // 3. Solar Flare Ring (Radiant Multi-Spoke Double Corona)
      {
        id: 403,
        worldId: 4,
        levelNumber: 3,
        title: 'Solar Flare Ring',
        difficulty: 'Master',
        parTime: 45,
        dots: [
          { id: 1, x: 50, y: 12 },
          { id: 2, x: 85, y: 30 },
          { id: 3, x: 85, y: 70 },
          { id: 4, x: 50, y: 88 },
          { id: 5, x: 15, y: 70 },
          { id: 6, x: 15, y: 30 },
          { id: 7, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 6 },
          { from: 6, to: 1 },
          { from: 1, to: 4, type: 'double' },
          { from: 2, to: 5, type: 'double' },
          { from: 3, to: 6, type: 'double' },
          { from: 1, to: 7, type: 'one-way' },
          { from: 7, to: 4, type: 'one-way' }
        ]
      },
      // 4. Celestial Tesseract (4D Projection Hypercube Lattice)
      {
        id: 404,
        worldId: 4,
        levelNumber: 4,
        title: 'Celestial Tesseract',
        difficulty: 'Master',
        parTime: 50,
        dots: [
          { id: 1, x: 18, y: 18 },
          { id: 2, x: 82, y: 18 },
          { id: 3, x: 82, y: 82 },
          { id: 4, x: 18, y: 82 },
          { id: 5, x: 35, y: 35 },
          { id: 6, x: 65, y: 35 },
          { id: 7, x: 65, y: 65 },
          { id: 8, x: 35, y: 65 },
          { id: 9, x: 50, y: 50 }
        ],
        lines: [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 4, to: 1 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 1, to: 5 },
          { from: 2, to: 6 },
          { from: 3, to: 7 },
          { from: 4, to: 8 },
          { from: 5, to: 6 },
          { from: 6, to: 7 },
          { from: 7, to: 8 },
          { from: 8, to: 5 },
          { from: 5, to: 9 },
          { from: 6, to: 9 },
          { from: 7, to: 9 },
          { from: 8, to: 9 }
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
