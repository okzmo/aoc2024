import fs from "fs";
import readline from "readline";
import path from 'path';


export async function readFile(filename) {
  const lines = [];
  const stream = fs.createReadStream(path.resolve(process.cwd(), filename));
  const rl = readline.createInterface({ input: stream });

  for await (const l of rl) {
    lines.push(l)
  }

  return lines
}
