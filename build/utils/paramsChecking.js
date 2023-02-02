"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsChecking = void 0;
const arrays_1 = require("./arrays");
const paramsChecking = (imgquery) => {
    const HightAndWidth = [
        Number(imgquery.width),
        Number(imgquery.height),
    ];
    const keysOfParams = Object.keys(imgquery);
    // check if all 3 parameters are set in the URL
    const params = ["filename", "width", "height"];
    // If all required parameters (params) are included in the query (keysOfParams) and if width and height are both numeric check if there is
    return (0, arrays_1.theArrayItems)(params, keysOfParams) && (0, arrays_1.isArrayNumbers)(HightAndWidth);
};
exports.paramsChecking = paramsChecking;
