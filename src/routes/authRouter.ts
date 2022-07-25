import { Router } from "express";
import { signUpSchema, signInSchema } from './../schemas/authSchema.js';
import { signUp, signIn } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema) ,signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(signInSchema), signIn);
export default authRouter;