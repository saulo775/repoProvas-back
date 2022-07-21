import Joi from "joi";
import { ICreateUserData } from "../services/authService";

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const signInSchema = Joi.object<ICreateUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

