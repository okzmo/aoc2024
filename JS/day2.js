import { readFile } from "./utils.js";

const lines = await readFile("day2.txt")

function strictlyAscending(nums) {
  return nums.every((nb, i) => i === 0 || nb > nums[i - 1])
}

function strictlyDescending(nums) {
  return nums.every((nb, i) => i === 0 || nb < nums[i - 1])
}

function checkDiff(nums) {
  return nums.every((nb, i) => {
    if (i === 0) return true;
    const diff = Math.abs(nb - nums[i-1]);
    return diff >= 1 && diff <= 3;
  })
}

function checkArr(nums) {
  return (strictlyAscending(nums) || strictlyDescending(nums)) && checkDiff(nums)
}

function day2(input) {
  const ans = new Array(input.length).fill(false);

  input.forEach((l, iLine) => {
    const nums = l.split(" ").map(Number);
    if (checkArr(nums)) {
      ans[iLine] = true
    } else {
      ans[iLine] = false
    }
  })

  return "PART1:"+ ans.filter(v => v).length
}
console.log(day2(lines));

function day2part2(input) {
  const ans = new Array(input.length).fill(false);

  for (let i = 0; i < input.length; ++i) {
    const nums = input[i].split(" ").map(Number);

    if (checkArr(nums)) {
      ans[i] = true;
    }

    for (let j = 0; j < nums.length; ++j) {
      const copy = [...nums];
      delete copy[j];

      if (checkArr(copy.filter(Number))) {
        ans[i] = true;
        break;
      }
    }
  }

  return "PART1:"+ ans.filter(v => v).length
}
console.log(day2part2(lines));
