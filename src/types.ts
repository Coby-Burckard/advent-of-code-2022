export type Config = {
  isTest: boolean;
};

export type Solver = (config?: Config) => Array<string | number>;
