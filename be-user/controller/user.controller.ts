import { Request, Response } from "express";
import UserModel from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  const methodName = "[createUser]";

  try {
    const {firstName, lastName, email } = req.body;
    
    let userData = await UserModel.findOne({ email });

    if (userData) {
      return res.send({
        statusCode: 204,
        success: "User already exists..!!",
      });
    } else {

      const user = new UserModel({
        firstName: firstName,
        email: email,
        lastName: lastName,
        createdAt: Date.now()
      });

      let createdUser = await user.save();
      if (createdUser) {
        return res.send({
          statusCode: 200,
          userDetails: createdUser,
        });
      }
    }
  } catch (error) {
    if (error) {
      return res.send({ statusCode: 400, error: error });
    }
  }
};

export const listUser = async (req: Request, res: Response) => {
  const methodName = "[listUser]";
  try {
    
    const pagination = req.query.pagination ? +req.query.pagination : 5;
    //PageNumber From which Page to Start 
    const pageNumber = req.query.page ? +req.query.page : 1;

    let totalUserCount = await UserModel.countDocuments();
    
    let userData = await UserModel.find({}).sort({createdAt: 1});

    if (userData) {
      return res.send({
        statusCode: 200,
        userDetails: userData,
        totalCount: totalUserCount
      });
    }
  } catch (error) {
    if (error) {
      return res.send({ statusCode: 400, error: error });
    }
  }
};
