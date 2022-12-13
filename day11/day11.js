import { readFileSync } from 'node:fs';

const input = readFileSync('day11.txt', {encoding: 'utf-8'})
  .replace(/\r/g, "")
  .trim()
  .split('\n\n');

function puzzleOne() {
  const rounds = 20;
  const monkeys = [];

  // set up: 
  for (let monkeyInfo of input) {
    let infos = monkeyInfo.split('\n'); 
    let items = [], op, test, t, f; // items, operation, test(divisible), true case, false case
    for (let i= 1; i<infos.length; i++) {
      let [command, val] = infos[i].trim().split(': ')

      if (command === 'Starting items') {
        val.split(',').map((value) => {
          items.push(Number(value.trim()));
        })
      } else if (command === 'Operation') {
        op =  val.split('= ')[1]
      } else if (command === 'Test') {
        test = Number(val.split(' ')[2]);
      } else if (command === 'If true') {
        t = Number(val.split(' ')[3]);
      } else if (command === 'If false') {
        f = Number(val.split(' ')[3]);
      }
    }
    // construct a monkey object and push it to monkey array
    let monkey = {
      items,
      op,
      test,
      t,
      f,
      count: 0
    };
    monkeys.push(monkey);
  }



  // throw & swap for 20 rounds. keep track of the inspection count.
  for (let i=0; i<rounds; i++) {
    for (let monkey of monkeys) {
      // for each monkey, inspect all the items, if not just continue.
      if (monkey.items.length > 0) {
        while (monkey.items.length !== 0) {
          let newWorry = eval(monkey.op.replaceAll('old', monkey.items.shift()));
          let reduced = Math.floor(newWorry / 3);
          if (reduced % monkey.test === 0) {
            // true case
            monkeys[monkey.t].items.push(reduced);
          } else {
            // false case
            monkeys[monkey.f].items.push(reduced);
          }
          monkey.count++;
        }

      }
    }
  }

  // multiply the top 2 monkeys with the most count
  let counts = monkeys.map(m => m.count).sort((a,b) => b - a);
  console.log(counts[0] * counts[1]);

}


function puzzleTwo() {
  const rounds = 10000;
  const monkeys = [];
  let LCM = 1;

  // set up: 
  for (let monkeyInfo of input) {
    let infos = monkeyInfo.split('\n'); 
    let items = [], op, test, t, f; // items, operation, test(divisible), true case, false case
    for (let i= 1; i<infos.length; i++) {
      let [command, val] = infos[i].trim().split(': ')

      if (command === 'Starting items') {
        val.split(',').map((value) => {
          items.push(Number(value.trim()));
        })
      } else if (command === 'Operation') {
        op =  val.split('= ')[1]
      } else if (command === 'Test') {
        test = Number(val.split(' ')[2]);
        LCM *= test;
      } else if (command === 'If true') {
        t = Number(val.split(' ')[3]);
      } else if (command === 'If false') {
        f = Number(val.split(' ')[3]);
      }
    }
    // construct a monkey object and push it to monkey array
    let monkey = {
      items,
      op,
      test,
      t,
      f,
      count: 0
    };
    monkeys.push(monkey);
  }



  // throw & swap for 20 rounds. keep track of the inspection count.
  for (let i=0; i<rounds; i++) {
    for (let monkey of monkeys) {
      // for each monkey, inspect all the items, if not just continue.
      if (monkey.items.length > 0) {
        while (monkey.items.length !== 0) {
          let reduced = monkey.items.shift() % LCM;
          let newWorry = eval(monkey.op.replaceAll('old', reduced));
          if (newWorry % monkey.test === 0) {
            // true case
            monkeys[monkey.t].items.push(newWorry);
          } else {
            // false case
            monkeys[monkey.f].items.push(newWorry);
          }
          monkey.count++;
        }

      }
    }
  }

  // multiply the top 2 monkeys with the most count
  let counts = monkeys.map(m => m.count).sort((a,b) => b - a);
  console.log(counts[0] * counts[1]);


}


puzzleOne();

puzzleTwo();


