import * as fs from "fs";

const content = fs.readFileSync("advent.txt", "utf-8");

let total = 0;

const blacklist = ["", "\r", "\n", " ", "  ", "   ", "    "];

// gets a list of all numbers or charachters in a line
const listFromLine = (line: string): string[] => 
    line.split(" ").filter(char => !blacklist.includes(char));

// gets a list of all elements at a specific position in each given list
const elementsAtPosition = (lists: string[][], position: number): number[] => 
    lists.map(list => Number(list[position]));

// loops over every position in the lists
const getListsByPosition = (lists: string[][], i = 0): number[][] => 
    i >= lists[0].length ? [] : 
    [elementsAtPosition(lists, i), ...getListsByPosition(lists, i + 1)];

// performs the operations on the lists
const performOperations = (list: number[], operation: string): number => 
    list.reduce((acc, curr) => 
        operation === "+" ? acc + curr :
        operation === "*" ? acc * curr :
        acc, operation === "*" ? 1 : 0);

// performs operation on each position list
const performAllOperations = (listsByPosition: number[][], operations: string[]): number[] => 
    listsByPosition.map((list, i) => performOperations(list, operations[i]));

let lists = content.split("\n").map(line => listFromLine(line));
let operationList = lists[lists.length - 1];
lists = lists.slice(0, lists.length - 1);
let nlists = getListsByPosition(lists);

total = performOperations(performAllOperations(nlists, operationList), "+");

console.log(`Total: ${total}`);