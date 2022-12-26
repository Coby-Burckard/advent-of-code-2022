import { Command } from "commander";
import { Config } from "./types";
import { DaysType, solverMap as solvers } from "./utils";

const cli = new Command();

cli
  .name("Advent of code 2022")
  .description("CLI for parsing and solving AOC days")
  .version("0.1.0");

cli
  .command("solve")
  .description("solves the specified day")
  .argument("<day>")
  .option("-t --test")
  .action((day, options) => {
    const config: Config = { isTest: options.test };

    if (Object.keys(solvers).includes(day)) {
      return console.log(solvers[Number(day) as DaysType](config));
    }

    return console.log("No solver found for ", day);
  });

cli.parse();
