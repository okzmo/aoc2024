import { readFile } from "./utils.js";

const lines = await readFile("day5.txt")

function day5(input) {
  const pages = {};
  const sequences = [];
  let ans1 = 0;
  let ans2 = 0;

  for (const l of input) {
    if (l.match(/\d+\|\d+/g)) {
      const s = l.split("|");
      pages[[s[0],s[1]]] = true
    } else if (l !== "") {
      const s = l.split(",");
      sequences.push(s.map(Number))
    }
  }

  for (const seq of sequences) {
    let changed = true;
    let everchanged = false;
    while (changed) {
      changed = false;
      for (let i = 0; i < seq.length; ++i) {
        for (let j = i+1; j < seq.length; ++j) {
          if (pages[[seq[j], seq[i]]]) {
            changed = true;
            everchanged = true;
            const tmp = seq[j];
            seq[j] = seq[i];
            seq[i] = tmp
          }
        }
      }
    }
    if (everchanged) ans2 += Number(seq[Math.floor(seq.length/2)])
    else ans1 += Number(seq[Math.floor(seq.length/2)])
  }

  return [ans1, ans2];
}
console.log(day5(lines))
