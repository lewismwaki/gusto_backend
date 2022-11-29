import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import validator from "validator";
import { CreateUserType } from "../schema/user.schema";

export const signUpUserHandler = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response
) => {
  const { username, email, phoneNumber, password } = req.body;

  const emailExists = await UserModel.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: "User with this email exists" });
  }

  if (!validator.isMobilePhone(phoneNumber)) {
    return res.status(400).json({ error: "Please enter a valid phoneNumber" });
  }

  const phoneNumberExists = await UserModel.findOne({ phoneNumber });
  if (phoneNumberExists) {
    return res.status(400).json({ error: "User with this phoneNumber exists" });
  }

  try {
    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hash);
    const user = await UserModel.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const logInUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email and password" });
  }

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    return res
      .status(400)
      .json({ error: "User with this email does not exist" });
  }

  try {
    const matches = await bcrypt.compare(password, existingUser.password);

    if (!matches)
      return res.status(400).json({ error: "Passwords don't match" });

    const user = await UserModel.create({
      email,
      password,
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
