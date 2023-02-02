"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcess_1 = __importDefault(require("../../utils/imageProcess"));
const images = express_1.default.Router();
images.get("/", imageProcess_1.default, (req, res) => {
    const widthValue = req.query.width;
    const heightValue = req.query.height;
    const nameFileValue = req.query.namefile;
    const outputDir = `${nameFileValue}.jpg`;
    res.sendFile(outputDir, { root: "./Images/full/" });
});
exports.default = images;
