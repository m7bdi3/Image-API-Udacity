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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
// resize the image to the width and height specified by the parameters
const processingImages = (filename, height, width
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => __awaiter(void 0, void 0, void 0, function* () {
    const inputImage = path_1.default.join(__dirname, "../", "../", "Images/", "full/", filename) + ".jpg";
    const outputImageFolder = path_1.default.join(__dirname, "../", "../", "Images/", "thumb/");
    const outputImage = path_1.default.join(__dirname, "../", "../", "Images/", "thumb/", filename) +
        `-${width}-${height}.jpg`;
    // Create the image output folder if it does not exist
    if (!fs_2.default.existsSync(outputImageFolder)) {
        yield fs_1.promises.mkdir(outputImageFolder);
    }
    try {
        // await for sharp to process the image and return outputImage if successful
        yield (0, sharp_1.default)(inputImage).resize(width, height).toFile(outputImage);
        return outputImage;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // otherwise an error is returned
        return error;
    }
});
exports.default = processingImages;
