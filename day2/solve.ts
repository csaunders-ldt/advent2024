import { solve } from '../utils/typescript';

type Input = number[][];

function parser(input: string): Input {
  return input.split('\n').map((l) => l.split(' ').map(Number));
}

function isBad(value: number, other: number, increasing: boolean) {
  const diff = Math.abs(value - other);
  if (diff > 3 || diff === 0) return true;
  return value > other !== increasing;
}

function isSafeLevel(line: number[], hasLife = false) {
  if (hasLife && isSafeLevel(line.slice(1))) return true;

  for (let i = 1; i < line.length; i++) {
    if (!isBad(line[i], line[i - 1], line[1] > line[0])) continue;
    if (!hasLife) return false;

    const thisLine = line.filter((_, j) => j !== i);
    const prevLine = line.filter((_, j) => j !== i - 1);
    return isSafeLevel(thisLine) || isSafeLevel(prevLine);
  }
  return true;
}

function part1(input: Input) {
  return input.filter((l) => isSafeLevel(l)).length;
}

function part2(input: Input) {
  return input.filter((l) => isSafeLevel(l, true)).length;
}

solve({ part1, test1: 2, part2, test2: 4, parser });
