import * as fs from "fs";

const content = fs.readFileSync("advent.txt", "utf-8");

let state: number = 50;
let zerosLanded: number = 0;
let zerosPassed: number = 0;

interface ModResult {
    value: number;
    iterations: number;
}
// get total zeros found
const zerosFound = () => zerosLanded + zerosPassed;

// apply rotation to given state
const rotate = (dir: string, state: number, add: number) => add * (dir === 'L' ? -1 : 1) + state;

// read rotation from specific notation and execute
const execute = (step: string, state: number) => rotate(step[0], state, parseInt(step.slice(1)));

// modulo with tracking of iterations
const modWithTracking = (n: number, i = 0): ModResult => (0 <= n && n < 100) ? { value: n, iterations: i } : modWithTracking(n < 0 ? n + 100 : n - 100, i + 1);

// get correction for zeros passed based on specific edge cases
const getCorrection = (oldState: number, newState: number) => oldState === 0 && newState < 0 ? -1 : newState > 0 && newState % 100 === 0 ? -1 : 0;

content.split("\n").forEach(line => {
    let oldState = state;
    state = execute(line, state);

    let result = modWithTracking(state);
    zerosPassed += result.iterations + getCorrection(oldState, state);
    state = result.value;

    if (state === 0) zerosLanded += 1;
});

console.log(`Final state: ${state}`);
console.log(`Zeros landed: ${zerosLanded}`);
console.log(`Zeros found: ${zerosFound()}`);