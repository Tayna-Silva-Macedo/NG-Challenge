"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const transactionsController_1 = __importDefault(require("../utils/factories/transactionsController"));
const router = (0, express_1.Router)();
router.post('/', auth_1.default, transactionsController_1.default.create);
router.get('/', auth_1.default, transactionsController_1.default.findAll);
router.get('/cash-out', auth_1.default, transactionsController_1.default.findCashOut);
router.get('/cash-in', auth_1.default, transactionsController_1.default.findCashIn);
exports.default = router;
