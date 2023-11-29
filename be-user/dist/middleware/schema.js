"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define a validation schema for the request body
const createUserSchema = joi_1.default.object().keys({
    firstName: joi_1.default.string().min(1).max(100),
    lastName: joi_1.default.string().min(1).max(100),
    email: joi_1.default.string().email(),
});
exports.default = createUserSchema;
