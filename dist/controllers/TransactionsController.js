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
class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newTransaction = yield this.transactionsService.create(res.locals.accountId, res.locals.username, req.body.username, req.body.value);
            return res.status(http_status_codes_1.StatusCodes.CREATED).json(newTransaction);
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.transactionsService.findAll(res.locals.accountId, req.query.date);
            return res.status(http_status_codes_1.StatusCodes.OK).json(transactions);
        });
        this.findCashOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.transactionsService.findCashOut(res.locals.accountId, req.query.date);
            return res.status(http_status_codes_1.StatusCodes.OK).json(transactions);
        });
        this.findCashIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.transactionsService.findCashIn(res.locals.accountId, req.query.date);
            return res.status(http_status_codes_1.StatusCodes.OK).json(transactions);
        });
    }
}
exports.default = TransactionsController;
