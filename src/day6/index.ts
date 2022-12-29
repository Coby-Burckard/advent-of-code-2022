import { Solver } from "../types";
import { parseFileBy, parseInput } from "../utils";

const findNonrepeatingEnd = (line: string, n = 3, repeatAmount = 1) => {
  console.log("starting case");
  const input = line.split("");
  for (let index in input) {
    if (Number(index) < n) continue;
    let track: { [k: string]: number } = {};
    for (let check = Number(index) - n; check <= Number(index); check++) {
      const code = input[check];
      if (Boolean(track[code])) break;
      track[code] = 1;

      if (check === Number(index)) return Number(index) + 1;
    }
  }

  return -1;
};

const S6: Solver = (config) => {
  const input = parseInput(6, parseFileBy("\n"), (inp) => inp, config);
  const one = input.map((line) => findNonrepeatingEnd(line, 3));
  const two = input.map((line) => findNonrepeatingEnd(line, 13));
  return [one[0], two[0]];
};

export default S6;
