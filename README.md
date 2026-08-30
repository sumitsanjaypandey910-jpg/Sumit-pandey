# 1Line - One Stroke Drawing Puzzle Game

A single-stroke brain-training puzzle game built with React, TypeScript, Tailwind CSS, and HTML5 Canvas / SVG vector graphics. Connect all dots with a continuous line without retracing any edge twice.

## Features

- **Geometric Puzzles**: Multiple worlds featuring basic shapes, one-way directed arrows, and double-stroke paths.
- **Eulerian Path Algorithm**: Real-time validation and intelligent hint solver based on graph theory.
- **Web Audio API**: Dynamic polyphonic audio synthesis for connections, completions, and interactive chimes.
- **Daily Challenge Mode**: Daily procedural puzzle generator with streak tracking.
- **Custom Level Editor**: In-browser graph builder with instant Eulerian solvability analysis and JSON import/export.
- **Touch & Mouse Support**: Smooth multi-touch path tracing with dot proximity snapping.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 1line-game

# Install dependencies
npm install
```

### Running Locally

```bash
# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The optimized static production files will be built in the `dist/` directory.

## Project Structure

```text
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                  # Main game state orchestration
    ├── main.tsx                 # React entry point
    ├── index.css                # Tailwind styling
    ├── types.ts                 # TypeScript interfaces and definitions
    ├── components/              # Modular UI components
    │   ├── GameBoard.tsx        # SVG drawing canvas and interaction engine
    │   ├── Header.tsx           # Game stats, navigation, and audio toggle
    │   ├── Controls.tsx         # Reset, undo, and hint buttons
    │   ├── VictoryModal.tsx     # Level completion and rating modal
    │   ├── LevelSelectModal.tsx # World and level selection grid
    │   ├── DailyChallengeModal.tsx # Daily puzzle view
    │   ├── LevelEditorModal.tsx # Interactive level creation sandbox
    │   └── HowToPlayModal.tsx   # Tutorial and rules guide
    ├── data/
    │   └── levels.ts            # Campaign world and level definitions
    └── utils/
        ├── audio.ts             # Web Audio synthesizer
        ├── eulerSolver.ts       # Graph solvability & hint algorithms
        └── levelGenerator.ts    # Procedural daily puzzle generation
```

## License

MIT
