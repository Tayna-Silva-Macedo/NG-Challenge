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
const Account_1 = __importDefault(require("./Account"));
const User_1 = __importDefault(require("./User"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        where: { accountId: 2 },
        include: [
            { model: Account_1.default, as: 'account', attributes: { exclude: ['accountId'] } },
        ],
    });
    console.log(user);
    process.exit(0);
}))();
