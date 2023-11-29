"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://db:27017/user";
// set mongoose Promise to Bluebird
mongoose_1.default.Promise = Promise;
const constant_types_1 = require("../constant.types");
// Exit application on error
mongoose_1.default.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});
/**
 * Connect to mongo db
 *
 * @return {object} Mongoose connection
 * @public
 */
const MongooseConnect = () => {
    mongoose_1.default.connect('mongodb://db:27017/user', {
        serverSelectionTimeoutMS: constant_types_1.serverSelectionTimeoutMS
    });
    return mongoose_1.default.connection;
};
exports.default = MongooseConnect;
