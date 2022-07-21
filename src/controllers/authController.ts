import { Request, Response } from "express";

import { ICreateUserData } from './../services/authService';
import authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const { email, password }: ICreateUserData = req.body;

    await authService.createNewUser({ email, password });
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { email, password }: ICreateUserData = req.body;
    const token = await authService.createNewSession({email, password})
    res.status(200).json({token});
}