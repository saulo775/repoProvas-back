import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/config/database.js";

const EMAIL = `topuser@gmail.com`;
const PASSWORD = "senha1234";
const LOGIN = {email: EMAIL, password:PASSWORD, confirmPassword: PASSWORD};


describe("auth test suite", ()=>{
    beforeEach(async ()=>{
        await prisma.$executeRaw`DELETE FROM users WHERE email=${EMAIL}`;
    })

    it("should be able create user, given email, password and passwordConfirmation.", async ()=>{
        const response = await supertest(app).post("/sign-up").send(LOGIN);
        expect(response.statusCode).toBe(201);
    });

    it("should not be able to create user if password confirmation is not given.", async ()=>{
        const response = await supertest(app).post("/sign-up").send({EMAIL, PASSWORD});
        expect(response.statusCode).toBe(422);
    });

    it("given email already in use, fail to create user", async()=>{
        await supertest(app).post("/sign-up").send(LOGIN);
        const response = await supertest(app).post("/sign-up").send(LOGIN);
        expect(response.statusCode).toBe(409);
    });

    it("should be able to return a token given email and password", async ()=> {
        const response = await supertest(app).post("/sign-in").send({EMAIL, PASSWORD});
        const token = response.body.token;
        expect(token).not.toBeNull();
    });
});

afterAll(async ()=>{
    await prisma.$disconnect();
})