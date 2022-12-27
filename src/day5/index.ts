import { Solver } from "../types";
import { parseFileBy, parseInput } from "../utils";

type Stack = string[];
type Yard = Stack[];
type Instruction = { quantity: number; origin: number; destination: number };

const parseTower = (input: string) => {
  /* 
   [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

  indexes needed = 1, 5, 9
  */
  const horzTower = input.split("\n").map((line, i) =>
    line
      .split("")
      .reduce((acc, char, i) => ((i - 1) % 4 === 0 ? acc + char : acc), "")
      .split("")
  );

  // convert rows to columns
  const verticalTower: Yard = [];
  for (let i = horzTower.length - 2; i >= 0; i--) {
    const row = horzTower[i];
    for (let column = 0; column < row.length; column++) {
      if (i === horzTower.length - 2) verticalTower.push([]);
      row[column] !== " " && verticalTower[column].push(row[column]);
    }
  }

  return verticalTower;
};

const parseInstructions = (input: string): Instruction[] => {
  //move 1 from 7 to 4
  return input.split("\n").map((line) => {
    const instArr = line.matchAll(/\d+/g);
    const matches = [];
    for (let match of instArr) {
      matches.push(match[0]);
    }
    return {
      quantity: Number(matches[0]),
      origin: Number(matches[1]) - 1,
      destination: Number(matches[2]) - 1,
    };
  });
};

const parseTowerAndInstructions = (file: string[]) => [
  {
    yard: parseTower(file[0]),
    instructions: parseInstructions(file[1]),
  },
];

const moveCrates = (
  { quantity, origin, destination }: Instruction,
  yard: Yard,
  reverse: Boolean
) => {
  const moving = yard[origin].splice(-quantity);
  yard[destination] = yard[destination].concat(
    reverse ? moving.reverse() : moving
  );
};

const S5: Solver = (config) => {
  const result = [];
  for (let reverse of [true, false]) {
    const { instructions, yard } = parseInput(
      5,
      parseFileBy(),
      parseTowerAndInstructions,
      config
    )[0];

    for (const instruction of instructions) {
      try {
        moveCrates(instruction, yard, reverse);
      } catch {
        console.log(instruction, yard);
      }
    }

    result.push(yard.reduce((acc, stack) => acc + stack[stack.length - 1], ""));
  }

  return result;
};

export default S5;
