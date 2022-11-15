"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const http_status_codes_1 = require("http-status-codes");
const error_1 = __importDefault(require("./middlewares/error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Express + TypeScript');
});
app.use(error_1.default);
exports.default = app;
