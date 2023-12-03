import { Request, Response } from "express";
import UserModel from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {

  try {
    const {firstName, lastName, email } = req.body;

    if(firstName.length > 100 || lastName.length > 100) {
      return res.send({
        statusCode: 400,
        errorMessage: "Maximum 100 character allowed in first name and last name ",
      });
    }
    
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
  try {    
    
    let userData = await UserModel.find({}).sort({createdAt: 1});

    if (userData) {
      return res.send({
        statusCode: 200,
        userDetails: userData,
      });
    }
  } catch (error) {
    if (error) {
      return res.send({ statusCode: 400, error: error });
    }
  }
};
