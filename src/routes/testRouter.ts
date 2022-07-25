import { Router } from "express";

import { createTestSchema } from './../schemas/testSchema.js';
import { addTest } from "../controllers/testController.js";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const testRouter = Router();
testRouter.post(
    "/test/add/", 
    validateSchemaMiddleware(createTestSchema),
    tokenMiddleware, 
    addTest
);

export default testRouter;