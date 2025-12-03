import * as fs from "fs";

const content = fs.readFileSync("advent.txt", "utf-8");

let totalTwo: number = 0;
let totalTwelve: number = 0;

// insert value into array
const insertTo = (arr: number[], index: number, value: number): number[] => 
    arr.concat(Array(Math.max(index - arr.length - 1, 0)).fill(0)).slice(0, index-1).concat([value]);

// check if a specific digit should be used for any digit in the final number, starts at the minimum position
const checkDigitSize = (digit: number, position: number, size: number, results: number[]): number[] => 
    position > size ? results : 
    results.length <= position || digit > results[position] ? insertTo(results, position+1, digit) : 
    checkDigitSize(digit, position + 1, size, results);

// loop over every digit and see if it can be used
const findLargestNumberBySize = (num: number, rest: string, size: number, result: number[]): number => 
    rest === '' ? Number(checkDigitSize(num, size, size, result).join('')) :
    findLargestNumberBySize(Number(rest[0]), rest.slice(1), size, checkDigitSize(num, Math.max(size - rest.length, 1), size, result));

// setup function
const checkBySize = (id: string, size: number) => findLargestNumberBySize(Number(id[0]), id.slice(1), size, []);

content.split("\n").forEach(line => {
    totalTwo += checkBySize(BigInt(line).toString(), 2);
    totalTwelve += checkBySize(BigInt(line).toString(), 12);
});

console.log(`Total for  2 digits: ${totalTwo}`);
console.log(`Total for 12 digits: ${totalTwelve}`);