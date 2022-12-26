import { Config, Solver } from "../types";
import { parseFileBy, parseInput } from "../utils";

const DAPAPER = 2;

const parseLine = (lines: string[]) => lines.map((line) => line.split(" "));

enum OpponentAction {
  ROCK = "A",
  PAPER = "B",
  SCISSORS = "C",
}

enum SelfAction {
  ROCK = "X",
  PAPER = "Y",
  SCISSORS = "Z",
}

enum Outcomes {
  LOSE = "X",
  DRAW = "Y",
  WIN = "Z",
}

const scoreByAction: {
  [k in SelfAction]: number;
} = {
  [SelfAction.ROCK]: 1,
  [SelfAction.PAPER]: 2,
  [SelfAction.SCISSORS]: 3,
};

const scoreByOutcome: {
  [k in Outcomes]: number;
} = {
  [Outcomes.WIN]: 6,
  [Outcomes.DRAW]: 3,
  [Outcomes.LOSE]: 0,
};

const scoreRoundp1 = (actions: [OpponentAction, SelfAction]) => {
  const [oppAction, action] = actions;
  const actionScore = scoreByAction[action];
  const isRockScissors =
    action === SelfAction.ROCK && oppAction === OpponentAction.SCISSORS;
  const isPaperRock =
    action === SelfAction.PAPER && oppAction === OpponentAction.ROCK;
  const isScissorsPaper =
    action === SelfAction.SCISSORS && oppAction === OpponentAction.PAPER;

  if (isPaperRock || isRockScissors || isScissorsPaper) {
    return actionScore + scoreByOutcome[Outcomes.WIN];
  }

  const isScissorsRock =
    action === SelfAction.SCISSORS && oppAction === OpponentAction.ROCK;
  const isRockPaper =
    action === SelfAction.ROCK && oppAction === OpponentAction.PAPER;
  const isPaperScissors =
    action === SelfAction.PAPER && oppAction === OpponentAction.SCISSORS;

  if (isScissorsRock || isRockPaper || isPaperScissors) {
    return actionScore + scoreByOutcome[Outcomes.LOSE];
  }

  return actionScore + scoreByOutcome[Outcomes.DRAW];
};

const scoreRoundp2 = (actions: [OpponentAction, Outcomes]) => {
  const [oppAction, result] = actions;

  if (oppAction === OpponentAction.PAPER) {
    const lookup = {
      [Outcomes.WIN]: scoreByAction[SelfAction.SCISSORS],
      [Outcomes.LOSE]: scoreByAction[SelfAction.ROCK],
      [Outcomes.DRAW]: scoreByAction[SelfAction.PAPER],
    };

    return scoreByOutcome[result] + lookup[result];
  }

  if (oppAction === OpponentAction.ROCK) {
    const lookup = {
      [Outcomes.WIN]: scoreByAction[SelfAction.PAPER],
      [Outcomes.LOSE]: scoreByAction[SelfAction.SCISSORS],
      [Outcomes.DRAW]: scoreByAction[SelfAction.ROCK],
    };

    return scoreByOutcome[result] + lookup[result];
  }

  if (oppAction === OpponentAction.SCISSORS) {
    const lookup = {
      [Outcomes.WIN]: scoreByAction[SelfAction.ROCK],
      [Outcomes.LOSE]: scoreByAction[SelfAction.PAPER],
      [Outcomes.DRAW]: scoreByAction[SelfAction.SCISSORS],
    };

    return scoreByOutcome[result] + lookup[result];
  }

  return 0;
};

const s2: Solver = (config) => {
  const input = parseInput(DAPAPER, parseFileBy("\n"), parseLine, config);

  const rounds = input as Array<[OpponentAction, SelfAction]>;

  const sum1 = rounds.reduce((acc, round) => acc + scoreRoundp1(round), 0);

  const p2Rounds = input as Array<[OpponentAction, Outcomes]>;

  const sum2 = p2Rounds.reduce((acc, round) => acc + scoreRoundp2(round), 0);

  return [sum1, sum2];
};

export default s2;
