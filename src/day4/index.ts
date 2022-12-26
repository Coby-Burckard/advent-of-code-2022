import { Solver } from "../types";
import { parseFileBy, parseInput } from "../utils";

type Section = number[];
type ElfPair = Section[];

const parseIntoPairs = (lines: string[]): ElfPair[] =>
  lines.map((line) =>
    line.split(",").map((section) => section.split("-").map(Number))
  );

const isPairCocentric = (pair: ElfPair) => {
  const startOverlap = pair[0][0] - pair[1][0];
  const endOverlap = pair[0][1] - pair[1][1];

  // e.g 5-7,4-10 or 4-10,5-7
  return Number(
    (startOverlap >= 0 && endOverlap <= 0) ||
      (startOverlap <= 0 && endOverlap >= 0)
  );
};

const doesPairOverlap = (pair: ElfPair) => {
  const [oneStart, oneEnd] = pair[0];
  const [twoStart, twoEnd] = pair[1];

  // 5-10,8-12 or 5-10,4-6 or 5-5,5-5 or 2-4,5-10
  const isStartOverlap = oneStart <= twoStart && oneEnd >= twoStart;
  const isEndOverlap = oneStart <= twoEnd && oneEnd >= twoEnd;

  return Number(isStartOverlap || isEndOverlap || isPairCocentric(pair));
};

const s4: Solver = (config) => {
  const pairs = parseInput(4, parseFileBy("\n"), parseIntoPairs, config);

  const one = pairs.reduce((acc, pair) => acc + isPairCocentric(pair), 0);
  const two = pairs.reduce((acc, pair) => acc + doesPairOverlap(pair), 0);
  return [one, two];
};

export default s4;
