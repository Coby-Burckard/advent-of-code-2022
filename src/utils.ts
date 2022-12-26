import S1 from "./day1/";
import S2 from "./day2/";
import S3 from "./day3/";
import * as fs from "fs";
import { Config, Solver } from "./types";

export type DaysType = 1 | 2 | 3;

export const solverMap: {
  [k in DaysType]: Solver;
} = {
  1: S1,
  2: S2,
  3: S3,
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
