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
exports.listUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = "[createUser]";
    try {
        const { firstName, lastName, email } = req.body;
        let userData = yield userModel_1.default.findOne({ email });
        if (userData) {
            return res.send({
                statusCode: 204,
                success: "User already exists..!!",
            });
        }
        else {
            const user = new userModel_1.default({
                firstName: firstName,
                email: email,
                lastName: lastName,
                createdAt: Date.now()
            });
            let createdUser = yield user.save();
            if (createdUser) {
                return res.send({
                    statusCode: 200,
                    userDetails: createdUser,
                });
            }
        }
    }
    catch (error) {
        if (error) {
            return res.send({ statusCode: 400, error: error });
        }
    }
});
exports.createUser = createUser;
const listUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = "[listUser]";
    try {
        const pagination = req.query.pagination ? +req.query.pagination : 5;
        //PageNumber From which Page to Start 
        const pageNumber = req.query.page ? +req.query.page : 1;
        let totalUserCount = yield userModel_1.default.countDocuments();
        let userData = yield userModel_1.default.find({}).sort({ createdAt: 1 });
        if (userData) {
            return res.send({
                statusCode: 200,
                userDetails: userData,
                totalCount: totalUserCount
            });
        }
    }
    catch (error) {
        if (error) {
            return res.send({ statusCode: 400, error: error });
        }
    }
});
exports.listUser = listUser;
