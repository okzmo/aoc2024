import { readFile } from "./utils.js";

const lines = await readFile("day6.txt")
const rows = lines.length;
const cols = lines[0].length;

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let startRow, startCol, startDir;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if ("^>v<".includes(lines[r][c])) {
      startRow = r;
      startCol = c;
      startDir = "^>v<".indexOf(lines[r][c]);
      break;
    }
  }
}

function day6() {
  let currRow = startRow;
  let currCol = startCol;
  let currDir = startDir;
  const visited = new Set([`${currRow},${currCol}`]);

  while (true) {
    const [newR, newC] = DIRECTIONS[currDir];
    const nextRow = currRow + newR;
    const nextCol = currCol + newC;

    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
      break;
    }

    if (lines[nextRow][nextCol] === "#") {
      currDir = (currDir + 1) % 4; // clockwise
    } else {
      currRow = nextRow;
      currCol = nextCol;
      visited.add(`${currRow},${currCol}`);
    }
  }

  return visited.size;
}
console.log(day6())

function simulateObstacle(obsR, obsC) {
  let currRow = startRow;
  let currCol = startCol;
  let currDir = startDir;
  const visited = new Set([`${currRow},${currCol},${currDir}`]);

  while (true) {
    const [newR, newC] = DIRECTIONS[currDir];
    const nextRow = currRow + newR;
    const nextCol = currCol + newC;

    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
      return false;
    }

    if ((lines[nextRow][nextCol] === "#") || (nextRow === obsR && nextCol === obsC)) {
      currDir = (currDir + 1) % 4; // clockwise
    } else {
      currRow = nextRow;
      currCol = nextCol;
    }

    const state = `${currRow},${currCol},${currDir}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);
  }
}

function day6part2() {
  let valid = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (lines[r][c] === "#" || (r === startRow && c === startCol)) {
        continue;
      }

      if (simulateObstacle(r, c)) {
        valid++;
      }
    }
  }

  return valid;

}
console.log(day6part2())
