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
const sharp_1 = __importDefault(require("sharp"));
const imageResize = (fileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const imagePath = `./Images/full/${fileName}.jpg`;
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const outputPath = `./Images/thumb/${fileName}-${width}-${height}.jpg`;
    if ((isNaN(parseInt(width)) && isNaN(parseInt(height))) || fileName) {
        console.log("Please check your input");
    }
    else {
        yield (0, sharp_1.default)(imagePath)
            .resize(parseInt(width), parseInt(height))
            .toFile(outputPath);
    }
});
exports.default = imageResize;
