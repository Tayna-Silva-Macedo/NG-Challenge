"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerRoute_1 = __importDefault(require("./registerRoute"));
const loginRoute_1 = __importDefault(require("./loginRoute"));
const balanceRoute_1 = __importDefault(require("./balanceRoute"));
const transactionRoute_1 = __importDefault(require("./transactionRoute"));
exports.default = { register: registerRoute_1.default, login: loginRoute_1.default, balance: balanceRoute_1.default, transaction: transactionRoute_1.default };
