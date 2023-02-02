"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const SharpResize_1 = __importDefault(require("./SharpResize"));
const process = (req, res, 
// eslint-disable-next-line @typescript-eslint/ban-types
next) => __awaiter(void 0, void 0, void 0, function* () {
    const widthValue = req.query.width;
    const heightValue = req.query.height;
    const nameFileValue = req.query.namefile;
    const outputDir = `./Images/thumb`;
    const outputFile = `./Images/thumb/${nameFileValue}-${widthValue}-${heightValue}.jpg`;
    const createDir = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fs_1.promises.mkdir(outputDir);
    });
    const process = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, SharpResize_1.default)(nameFileValue, widthValue, heightValue);
        }
        catch (_a) {
            res.send(console.error());
        }
    });
    if (fs_2.default.existsSync(outputFile)) {
        return outputFile;
    }
    else if (fs_2.default.existsSync(outputDir)) {
        yield process();
    }
    else {
        createDir();
        yield process();
    }
    next();
});
exports.default = process;
