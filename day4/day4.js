import { readFileSync } from 'node:fs';

const input = readFileSync('day4.txt', { encoding: 'utf-8'})
  .replace(/\r/g, "")
  .trim()
  .split('\n');


function puzzleOne() {
  let count = 0;
  for (let pair of input) {
    let [left, right] = pair.split(',');
    if (fullyConains(left, right) || fullyConains(right, left)) {
      count += 1;
    }
  }

  function fullyConains(left, right) {
    // return true if left includes right..
    // leftStart - leftEnd, rightStart - rightEnd
    let [lStart, lEnd] = left.split('-').map(Number);
    let [rStart, rEnd] = right.split('-').map(Number);
    return lStart <= rStart && lEnd >= rEnd;
  }

  console.log(count);
  return;
}

function puzzleTwo() {
  let count = 0;
  for (let pair of input) {
    let [left, right] = pair.split(',');
    if (overlaps(left, right) || overlaps(right, left )) {
      count += 1;
    }
  }

  function overlaps(left, right) {
    let [lStart, lEnd] = left.split('-').map(Number);
    let [rStart, rEnd] = right.split('-').map(Number);
    return !(lEnd < rStart || lStart > rEnd);
  }

  console.log(count);
  return;
}

puzzleOne();
puzzleTwo();