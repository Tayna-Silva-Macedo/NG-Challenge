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
class TransactionsService {
    constructor(transactionsModel, accountsModel, usersModel) {
        this.transactionsModel = transactionsModel;
        this.accountsModel = accountsModel;
        this.usersModel = usersModel;
    }
    static validUsername(usernameCashOut, usernameCashIn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (usernameCashIn === usernameCashOut) {
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'cannot transfer to self');
            }
        });
    }
    validbalance(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accountsModel.findByPk(id);
            if (!account) {
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'account not found');
            }
            const { balance } = account;
            if (balance < value) {
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'insufficient funds');
            }
        });
    }
    findIdCashIn(usernameCashIn) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({
                where: { username: usernameCashIn },
            });
            if (!user)
                throw new HttpException_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'user not found');
            return user.id;
        });
    }
    create(id, usernameCashOut, usernameCashIn, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TransactionsService.validUsername(usernameCashOut, usernameCashIn);
            yield this.validbalance(id, value);
            const idCashOut = id;
            const idCashIn = yield this.findIdCashIn(usernameCashIn);
            yield this.accountsModel.decrement({ balance: value }, { where: { id: idCashOut } });
            yield this.accountsModel.increment({ balance: value }, { where: { id: idCashIn } });
            const newTransaction = yield this.transactionsModel.create({
                debitedAccountId: idCashOut,
                creditedAccountId: idCashIn,
                value,
            });
            return newTransaction;
        });
    }
}
exports.default = TransactionsService;
