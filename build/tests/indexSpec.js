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
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
const processingImages_1 = require("../routes/api/processingImages");
const request = (0, supertest_1.default)(index_1.app);
describe("Port test", () => {
    let server;
    beforeEach((done) => {
        server = index_1.app.listen(5500, () => {
            done();
        });
    });
    afterEach((done) => {
        server.close(done);
    });
    it("should return 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get("/");
        expect(response.status).toEqual(200);
    }));
});
describe("Testing The Endpoint", () => {
    it("Get the api/images endpoint and return a 404 error if the parameter is not set", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get("/api/images");
        expect(response.status).toBe(404);
    }));
    it("gets Response 200 if valid input arguments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=500&height=500");
        expect(response.status).toBe(200);
    }));
    it("returns 404 for invalid endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/foo");
        expect(response.status).toBe(404);
    }));
});
describe("Testing The Image Processing Function", () => {
    const filename = "encenadaport";
    const width = 300;
    const height = 300;
    it("Resize the image if the correct input parameters are specified in the URL", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
        expect(response.status).toBe(200);
    }));
    it("Returns an error if the image to process does not exist or if an incorrect image name is entered.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/images?filename=wrongname&width=${width}&height=${height}`);
        expect(response.status).toBe(404);
    }));
    it("Returns an appropriate error message if the height or width is entered incorrectly", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/images?filename=${filename}&width=Wrongentry&height=Wrongentry`);
        expect(response.status).toBe(404);
    }));
});
describe("processingImages1", () => {
    const filename = "encenadaport";
    const height = 100;
    const width = 200;
    it("processes an image and returns the output file path", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, processingImages_1.imageFunction1)(filename, height, width);
        expect(result).toBe(path_1.default.resolve(__dirname, "../Images/thumb", `${filename}-${width}-${height}.jpg`));
    }));
});
describe("processingImages2", () => {
    const filename = "encenadaport";
    it("processes an image and returns the output file path", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, processingImages_1.imageFunction2)(filename);
        expect(result).toBe(path_1.default.resolve(__dirname, "../Images/thumb", `${filename}.jpg`));
    }));
});
