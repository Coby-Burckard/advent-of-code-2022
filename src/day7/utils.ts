// unparsed commands
export const checkCommand = (command: string) => (line: string) =>
  command === line.slice(0, command.length);
export const isLs = checkCommand("ls");
export const isCd = checkCommand("cd");
