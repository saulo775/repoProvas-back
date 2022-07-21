import { Request, Response } from "express";

import { ICreateUserData } from './../services/authService';
import authService from "../services/authService.js";

export async function createUser(req: Request, res: Response) {
    const { email, password}: ICreateUserData = req.body;

    await authService.createNewUser({email, password});
    res.sendStatus(201);
}
