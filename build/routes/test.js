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
//Image processing API
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const router = express_1.default.Router();
// Image processing route
router.get("/:filename/:width/:height", (req, res) => {
    const { filename, width, height } = req.params;
    (0, sharp_1.default)(filename)
        .resize(parseInt(width), parseInt(height))
        .toBuffer()
        .then((data) => {
        res.type("image/png");
        res.send(data);
    })
        .catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
});
// Testing
// describe("Image processing API", () => {
//   it("should return an image with the given filename, width, and height", () => {
//     const filename = "avatar.png";
//     const width = 400;
//     const height = 200;
//     const expectedResult = {
//       imageData: "<binary data>",
//     };
//     sharp(filename)
//       .resize(width, height)
//       .toBuffer()
//       .then((data) => expect(data).toEqual(expectedResult.imageData));
//   });
// });
module.exports = router;
// Initialize the Express app
const app = (0, express_1.default)();
// Define the placeholder API route
app.get('/placeholder/:width/:height', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.params.width, 10);
    const height = parseInt(req.params.height, 10);
    // Create a placeholder image using the Sharp library
    const placeholderImage = (0, sharp_1.default)({
        create: {
            width,
            height,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    });
    // Set the response content type
    res.set('Content-Type', 'image/png');
    // Stream the placeholder image to the response
    placeholderImage.png().pipe(res);
}));
// Define the image resizing route
app.get('/image/:filename/:width/:height', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.filename;
    const width = parseInt(req.params.width, 10);
    const height = parseInt(req.params.height, 10);
    // Read the original image from storage
    const image = (0, sharp_1.default)(`./images/${filename}`);
    // Resize the image using the Sharp library
    const resizedImage = yield image.resize(width, height).toBuffer();
    // Set the response content type and send the resized image
    res.set('Content-Type', 'image/png');
    res.send(resizedImage);
}));
// Start the Express app
app.listen(3000, () => {
    console.log('API listening on port 3000!');
});
