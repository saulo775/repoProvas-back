import prisma from '../config/database.js';
import { ICreateUserData } from './../services/authService.js';

async function findUserByEmail({email}:ICreateUserData) {
    const user = await prisma.user.findUnique({
        where: {email}
    });
    return user;
}

async function insertUser(dataUser: ICreateUserData) {
    await prisma.user.create({data: dataUser});
    return;
}



const authRepository = {
    findUserByEmail,
    insertUser
}

export default authRepository;