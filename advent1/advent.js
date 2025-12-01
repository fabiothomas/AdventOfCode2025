"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var content = fs.readFileSync("advent.txt", "utf-8");
var state = 50;
var zerosLanded = 0;
var zerosPassed = 0;
var correction = 0;
var zerorsFound = function () { return zerosLanded + zerosPassed + correction; };
// apply rotation
var rotate = function (dir, state, add) { return add * (dir === 'L' ? -1 : 1) + state; };
// read rotation
var execute = function (step, state) { return rotate(step[0], state, parseInt(step.slice(1))); };
// module
var modWithTracking = function (n, i) {
    if (i === void 0) { i = 0; }
    return (0 <= n && n < 100) ? { value: n, iterations: i } : modWithTracking(n < 0 ? n + 100 : n - 100, i + 1);
};
// get correction
var getCorrection = function (oldState, newState) { return oldState === 0 && newState < 0 ? -1 : newState > 0 && newState % 100 === 0 ? -1 : 0; };
content.split("\n").forEach(function (line) {
    var oldState = state;
    state = execute(line, state);
    correction += getCorrection(oldState, state);
    var result = modWithTracking(state);
    state = result.value;
    zerosPassed += result.iterations;
    if (state === 0)
        zerosLanded += 1;
});
console.log("Final state: ".concat(state));
console.log("Zeros landed: ".concat(zerosLanded));
console.log("Zeros found: ".concat(zerorsFound(), " times"));
