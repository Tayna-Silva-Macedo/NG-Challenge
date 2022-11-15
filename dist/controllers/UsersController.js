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
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.usersService.create(req.body);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(newUser);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = yield this.usersService.login(req.body);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ token });
        });
    }
}
exports.default = UsersController;
