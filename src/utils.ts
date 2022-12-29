import S1 from "./day1/";
import S2 from "./day2/";
import S3 from "./day3/";
import S4 from "./day4";
import * as fs from "fs";
import { Config, Solver } from "./types";
import S5 from "./day5";
import S6 from "./day6";
import { S7 } from "./day7";

export type DaysType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const solverMap: {
  [k in DaysType]: Solver;
} = {
  1: S1,
  2: S2,
  3: S3,
  4: S4,
  5: S5,
  6: S6,
  7: S7,
};

export const mapLinesToNumbers = (lines: string[]) => lines.map(Number);

export const parseLinesBy = (lines: string[]) =>
  lines.map((line) => line.split("\n"));

export const parseFileBy =
  (parser = "\n\n") =>
  (inp: string) =>
    inp.split(parser);

type ParseInputType = <R>(
  d: DaysType,
  fp: (f: string) => string[],
  lp: (ls: string[]) => R[],
  config?: Config
) => R[];

export const parseInput: ParseInputType = (
  dayNumber,
  fileParser,
  lineParser,
  config
) => {
  const file = fs.readFileSync(
    `src/day${dayNumber}/${config?.isTest ? "test" : "input"}.txt`,
    "utf-8"
  );
  return lineParser(fileParser(file));
};
