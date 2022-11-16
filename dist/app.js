"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const error_1 = __importDefault(require("./middlewares/error"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Express + TypeScript');
});
app.use('/register', routes_1.default.register);
app.use('/login', routes_1.default.login);
app.use('/balance', routes_1.default.balance);
app.use('/transaction', routes_1.default.transaction);
app.use(error_1.default);
exports.default = app;
