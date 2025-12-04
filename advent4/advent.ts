import * as fs from "fs";

const content = fs.readFileSync("advent.txt", "utf-8");

const offsets: number[] = [-1, 0, 1];

let totalReachable: number = 0;

// check if specific char in string is '@'
const checkCharAt = (str: string, index: number): boolean => 
    index >= str.length ? false : str[index] === '@';

// set specific char in string
const removeCharAt = (str: string, index: number): string => 
    index >= str.length ? str : str.substring(0, index) + '.' + str.substring(index + 1);

// check all '@'s around a specific position (minus 1 assuming the center is also '@')
const checkSurrounding = (previousLine: string, line: string, nextLine: string, pos: number, i = 0, found = 0): number => 
    i >= offsets.length ? found - 1 :
    checkSurrounding(previousLine, line, nextLine, pos, i + 1, found +
        (checkCharAt(line, pos + offsets[i]) ? 1 : 0 ) +
        (checkCharAt(previousLine, pos + offsets[i]) ? 1 : 0) +
        (checkCharAt(nextLine, pos + offsets[i]) ? 1 : 0)
    );

// scan an entire line
const scanLine = (previousLine: string, line: string, nextLine: string, pos: number = 0, total: number[] = []): number[] =>
    pos >= line.length ? total :
    scanLine(previousLine, line, nextLine, pos + 1, checkCharAt(line, pos) && checkSurrounding(previousLine, line, nextLine, pos, 0) < 4 ? [...total, pos] : total);

let lines = content.split("\n");
while (true) {
    let total = 0;
    let nextLines: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        const previousLine = i === 0 ? '' : lines[i - 1];
        const line = lines[i];
        const nextLine = i === lines.length - 1 ? '' : lines[i + 1];
        let result = scanLine(previousLine, line, nextLine);
        total += result.length;
        nextLines[i] = result.reduce((acc, pos) => removeCharAt(acc, pos), line);
    }

    console.log(`Reachable this round: ${total}`);
    if (total === 0) break;
    totalReachable += total;
    lines = nextLines;
}

console.log(`Total reachable: ${totalReachable}`);