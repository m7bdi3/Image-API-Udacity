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
exports.pathFolder = exports.routes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const processingImages_1 = require("./api/processingImages");
const routes = express_1.default.Router();
exports.routes = routes;
class pathFolder {
}
exports.pathFolder = pathFolder;
pathFolder.imageFullDir = path_1.default.resolve("../../Images/full");
pathFolder.imageThumbDir = path_1.default.resolve("../../Images/thumb");
routes.get("/images", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = request.query.filename;
        const width = Number(request.query.width);
        const height = Number(request.query.height);
        const imageThumb1 = path_1.default.join(__dirname, "../", "../", "Images/", "thumb/", filename) + `-${width}-${height}.jpg`;
        const imageThumb2 = path_1.default.join(__dirname, "../", "../", "Images/", "thumb/", filename) + `jpg`;
        if (fs_1.default.existsSync(imageThumb1)) {
            response.sendFile(imageThumb1);
        }
        else {
            const imageProcess1 = yield (0, processingImages_1.imageFunction1)(filename, width, height);
            response.sendFile(imageProcess1);
        }
        if (fs_1.default.existsSync(imageThumb2)) {
            response.sendFile(imageThumb2);
        }
        else {
            const imageProcess2 = yield (0, processingImages_1.imageFunction2)(filename);
            response.sendFile(imageProcess2);
        }
    }
    catch (error) {
        response.status(404).send(`Error processing image: ${error}`);
    }
}));
