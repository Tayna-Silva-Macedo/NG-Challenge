"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../utils/factories/usersController"));
const router = (0, express_1.Router)();
router.post('/', usersController_1.default.login);
exports.default = router;
