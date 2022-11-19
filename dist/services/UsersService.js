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
const Bcryptjs_1 = __importDefault(require("../helpers/Bcryptjs"));
const HttpException_1 = __importDefault(require("../helpers/HttpException"));
const Token_1 = __importDefault(require("../helpers/Token"));
class UsersService {
    constructor(usersModel, accountsModel) {
        this.usersModel = usersModel;
        this.accountsModel = accountsModel;
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({ where: { username } });
            return user;
        });
    }
    validateUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (username.length < 3) {
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'username must be at least 3 characters');
            }
            const user = yield this.findByUsername(username);
            if (user) {
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'user already registered');
            }
        });
    }
    static validatePassword(password) {
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regexPassword.test(password)) {
            throw new HttpException_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'invalid password');
        }
    }
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            UsersService.validatePassword(obj.password);
            yield this.validateUsername(obj.username);
            const newAccount = yield this.accountsModel.create({ balance: 100 });
            const accountId = newAccount.id;
            const passwordHash = Bcryptjs_1.default.generate(obj.password);
            const newUser = yield this.usersModel.create({
                username: obj.username,
                password: passwordHash,
                accountId,
            });
            return newUser;
        });
    }
    login(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByUsername(obj.username);
            if (!user || !Bcryptjs_1.default.compare(obj.password, user.password)) {
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'incorrect email or password');
            }
            const payload = {
                id: user.id,
                username: user.username,
                accountId: user.accountId,
            };
            const token = Token_1.default.create(payload);
            return token;
        });
    }
}
exports.default = UsersService;
