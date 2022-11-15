"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountsController_1 = __importDefault(require("../../controllers/AccountsController"));
const Account_1 = __importDefault(require("../../database/models/Account"));
const AccountsService_1 = __importDefault(require("../../services/AccountsService"));
const accountsController = () => {
    const accountsService = new AccountsService_1.default(Account_1.default);
    return new AccountsController_1.default(accountsService);
};
exports.default = accountsController();
