"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const HttpException_1 = __importDefault(require("../helpers/HttpException"));
const Token_1 = __importDefault(require("../helpers/Token"));
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        throw new HttpException_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token not found');
    try {
        const payload = Token_1.default.validate(authorization);
        res.locals = payload;
        next();
    }
    catch (error) {
        throw new HttpException_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
};
exports.default = auth;
