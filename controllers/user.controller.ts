import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import validator from "validator";
import { CreateUserType } from "../schema/user.schema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createToken = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.SECRET!, {
    expiresIn: "3d",
  });
};

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response
) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    if (!validator.isMobilePhone(phoneNumber.toString())) {
      return res
        .status(400)
        .json({ error: "Please enter a valid phoneNumber" });
    }

    const phoneNumberExists = await UserModel.findOne({ phoneNumber });
    if (phoneNumberExists) {
      return res
        .status(400)
        .json({ error: "User with this phoneNumber already exists" });
    }

    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hash);

    const user = await UserModel.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter email and password" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email or password" });
    }

    const matches = await bcrypt.compare(password, user.password);

    if (!matches)
      return res.status(400).json({ error: "Incorrect email or password" });

    const token = createToken(user._id);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
