import * as fs from "fs";

const content = fs.readFileSync("advent.txt", "utf-8");

let invalidSum = 0;

// check if id is made of repeated parts
const checkInValid = (id: string, size: number, part: string): boolean => id.length < size ? true : id.slice(0, size) !== part ? false : checkInValid(id.slice(size), size, part);

content.split(",").forEach(line => {
    const [start, end] = line.split("-").map(x => parseInt(x));
    for (let i = start; i <= end; i++) {
        let text = i.toString();
        let result = false;
        for (let j = 1; j < text.length; j++) {
            if (text.length % j !== 0) continue;
            result = checkInValid(text, j, text.slice(0, j));
            if (result) break;
        }
        invalidSum += result ? i : 0;
    }
});

console.log(`Sum of invalid ids: ${invalidSum}`);