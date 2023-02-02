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
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3000; // Default port
exports.port = port;
// Adding Routes
app.use("/api", logger_1.default, index_1.routes);
app.get("/api", logger_1.default, (_req, res) => {
    res.send("API endpoint");
});
app.get("/", logger_1.default, (_req, res) => {
    res.send("Main Api");
});
// Starting Server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server Running at: localhost:${port}`);
}));
