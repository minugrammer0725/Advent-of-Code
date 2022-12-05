import { readFileSync } from 'node:fs';

const input = readFileSync('day3.txt', { encoding: 'utf-8' })
  .replace(/\r/g, "")
  .trim()
  .split('\n');


function puzzleOne() {
  let sum = 0;
  // step 1: for each line(rucksack), split the str in half.
  for (let rucksack of input) {
    let mid = rucksack.length / 2;
    let left = new Set(rucksack.slice(0, mid));
    let right = new Set(rucksack.slice(mid));
    for (let type of [...left]) {
      if (right.has(type)) {
        // calculate the priority score and add to sum
        // According to ASCII, subtract 96 if lowercase, 38 if uppercase.
        let ASCII = type.charCodeAt(0);
        if (ASCII >= 97) {
          // lowercase
          ASCII -= 96;
        } else {
          // uppercase
          ASCII -= 38;
        }
        sum += ASCII;
      }
    }
  }

  console.log(sum);
  return;
}

function puzzleTwo() {
  let sum = 0;
  let group = [];
  input.map((rucksack, idx) => {
    group.push(rucksack);
    if ((idx+1) % 3 === 0)  {
      let first = [...new Set(group[0])];
      let second = new Set(group[1]), third = new Set(group[2]);
      for (let type of first) {
        if (second.has(type) && third.has(type)) {
          let ASCII = type.charCodeAt(0);
          if (ASCII >= 97) {
            // lowercase
            ASCII -= 96;
          } else {
            // uppercase
            ASCII -= 38;
          }
          sum += ASCII;
          // break?
        }
      }

      group = [];
    }
  })

  console.log(sum);
  return;
}

puzzleOne();
puzzleTwo();