import { readFile } from "./utils.js";

const lines = await readFile("day1.txt")

function day1(input) {
  const list1 = [];
  const list2 = [];
  let ans = 0;

  for (const l of input) {
    const [a, b] = l.split("  ")
    list1.push(Number(a))
    list2.push(Number(b))
  }

  list1.sort((a, b) => a - b)
  list2.sort((a, b) => a - b)

  for (let i = 0; i < list1.length; ++i) {
    ans += Math.abs(list1[i] - list2[i])
  }

  return "PART1:" + ans
}
console.log(day1(lines));

function day1part2(input) {
  const list1 = [];
  const list2 = [];
  let ans = 0;
  let appearances = {};

  for (const l of input) {
    const [a, b] = l.split("  ")
    list1.push(Number(a))
    list2.push(Number(b))
  }

  list2.forEach((val) => appearances[val] = (appearances[val] || 0) + 1)

  for (const nb of list1) {
    const nbAppearance = appearances[nb] || 0;
    ans += nb * nbAppearance;
  }

  return "PART2:" + ans
}
console.log(day1part2(lines));

