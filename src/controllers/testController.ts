import { Request, Response } from "express";
import testService from "../services/testService.js";

import { ICreateTestData } from '../services/testService.js';

export async function addTest(req: Request, res: Response) {
    const testData:ICreateTestData = req.body;
    await testService.addNewTest(testData)
    res.sendStatus(200);
}