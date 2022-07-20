import express, { json } from "express";
import "express-async-errors";

import routes from "./routes/index.js";

const app = express();
app.use(json());
app.use(routes);

export default app;