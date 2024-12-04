import { solve } from '../utils/typescript';

type Input = [string, number, number][];

function parser(input: string): Input {
  const matches = input.matchAll(/(mul|do|don't)\((\d*),?(\d*)\)/g);
  return [...matches].map(([_, op, n1, n2]) => [op, Number(n1), Number(n2)]);
}

function part1(input: Input) {
  const muls = input.filter(([op]) => op === 'mul');
  return muls.reduce((acc, [_, n1, n2]) => acc + n1 * n2, 0);
}

function part2(input: Input) {
  return input.reduce(
    ([n, doing], [op, n1, n2]) =>
      op === 'mul' ? [n + n1 * n2, doing] : [n, op === 'do'],
    [0, false] as [number, boolean],
  )[0];
}

solve({ part1, test1: 161, part2, test2: 48, parser });
