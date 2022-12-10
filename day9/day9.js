import { readFileSync } from 'node:fs';

const input = readFileSync('day9.txt', { encoding: 'utf-8' })
  .replace(/\r/g, "")
  .trim()
  .split('\n');


function puzzleOne() {
  let head = {x: 0, y: 0, px: 0, py: 0}, tail = {x: 0, y: 0}; // head and tail both start at (0,0)
  const visited = new Set();  // stores the position that tail visited

  visited.add(Object.values(tail).join('-'));  // tail already visited starting position

  for (let line of input) {
    const [direction, steps] = line.split(' ');

    for (let i=0; i<Number(steps); i++) {
      // update the prev x, y
      head.px = head.x;
      head.py = head.y;
      // first, move the head to next position
      if (direction === 'U') head.y++;
      else if (direction === 'D') head.y--; 
      else if (direction === 'R') head.x++;
      else if (direction === 'L') head.x--;

      // next, check if tail is still adjacent to head
      if (!isAdjacent()) {
        moveTail();
      }
    }
  }

  function isAdjacent() {
    return (tail.x >= head.x-1 && tail.x <= head.x+1) && (tail.y >= head.y-1 && tail.y <= head.y+1); 
  }

  function moveTail() {
    tail.x = head.px;
    tail.y = head.py;
    let tailStr = Object.values(tail).join('-');
    if (!visited.has(tailStr)) {
      visited.add(tailStr);
    }
  }

  console.log(visited.size);
  return;

}

function puzzleTwo() {
  // all 10 knots starting at (0,0)
  const KNOTS = 10;
  let snake = [];
  for (let i=0; i<KNOTS; i++) {
    snake.push({
      x: 0,
      y: 0
    })
  }

  let visited = new Set();
  visited.add(Object.values(snake[KNOTS-1]).join('-'));  // tail already visited starting position


  function isAdjacent(knotA, knotB) {
    return (knotA.x >= knotB.x-1 && knotA.x <= knotB.x+1) && (knotA.y >= knotB.y-1 && knotA.y <= knotB.y+1); 
  }

  function move(ahead, after) {
    let next = { ...after };

    if (after.x > ahead.x) next.x--;
    else if (after.x < ahead.x) next.x++;
    if (after.y > ahead.y) next.y--;
    else if (after.y < ahead.y) next.y++;

    return next;
  }

  for (let line of input) {
    const [direction, steps] = line.split(' ');
    for (let i=0; i<Number(steps); i++) {
      // move head
      if (direction === 'U') snake[0].y++;
      else if (direction === 'D') snake[0].y--; 
      else if (direction === 'R') snake[0].x++;
      else if (direction === 'L') snake[0].x--;

      // move rest of the tails, if necessary
      for (let j=1; j<KNOTS; j++) {
        if (!isAdjacent(snake[j-1], snake[j])) {
          snake[j] = move(snake[j-1], snake[j]);
        }
      }
      let tailStr = Object.values(snake[KNOTS-1]).join('-');
      if (!visited.has(tailStr)) {
        visited.add(tailStr);
      }
    }
  }

  console.log(visited.size);
  return;
}

puzzleOne();

puzzleTwo()