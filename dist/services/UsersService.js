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
const http_status_codes_1 = require("http-status-codes");
const HttpException_1 = __importDefault(require("../helpers/HttpException"));
class UsersService {
    constructor(usersModel, accountsService) {
        this.usersModel = usersModel;
        this.accountsService = accountsService;
    }
    static validUsername(username) {
        if (username.length < 3)
            throw new HttpException_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'username must be at least 3 characters');
    }
    static validPassword(password) {
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regexPassword.test(password))
            throw new HttpException_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'invalid password');
    }
    usernameExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({ where: { username } });
            if (user)
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'user already registered');
        });
    }
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            UsersService.validUsername(obj.username);
            UsersService.validPassword(obj.password);
            yield this.usernameExists(obj.username);
            const accountId = yield this.accountsService.create();
            const newUser = yield this.usersModel.create({
                username: obj.username,
                password: obj.password,
                accountId,
            });
            return newUser;
        });
    }
}
exports.default = UsersService;
