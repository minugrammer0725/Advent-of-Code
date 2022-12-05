import { readFileSync } from 'node:fs';

// set up
const input = readFileSync('day1.txt', { encoding: 'utf-8'})
  .replace(/\r/g, "")
  .trim()
  .split('\n')
  .map(Number);



// puzzle-1
function puzzleOne() {
  let elfCalories = 0;
  let idx = 0;

  let richElfIdx = 0;
  let maxCalories = 0;

  for (let line of input) {
    if (line === 0) {
      // compute maxCalories
      if (elfCalories > maxCalories) {
        maxCalories = elfCalories;
        richElfIdx = idx;
      }
      idx++;
      elfCalories = 0;
    }
    
    // add the calories to current elfCalories
    elfCalories += line;
  }

  console.log(maxCalories);
  return;
}


function puzzleTwo() {
  // first, second, third = 0. compare in order
  let first = 0, second = 0, third = 0;
  let curSum = 0;
  for (let line of input) {
    if (line === 0) {
      // compute here
      if (curSum > first) {
        let firstVal = first;
        let secondVal = second;
        first = curSum;
        second = firstVal;
        third = secondVal;
      } else if (curSum > second) {
        let secondVal = second;
        second = curSum;
        third = secondVal;
      } else if (curSum > third) {
        third = curSum;
      }
      // reset current sum
      curSum = 0;
    } 
    curSum += line;
  }

  console.log(first + second + third);
  return;
}

puzzleOne();
puzzleTwo();
