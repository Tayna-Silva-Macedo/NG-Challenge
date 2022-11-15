"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersController_1 = __importDefault(require("../../controllers/UsersController"));
const Account_1 = __importDefault(require("../../database/models/Account"));
const User_1 = __importDefault(require("../../database/models/User"));
const AccountsService_1 = __importDefault(require("../../services/AccountsService"));
const UsersService_1 = __importDefault(require("../../services/UsersService"));
const usersController = () => {
    const accountsService = new AccountsService_1.default(Account_1.default);
    const usersService = new UsersService_1.default(User_1.default, accountsService);
    return new UsersController_1.default(usersService);
};
exports.default = usersController();
