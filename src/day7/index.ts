import { Solver } from "../types";
import { parseFileBy, parseInput } from "../utils";
import { isCd, isLs } from "./utils";

const DEFAULT_SIZE = 0;

class Node {
  size: number;
  name: string;
  parent: Dir | null;

  constructor(name: string, size: number, parent: Dir | null) {
    (this.size = size), (this.name = name), (this.parent = parent);
  }
}

type Children = Array<Node | Dir>;

class Dir extends Node {
  children: Children;

  constructor(
    name: string,
    size: number,
    parent: Dir | null,
    children: Children
  ) {
    super(name, size, parent);
    this.children = children;
  }

  calcSize() {
    // if size has already been calculated
    if (this.size !== DEFAULT_SIZE) return this.size;

    // loop through children and sum
    this.size = this.children.reduce(
      (acc, child) =>
        acc + (child instanceof Dir ? child.calcSize() : child.size),
      0
    );

    return this.size;
  }

  countChildrenBelowSize(maxSize: number): number {
    return this.children.reduce(
      (acc, child) => {
        if (child instanceof Dir) {
          return acc + child.countChildrenBelowSize(maxSize);
        }
        return acc;
      },
      this.size <= maxSize ? this.size : 0
    );
  }

  findSmallestDirAboveThreshold(minSize: number, currentMin: number): number {
    let localMin = this.size;
    for (const child of this.children) {
      if (child instanceof Dir && child.size >= minSize) {
        let childSmallest = child.findSmallestDirAboveThreshold(
          minSize,
          currentMin
        );
        localMin = childSmallest < localMin ? childSmallest : localMin;
      }
    }
    return localMin < currentMin ? localMin : currentMin;
  }
}

const buildFileTree = (expressions: string[]) => {
  /* 
    Possible commands
    - cd 
    - ls
  */

  const rootDir = new Dir("/", 0, null, []);
  let currentDir: Dir | null = rootDir;
  for (const expression of expressions) {
    // creating new directories or files
    if (isLs(expression) && currentDir !== null) {
      currentDir.children = expression
        .split("\n")
        .slice(1)
        .map((child: string) => {
          const [descriptor, name] = child.split(" ");
          if (descriptor === "dir")
            return new Dir(name, DEFAULT_SIZE, currentDir, []);

          return new Node(name, Number(descriptor), currentDir);
        });
    }
    // moving directories
    else if (isCd(expression) && currentDir !== null) {
      const destination = expression.split(" ")[1];
      if (destination === "..") {
        currentDir = currentDir.parent;
      }

      for (const child of currentDir?.children || []) {
        if (child instanceof Dir && destination === child.name)
          currentDir = child;
      }
    }
    // command not found
    else {
      console.log("Error no command for: ", expression);
    }
  }

  return rootDir;
};

export const S7: Solver = (config) => {
  const expressions = parseInput(
    7,
    parseFileBy("\n$ "),
    (lines) => lines.splice(1),
    config
  );

  const root = buildFileTree(expressions);
  root.calcSize();

  const freeSpaceNeeded = 30000000 - 70000000 + root.size;

  return [
    root.countChildrenBelowSize(100000),
    root.findSmallestDirAboveThreshold(freeSpaceNeeded, root.size),
  ];
};
