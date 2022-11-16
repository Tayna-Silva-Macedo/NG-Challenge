"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionsController_1 = __importDefault(require("../utils/factories/transactionsController"));
const router = (0, express_1.Router)();
router.post('/', transactionsController_1.default.create);
exports.default = router;
