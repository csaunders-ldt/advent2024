import { sortBy } from 'lodash';
import { solve } from '../utils/typescript';

type Input = {
  maps: Record<string, string[]>;
  pages: string[][];
  sortedPages: string[][];
};

function parser(input: string): Input {
  const [mapLines, pageLines] = input.split('\n\n');
  const maps: Record<string, string[]> = {};
  mapLines.split('\n').forEach((l) => {
    const [k, v] = l.split('|');
    (maps[k] ??= []).push(v);
  });
  const pages = pageLines.split('\n').map((l) => l.split(','));

  const sortedPages = pages.map((page) =>
    page.sort((a, b) => {
      if (maps[a]?.includes(b)) return -1;
      if (maps[b]?.includes(a)) return 1;
      return 0;
    }),
  );

  return { maps, pages, sortedPages };
}

function part1(input: Input) {
  console.log(input.sortedPages);
  return -1;
}

function part2(input: Input) {
  return -1;
}

solve({ part1, test1: 143, part2, test2: 5, parser });
