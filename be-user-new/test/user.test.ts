import { createUser, listUser } from "../controller/user.controller";
import { Request, Response } from "express";
import { UserType } from "./userTest.type";
import request from 'supertest';
import mongoose from "mongoose";
import app from '../index';

/* Connecting to the database before each test. */
beforeEach(async () => {
  // await mongoose.connection.close();
  // await mongoose.connect('mongodb://localhost:27017/user');
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /list-users", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/list-users");
    expect(res.statusCode).toBe(200);
    expect(res.body.userDetails.length).toBeGreaterThan(0);
  });
});


describe("POST /create-user", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/create-user").send({
      firstName: "Product 2",
      lastName: 'Mis',
      email: "a@gmail.com",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.userDetails.firstName).toBe("Product 2");
  });
});

describe("POST /create-user", () => {
  it("should give error", async () => {
    const res = await request(app)
      .post("/create-user")
      .send({
        firstName: "",
        lastName: 'Mis',
        email: "a@gmail.com",
      });
    expect(res.statusCode).toBe(422);
  });
});

describe('listUser', () => {
  test('should return user list and total count', async () => {
    const req: Request = {
      query: {
        pagination: '5',
        page: '1',
      },
    } as unknown as Request;

    const res: Response = {
      send: jest.fn(),
    } as unknown as Response;

    await listUser(req, res);

    expect(res.send).toHaveBeenCalledWith({
      statusCode: 200,
      userDetails: expect.any(Array),
      totalCount: expect.any(Number),
    });
  });
  
  test('should return error response', async () => {
    const req: Request = {
      query: {
        pagination: '5',
        page: '1',
      },
    } as unknown as Request;
  
    const res: Response = {
      send: jest.fn(),
    } as unknown as Response;
  
    // Mock the UserModel.find function to throw an error
    jest.mock('../model/userModel', () => ({
      find: jest.fn().mockImplementation(() => {
        throw new Error('Some error');
      }),
      countDocuments: jest.fn().mockReturnValue(0),
    }));
  
    await listUser(req, res);
  
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: expect.any(Error),
    });
  });
});



