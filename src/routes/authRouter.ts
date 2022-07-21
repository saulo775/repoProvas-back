import { Router } from "express";
import { signUpSchema } from './../schemas/authSchema.js';
import { createUser } from "../controllers/authController.js";

const authRouter = Router();
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";

authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema) ,createUser);

export default authRouter;