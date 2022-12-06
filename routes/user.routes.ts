import express from "express";
import {
  createUserHandler,
  loginHandler,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validateSchema";
import { CreateUserSchema, LoginUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/login", validateSchema(LoginUserSchema), loginHandler);
router.post("/register", validateSchema(CreateUserSchema), createUserHandler);

export default router;
