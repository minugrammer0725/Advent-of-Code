import { readFileSync } from 'node:fs';

const input = readFileSync('day6.txt', { encoding: 'utf-8'}).replace(/\r/g, "");
const inputLen = input.length;

function puzzle(uniqueDigits) {
  // digits: 4 || 14
  let idx = uniqueDigits;

  for (let i=0; i<=inputLen-uniqueDigits; i++) {
    let code = input.substring(i, i+uniqueDigits);
    if (new Set(code).size === uniqueDigits) {
      break;
    }
    idx++;
  }

  console.log(idx);
  return;
}

puzzle(4);
puzzle(14);