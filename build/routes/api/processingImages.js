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
exports.imageFunction2 = exports.imageFunction1 = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const imageFunction1 = (filename, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    const inputImage = path_1.default.resolve(__dirname, "../../Images/full", `${filename}.jpg`);
    const outputImageFolder = path_1.default.resolve(__dirname, "../../Images/thumb");
    const outputImage = path_1.default.resolve(outputImageFolder, `${filename}-${width}-${height}.jpg`);
    if (!fs_1.default.existsSync(outputImageFolder)) {
        yield fs_2.promises.mkdir(outputImageFolder, { recursive: true });
    }
    try {
        yield (0, sharp_1.default)(inputImage).resize(width, height).toFile(outputImage);
        return outputImage;
    }
    catch (error) {
        console.error(error);
        return "Error processing image";
    }
});
exports.imageFunction1 = imageFunction1;
const imageFunction2 = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const inputImage = path_1.default.resolve(__dirname, "../../Images/full", `${filename}.jpg`);
    const outputImageFolder = path_1.default.resolve(__dirname, "../../Images/thumb");
    const outputImage = path_1.default.resolve(outputImageFolder, `${filename}.jpg`);
    if (!fs_1.default.existsSync(outputImageFolder)) {
        yield fs_2.promises.mkdir(outputImageFolder, { recursive: true });
    }
    try {
        yield (0, sharp_1.default)(inputImage).toFile(outputImage);
        return outputImage;
    }
    catch (error) {
        console.error(error);
        return "Error processing image";
    }
});
exports.imageFunction2 = imageFunction2;
