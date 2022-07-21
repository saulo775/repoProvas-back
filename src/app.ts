import express, {json, ErrorRequestHandler, Request, Response, NextFunction}from "express";
import "express-async-errors";

import { AppError } from "./errors/AppError.js";
import routes from "./routes/index.js";

const app = express();
app.use(json());
app.use(routes);
app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                message: err.message
            });
        }
        return res.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        })
    }
)

export default app;