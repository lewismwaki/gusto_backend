import express from "express";
import {
  signUpUserHandler,
  logInUserHandler,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validateSchema";
import { CreateUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/login", logInUserHandler);
router.post("/signup", validateSchema(CreateUserSchema), signUpUserHandler);

export default router;
