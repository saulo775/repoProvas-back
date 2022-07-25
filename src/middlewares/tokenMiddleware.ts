import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export function tokenMiddleware(req: Request, res: Response, next: NextFunction){
    const Authorization = req.headers['authorization'];
    if (!Authorization) {
        throw new AppError("Token is missing", 404);
    }

    const secretKey = process.env.JWT_SECRET;
    const token = Authorization.replace("Bearer", "").trim();
    
    let data
    try {
        data = jwt.verify(token, secretKey);
    } catch (error) {
        throw new AppError("Invalid token", 403);
    }
    
    res.locals.userId = data.userId;
    next();
}