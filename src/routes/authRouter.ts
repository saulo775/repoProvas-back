import { Router } from "express";
import { signUpSchema, signInSchema } from './../schemas/authSchema.js';
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";

authRouter.post("/sign-up", validateSchemaMiddleware(signUpSchema) ,signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(signInSchema), signIn);
export default authRouter;