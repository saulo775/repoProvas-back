import bcrypt from 'bcrypt';
import { User } from "@prisma/client"
import { AppError } from "../errors/AppError.js";
import authRepository from "../repositories/authRepository.js";

export type ICreateUserData = Omit<User, "id">

async function createNewUser(userData: ICreateUserData) {
    await verifyIfUserAlreadyExist(userData);
    const passwordEncrypt = await encryptPassword(userData);
    userData.password = passwordEncrypt;

    await authRepository.insertUser(userData);
}

async function verifyIfUserAlreadyExist(userData:ICreateUserData) {
    const user = await authRepository.findUserByEmail(userData);
    if (user) {
        throw new AppError("User already exists", 409);
    }    
}

async function encryptPassword({password}: ICreateUserData) {
    const passwordEncrypt = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    return passwordEncrypt
}

const authService = {
    createNewUser,
}

export default authService;