import * as fs from "fs";

const content = fs.readFileSync("advent.txt", "utf-8").split("\r\n\r\n");
const ranges: string[] = content[0].split("\r\n");
const ids: number[] = content[1].split("\r\n").map(Number);

let setResults: number = 0;
let allResults: number = 0;

const range1 = (range: string) => range.split("-").map(Number)[0];
const range2 = (range: string) => range.split("-").map(Number)[1];

// for each range check if id falls within it
const checkInRange = (ranges: string[], id: number, i = 0): boolean => 
    i >= ranges.length ? false :
    id >= range1(ranges[i]) && id <= range2(ranges[i]) ? true :
    checkInRange(ranges, id, i + 1);

// find all ids within the list
const getForAllIds = (ranges: string[], i = 0, cache: number[] = []): number =>
    i >= ranges.length ? 0 :
    isSubset(ranges.slice(i+1, ranges.length), ranges[i]) ? getForAllIds(ranges, i + 1, cache) :
    getForAllIds(filterRanges(ranges, range1(ranges[i]), range2(ranges[i])), i + 1) + numCountInRange(range1(ranges[i]), range2(ranges[i]), cache);

// get all ids within range without duplicates
const numCountInRange = (id: number, until: number, cache: number[]): number => 
    id > until ? 0 : until - id + 1;

// check if range is subset of another range
const isSubset = (ranges: string[], range: string): boolean =>
    ranges.some(r => range1(range) >= range1(r) && range2(range) <= range2(r));

// filter each range to no longer include already counted ids
const filterRanges = (ranges: string[], low: number, high: number): string[] =>
    ranges.map(range => `${
        range1(range) >= low && range1(range) <= high ? Math.max(range1(range), high+1) : range1(range)
    }-${
        range2(range) >= low && range2(range) <= high ? Math.min(range2(range), low-1) : range2(range)
    }`);

ids.forEach(line => {
    setResults += checkInRange(ranges, line) ? 1 : 0;
});

allResults = getForAllIds(ranges);

console.log(`Fresh items found: ${setResults}`);
console.log(`Total fresh items: ${allResults}`);