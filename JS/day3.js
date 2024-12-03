import { readFile } from "./utils.js";

const lines = await readFile("day3.txt")

const INPUT= "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

function day3(input) {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g
  const res = input.match(regex)
  let ans = 0;

  for (const func of res) {
    const numsStr = func.slice(4, func.length-1)
    const nums = numsStr.split(',')
    ans += nums[0] * nums[1];
  }

  return "PART1: " + ans;
}
console.log(day3(INPUT))

function day3part2(input) {
  const regex = /(?:do\(\)|don't\(\))|mul\(\d{1,3},\d{1,3}\)/g;
  let ans = 0;
  const res = input.match(regex)
  let enabled = true;

  for (let i = 0; i < res.length; ++i) {
    if (res[i] === "do()") {
      enabled = true;
    } else if (res[i] === "don't()") {
      enabled = false;
    } else if (enabled) {
      const [x, y] = res[i].match(/\d{1,3}/g).map(Number);
      ans += x * y;
    }
  }

  return "PART2: " + ans
}


console.log(day3part2(lines[0]))
