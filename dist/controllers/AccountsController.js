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
class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
        this.findBalanceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.accountsService.findBalanceById(res.locals.accountId);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ balance });
        });
    }
}
exports.default = AccountsController;
