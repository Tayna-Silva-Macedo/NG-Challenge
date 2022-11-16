"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionsController_1 = __importDefault(require("../../controllers/TransactionsController"));
const Account_1 = __importDefault(require("../../database/models/Account"));
const Transaction_1 = __importDefault(require("../../database/models/Transaction"));
const User_1 = __importDefault(require("../../database/models/User"));
const TransactionsService_1 = __importDefault(require("../../services/TransactionsService"));
const transactionsController = () => {
    const transactionsService = new TransactionsService_1.default(Transaction_1.default, Account_1.default, User_1.default);
    return new TransactionsController_1.default(transactionsService);
};
exports.default = transactionsController();
