import { parseFileBy, parseInput } from "../utils";

const DAY = 1;

const parseAndSumCals = (elves: string[]) =>
  elves
    .map((elf) =>
      elf.split("\n").reduce((accum, cal) => (accum += Number(cal)), 0)
    )
    .sort((a, b) => b - a);

export default () => {
  const elfCals = parseInput(DAY, parseFileBy(), parseAndSumCals);

  return [
    elfCals[0],
    elfCals.slice(0, 3).reduce((accum, curr) => accum + curr, 0),
  ];
};
