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
const user_controller_1 = require("../controller/user.controller");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../index"));
/* Connecting to the database before each test. */
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // await mongoose.connection.close();
    // await mongoose.connect('mongodb://localhost:27017/user');
}));
/* Closing database connection after each test. */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("GET /api/v1/list-users", () => {
    it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/v1/list-users");
        expect(res.statusCode).toBe(200);
        expect(res.body.userDetails.length).toBeGreaterThan(0);
    }));
});
describe("POST /api/v1/create-user", () => {
    it("should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/api/v1/create-user").send({
            firstName: "Product 2",
            lastName: 'Mis',
            email: "a@gmail.com",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.userDetails.firstName).toBe("Product 2");
    }));
});
describe("POST /api/v1/create-user", () => {
    it("should give error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/v1/create-user")
            .send({
            firstName: "",
            lastName: 'Mis',
            email: "a@gmail.com",
        });
        expect(res.statusCode).toBe(422);
    }));
});
describe('listUser', () => {
    test('should return user list and total count', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                pagination: '5',
                page: '1',
            },
        };
        const res = {
            send: jest.fn(),
        };
        yield (0, user_controller_1.listUser)(req, res);
        expect(res.send).toHaveBeenCalledWith({
            statusCode: 200,
            userDetails: expect.any(Array),
            totalCount: expect.any(Number),
        });
    }));
    test('should return error response', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                pagination: '5',
                page: '1',
            },
        };
        const res = {
            send: jest.fn(),
        };
        // Mock the UserModel.find function to throw an error
        jest.mock('./path-to-user-model-file', () => ({
            find: jest.fn().mockImplementation(() => {
                throw new Error('Some error');
            }),
            countDocuments: jest.fn().mockReturnValue(0),
        }));
        yield (0, user_controller_1.listUser)(req, res);
        expect(res.send).toHaveBeenCalledWith({
            statusCode: 400,
            error: expect.any(Error),
        });
    }));
});
