"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_route_1 = __importDefault(require("./route/user.route"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const app = (0, express_1.default)();
// open mongoose connection
(0, mongoose_1.default)();
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 100000,
}));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use("/api/v1", user_route_1.default);
/**
 * It starts the server on port
 */
app.listen(3004, () => {
    console.log(`server started on port 3004`);
});
/**
 * Exports express
 * @public
 */
exports.default = app;
