"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersController_1 = __importDefault(require("../../controllers/UsersController"));
const Account_1 = __importDefault(require("../../database/models/Account"));
const User_1 = __importDefault(require("../../database/models/User"));
const UsersService_1 = __importDefault(require("../../services/UsersService"));
const usersController = () => {
    const usersService = new UsersService_1.default(User_1.default, Account_1.default);
    return new UsersController_1.default(usersService);
};
exports.default = usersController();
