import { readFileSync } from 'node:fs';

// set up
const input = readFileSync('day2.txt', { encoding: 'utf-8'})
  .replace(/\r/g, "")
  .trim()
  .split('\n');


function puzzleOne() {
  const opponentMap = { 'A': 1, 'B': 2, 'C': 3 };
  const myMap = {'X': 1, 'Y': 2, 'Z': 3};
  let points = 0;

  for (let round of input) {
    // add points for selection
    let myChoice = round[2];
    let oppChoice = round[0];
    points += myMap[myChoice];

    // add points for round result
    // handle tie 
    if (myMap[myChoice] === opponentMap[oppChoice]) {
      points += 3;
    } else {
      // reward win (ignore losing case)
      if (myChoice === 'X' && oppChoice === 'C' || myChoice === 'Y' && oppChoice === 'A' || myChoice === 'Z' && oppChoice === 'B') {
        points += 6;
      }
    }
  }

  console.log(points);
  return;
}

function puzzleTwo() {
  // A: Rock, B: Paper, C: Scissor
  // X: Lose, Y: Draw, Z: Win
  const winMap = {'A': 2, 'B': 3, 'C': 1};
  const drawMap = { 'A': 1, 'B': 2, 'C': 3 };
  const loseMap = {'A': 3, 'B': 1, 'C': 2};
  let points = 0;

  for (let round of input) {
    let outcome = round[2];
    let oppChoice = round[0];

    switch (outcome) {
      case 'X':
        // Lose
        points += loseMap[oppChoice];
        break;
      case 'Y':
        // Draw
        points += drawMap[oppChoice];
        points += 3;
        break;
      case 'Z':
        // Win
        points += winMap[oppChoice];
        points += 6;
        break;
    }
  
  }

  console.log(points);
  return;
}

puzzleOne();
puzzleTwo();