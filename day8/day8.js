import { readFileSync } from 'node:fs';

const input = readFileSync('day8.txt', { encoding: 'utf-8' })
  .replace(/\r/g, "")
  .trim()
  .split('\n');


// count the number of visible trees.
// visible: visible in at least one direction (top, left, etc)
function puzzleOne() {  
  // count all the edges + visible trees within the interior region
  const width = input[0].length;
  const height = input.length;
  const edges = (width*2) + ((height-2)*2);
  let count = edges;
  let treeHeight;

  for (let i=1; i<height-1; i++) {
    for (let j=1; j<width-1; j++) {
      // recursively compute whether a tree (i, j)
      // is visible. If so, add 1 to count.
      treeHeight = input[i][j];

      // check all 4 directions
      let topVisible = true, bottomVisible = true, leftVisible = true, rightVisible = true;
      
      // check top
      for (let t=i-1; t>=0; t--) {
        if (input[t][j] >= treeHeight) {
          topVisible = false;
          break;
        }
      }

      // check bottom
      for (let b=i+1; b<=height-1; b++) {
        if (input[b][j] >= treeHeight) {
          bottomVisible = false;
          break;
        }
      }

      // check left
      for (let l=j-1; l>=0; l--) {
        if (input[i][l] >= treeHeight) {
          leftVisible = false;
          break;
        }
      }

      // check right
      for (let r=j+1; r<=width-1; r++) {
        if (input[i][r] >= treeHeight) {
          rightVisible = false;
          break;
        }
      }

      if (topVisible || bottomVisible || leftVisible || rightVisible) {
        count += 1;
      }
    }
  }

  console.log(count);
  return;
}

// return the maximum scenic score of a tree
function puzzleTwo() {
  const width = input[0].length;
  const height = input.length;
  let maxScore = 0;
  let treeHeight;

  for (let i=1; i<height-1; i++) {
    for (let j=1; j<width-1; j++) {
      treeHeight = input[i][j];
      
      // calculate the scenic score for each direction
      let top = 0, bottom = 0, left = 0, right = 0;

      // check top
      for (let t=i-1; t>=0; t--) {
        if (input[t][j] >= treeHeight) {
          top++;
          break;
        }
        top++;
      }
      // check bottom
      for (let b=i+1; b<=height-1; b++) {
        if (input[b][j] >= treeHeight) {
          bottom++;
          break;
        }
        bottom++;
      }
      // check left
      for (let l=j-1; l>=0; l--) {
        if (input[i][l] >= treeHeight) {
          left++;
          break;
        }
        left++;
      }

      // check right
      for (let r=j+1; r<=width-1; r++) {
        if (input[i][r] >= treeHeight) {
          right++;
          break;
        }
        right++;
      }
      
      // update score
      maxScore = Math.max(maxScore, (top*bottom*left*right));
    }
  }

  console.log(maxScore);
  return;
}


puzzleOne();
puzzleTwo();