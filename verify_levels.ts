import { WORLDS_DATA } from './src/data/levels';
import { findEulerianPath } from './src/utils/eulerSolver';

let allPassed = true;
for (const world of WORLDS_DATA) {
  console.log(`World ${world.id}: ${world.name}`);
  for (const level of world.levels) {
    const path = findEulerianPath(level.dots, level.lines);
    if (!path) {
      console.error(`FAIL: Level ${level.id} (${level.title}) is NOT solvable!`);
      allPassed = false;
    } else {
      console.log(`PASS: Level ${level.id} (${level.title}) path found with ${path.length - 1} edges`);
    }
  }
}
if (!allPassed) {
  process.exit(1);
} else {
  console.log('ALL NEW LEVELS 100% SOLVABLE!');
}
