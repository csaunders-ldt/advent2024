import { range, sum, zip } from 'lodash';
import { solve } from '../utils/typescript';

type Grid = string[][];

function parser(input: string): Grid {
  return input.split('\n').map((l) => l.split(''));
}

function rotate(input: Grid) {
  return zip(...input.map((row) => row.reverse()));
}

function diagonal(input: Grid, x: number, y: number, len: number) {
  return range(len).map((i) => input[y + i]?.[x + i]);
}

function xmasPoints(input: Grid, x: number, y: number) {
  const points = input[y].slice(x, x + 4).join('') === 'XMAS' ? 1 : 0;
  return points + (diagonal(input, x, y, 4).join('') === 'XMAS' ? 1 : 0);
}

function masPoints(input: Grid, x: number, y: number): number {
  const myself = diagonal(input, x, y, 3).join('');
  const cross = range(3).map((i) => input[y + i]?.[x + 2 - i] ?? '');
  return myself === 'MAS' && cross.join('') === 'MAS' ? 1 : 0;
}

function sumPoints(input: Grid, fn: typeof masPoints): number[] {
  return range(input.length).flatMap((x) =>
    range(input[x].length).map((y) => fn(input, x, y)),
  );
}

function rotations(input: Grid) {
  return range(4).map(() => (input = rotate(input)));
}

function part1(input: Grid) {
  return sum(rotations(input).flatMap((grid) => sumPoints(grid, xmasPoints)));
}

function part2(input: Grid) {
  return sum(rotations(input).flatMap((grid) => sumPoints(grid, masPoints)));
}

solve({ part1, test1: 18, part2, test2: 9, parser });
