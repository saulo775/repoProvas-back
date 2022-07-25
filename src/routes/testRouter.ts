import { Router } from "express";
import { addTest } from "../controllers/testController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const testRouter = Router();
testRouter.post("/test/add",tokenMiddleware, addTest);

export default testRouter;