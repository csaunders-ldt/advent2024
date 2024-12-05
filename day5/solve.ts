import { floor, partition, sum } from 'lodash';
import { solve } from '../utils/typescript';

type Input = [unsorted: string[][], sorted: string[][]];

function parser(input: string): Input {
  const [mapLines, pageLines] = input.split('\n\n');
  const pairs = new Set(mapLines.split('\n'));
  const pages = pageLines.split('\n').map((l) => l.split(','));

  const sortedPages = pages.map((page) =>
    page.sort((a, b) => (pairs.has(`${a}|${b}`) ? -1 : 1)),
  );
  return partition(sortedPages, (p) => input.includes(p.join(',')));
}

function part1([unsorted, _]: Input) {
  return sum(unsorted.map((l) => +l[floor(l.length / 2)]));
}

function part2([_, sorted]: Input) {
  return sum(sorted.map((l) => +l[floor(l.length / 2)]));
}

solve({ part1, test1: 143, part2, test2: 123, parser });
