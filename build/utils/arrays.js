"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayNumbers = exports.theArrayItems = void 0;
// Checks if all elements of an array (item) are in another array (arr)
const theArrayItems = (arr, items) => {
    return arr.every((item) => items.indexOf(item) !== -1);
};
exports.theArrayItems = theArrayItems;
// Checks if all elements of an array are numbers
const isArrayNumbers = (arr) => {
    return arr.every((item) => Number.isInteger(item));
};
exports.isArrayNumbers = isArrayNumbers;
