import { Set } from "typescript";
import { Solver } from "../types";
import { parseFileBy, parseInput } from "../utils";

const DAY = 3;

const splitSacks = (sacks: string[]): string[][][] =>
  sacks.map((sack) => {
    const sackArr = sack.split("");
    const compartmentTwo = sackArr.splice(sackArr.length / 2);
    return [sackArr, compartmentTwo];
  });

const findOutlier = (compartments: string[][]): string => {
  let outlier = "";
  const track: { [k: string]: number } = {};
  compartments[0].forEach((item) => (track[item] = 1));
  compartments[1].forEach((item) => {
    if (track[item] === 1) outlier = item;
  });
  return outlier;
};

const findTriplicateItem = (sacks: string[][][]): string => {
  const track: { [k: string]: Set<number> } = {};
  let badge = "";
  sacks.forEach((sack, i) =>
    sack.forEach((compartment) =>
      compartment.forEach((item) => {
        track[item] =
          track[item] === undefined ? new Set([i]) : track[item].add(i);
        if (track[item]?.size === 3) {
          badge = item;
        }
      })
    )
  );
  return badge;
};

const scoreOutlier = (item: String): number => {
  const code = item.charCodeAt(0);
  const capMin = "A".charCodeAt(0); // 65
  const lowMin = "a".charCodeAt(0); // 97
  if (code < lowMin) return code - capMin + 27;

  return code - lowMin + 1;
};

const s3: Solver = (config) => {
  const sacks = parseInput(3, parseFileBy("\n"), splitSacks, config);

  // one
  const one = sacks.reduce((acc, sack) => {
    const outlier = findOutlier(sack);
    return acc + scoreOutlier(outlier);
  }, 0);

  // two
  const two = sacks.reduce((acc, _, i) => {
    if (i % 3 === 0) {
      return acc + scoreOutlier(findTriplicateItem(sacks.slice(i, i + 3)));
    }
    return acc;
  }, 0);

  return [one, two];
};

export default s3;
