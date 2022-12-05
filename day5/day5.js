import { readFileSync } from 'node:fs';

const input = readFileSync('day5.txt', { encoding: 'utf-8'})
  .replace(/\r/g, "")
  .split('\n\n');



function puzzle(part) {
  // const [stacks, procedure] = input;
  let stacks = [];
  let result = '';
  const inputStacks = input[0].split('\n');

  const numStacks = inputStacks.pop().split('  ').length;
  for (let i=0; i<numStacks; i++) {
    // push 'n' empty stack
    stacks.push([]);
  }

  for (let i=0; i<inputStacks.length; i++) {
    inputStacks[i] = inputStacks[i].replace(/    /g, ' X ').trim();
  }

  // iterate numStacks from backwards..  
  for (let i=inputStacks.length-1; i>=0; i--) {
    // console.log('input stacks', inputStacks);
    // console.log('i', i);
    // console.log('stack', inputStacks[i]);
    inputStacks[i].split(' ').filter(s => s !== '').map((value, idx) => {
      if (value !== 'X') {
        const letter = value[1];
        stacks[idx].push(letter);
      }
    })
  }

  for (let step of input[1].split('\n')) {
    let moveFromTo = step
      .split(' ')
      .filter((val, idx) => idx % 2 !== 0)
      .map(Number);

    if (part === 'partOne') {
      // puzzle one (move one at a time)
      for (let i=0; i<moveFromTo[0]; i++) {
        stacks[moveFromTo[2]-1].push(stacks[moveFromTo[1]-1].pop());
      }
    } else {
      // puzzle two (move in chunks)
      let moveArr = []
      for (let i=0; i<moveFromTo[0]; i++) {
        moveArr.push(stacks[moveFromTo[1]-1].pop());
      }
      for (let i=0; i<moveFromTo[0]; i++) {
        stacks[moveFromTo[2]-1].push(moveArr.pop());
      }
    }
  }

  // done rearranging, take the last element from each stack
  for (let i=0; i<numStacks; i++) {
    result += stacks[i].pop();
  }
  console.log(result);
  return;
}

puzzle('partOne');
puzzle('partTwo');

