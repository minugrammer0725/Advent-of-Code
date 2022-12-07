import { readFileSync } from 'node:fs';

const input = readFileSync('day7.txt', { encoding: 'utf-8'})
  .replace(/\r/g, "")
  .trim()
  .split('\n');


function puzzle() {
  // $ cd
    // 1) / (outer-most dir), 2) <dirname>, 3) .. (go up one dir)
  // $ ls
    // list all files or 'dir'
    // for each ls call, sum all the file sizes and put in map

  let total = 0;
  const LIMIT = 100000;
  const AVAILABLE = 70000000;
  const NEEDED = 30000000;
  let currentDirectory = '';
  let dirMap = new Map();  // key: 'dirPath', value: [ fileSize, 'dirPath', 'dirPath']

  // set up directory map
  for (let line of input) {
    let commands = line.split(' ');
    if (commands[0] === '$') {
      // cd case
      if (commands[1] === 'cd') {
        if (commands[2] === '..') {
          // go upwards
          let dirs = currentDirectory.split('/');
          let upwards = dirs.slice(0, dirs.length-1);
          currentDirectory = upwards.length > 1 ? upwards.join('/') : '/';
        } else {
          // go to dir
          let dir = commands[2];
          if (dir === '/') {
            currentDirectory += dir;
          } else {
            if (currentDirectory === '/') {
              currentDirectory += dir;
            } else {
              currentDirectory += `/${dir}`;
            }
          }
        }
      } else {
      // ls case
      // initialize the map with empty array
        dirMap.set(currentDirectory, []);
      }

    } else {
      // Not a command. either 'dir <dirName>' or '<fileSize> <fileName>'
      if (commands[0] === 'dir') {
        // add the dirPath (later re-computed to file size)
        if (currentDirectory === '/') {
          dirMap.get(currentDirectory)?.push(`/${commands[1]}`);
        } else {
          dirMap.get(currentDirectory)?.push(`${currentDirectory}/${commands[1]}`);
        }
      } else {
        // add the file size
        dirMap.get(currentDirectory)?.push (Number(commands[0]));
      }
    }
  }

  // Recursively replace the 'dirPath' with file size for our dirMap.
  function helper(key) {
    if (dirMap.get(key).every((val) => !isNaN(val))) {
      // if array consists of all numbers, return the sum
      return dirMap.get(key).reduce((a,b) => a+b);
    }
    // for each value inside the array, if value is not a numeric file size,
    // recursively compute the sum of file size of each dir path.
    return dirMap.get(key).map((val) => {
      if (isNaN(val)) {
        return helper(val);
      } else {
        return val;
      }
    }).reduce((a,b) => a+b);
  }

  // part one
  // compute the total sum of dir < Limit (100000)
  for (let key of dirMap.keys()) {
    let sum = helper(key);
    dirMap.set(key, sum);
    if (sum <= LIMIT) {
      total += sum;
    }
  }
  console.log(total);

  // part two
  // compute the minimum size of dir to delete
  const UNUSED = AVAILABLE - dirMap.get('/');
  let deleteDir = NEEDED;
  for (let value of dirMap.values()) {
    if (value + UNUSED > NEEDED) {
      deleteDir = Math.min(deleteDir, value);
    }
  }
  console.log(deleteDir);

  return;
}

puzzle();

