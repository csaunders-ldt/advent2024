import { reverse } from 'lodash';
import { solve } from '../utils/typescript';

type Input = number[];

function parser(input: string): Input {
  return input.split('').map(Number);
}

function part1(input: Input) {
  let leftIndex = 0;
  let rightIndex = input.length - 1;
  let score = 0;
  let block = 0;

  while (true) {
    score += (block / 2) * (leftIndex % 2 === 0 ? leftIndex : rightIndex);
    if (leftIndex % 2 === 1) {
      input[rightIndex] -= 1;
      if (input[rightIndex] === 0) {
        rightIndex -= 2;
      }
    }
    input[leftIndex] -= 1;
    while (input[leftIndex] === 0) {
      leftIndex += 1;
      if (leftIndex > rightIndex) {
        return score;
      }
    }
    block += 1;
  }
}

function part2(input: Input) {
  const memory = input.map((v, i) => ({
    size: v,
    free: i % 2 === 1,
    index: Math.floor(i / 2),
  }));

  memory.toReversed().forEach(({ size, index }, i) => {
    const newSlot = memory.find((v) => v.size > size && v.free);
    if (newSlot.index >= index) return;
    memory.splice(newSlot.index, 0, {
      size,
      free: false,
      index,
    });
    memory.splice(memory.length - i, 1);
  });
  console.log(memory);

  return -1;
}

solve({ part1, test1: 1928, part2, test2: 2858, parser });
