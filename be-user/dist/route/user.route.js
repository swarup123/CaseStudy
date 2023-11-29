"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const schema_1 = __importDefault(require("../middleware/schema"));
const schema_middleware_1 = __importDefault(require("../middleware/schema.middleware"));
const user_controller_1 = require("../controller/user.controller");
router.get("/list-users", user_controller_1.listUser);
// Payload validation being done with schemaValidator if correct data coming from FE?
router.post("/create-user", (0, schema_middleware_1.default)(schema_1.default), user_controller_1.createUser);
exports.default = router;
