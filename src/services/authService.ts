import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from "@prisma/client"
import { AppError } from "../errors/AppError.js";
import authRepository from "../repositories/authRepository.js";

export type ICreateUserData = Omit<User, "id">

async function createNewUser(userData: ICreateUserData) {
    const user = await authRepository.findUserByEmail(userData)
    if (user) {
        throw new AppError("User already exists", 409);
    }   
    const passwordEncrypt = await encryptPassword(userData);
    userData.password = passwordEncrypt;

    await authRepository.insertUser(userData);
}

async function createNewSession(userData: ICreateUserData) {
    const user = await checkIfLoginInputsAreCorrects(userData);
    const token = generateToken(user.id);

    return token;
}

const encryptPassword = async ({password}: ICreateUserData) => {
    const passwordEncrypt = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    return passwordEncrypt
}

const checkIfLoginInputsAreCorrects = async (userData: ICreateUserData) => {
    const user = await authRepository.findUserByEmail(userData);
    if (!user) {
        throw new AppError("Incorrect credentials", 422);
    }

    const result = await bcrypt.compare(userData.password, user.password)
    if (!result) {
        throw new AppError("Incorrect credentials", 422);
    }

    return user;
}

const generateToken = (userId: number) => {
    const data = {userId};
    const secret = process.env.JWT_SECRET;
    const config = {expiresIn: process.env.JWT_EXPIRATION || '1d'};

    const token = jwt.sign(data, secret, config);
    return token
}

const authService = {
    createNewUser,
    createNewSession,
}
export default authService;