"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountsController_1 = __importDefault(require("../utils/factories/accountsController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/', auth_1.default, accountsController_1.default.findBalanceById);
exports.default = router;
