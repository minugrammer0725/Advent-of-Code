import { readFileSync } from 'node:fs';

const input = readFileSync('day10.txt', {encoding: 'utf-8'})
  .replace(/\r/g, "")
  .trim()
  .split('\n');


function puzzleOne() {
  let X = 1;
  let cycle = 1;
  let signalStrengths = [];

  function processCycle() {
    if ((cycle + 20)  % 40 === 0) {
      signalStrengths.push(cycle * X);
    }
    cycle++;
  }

  for (let line of input) {
    let [inst, val] = line.split(' ');

    // if the cycle is (20, 60 ... 220), add the values 
    if (inst === 'addx') {
      for (let i=0; i<2; i++) {
        processCycle();
      }
      X += Number(val);
    } else {
      processCycle();
    }

  }

  console.log(signalStrengths.reduce((prev, curr) => prev + curr));
  return;

}

function puzzleTwo() {
  let X = 1;
  let cycle = 0;
  let CRT = '';

  function litOrDark() {
    let pos = cycle % 40;
    if (pos === 0) {
      CRT += '\n';
    }
    if (pos >= X-1 && pos <= X+1) {
      CRT += '#';
    } else {
      CRT += '.';
    }
    cycle++;
  }

  for (let line of input) {
    let [inst, val] = line.split(' ');

    if (inst === 'addx') {
      for (let i=0; i<2; i++) {
        // addx
        litOrDark();
      }
      X += Number(val);
    } else {
      // noop
      litOrDark();
    }
  }

  console.log(CRT);
}

puzzleOne();

puzzleTwo();