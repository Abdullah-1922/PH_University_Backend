import express, { Request, Response } from "express";
import cors from "cors";

import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import NotFound from "./app/middlewares/NotFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app = express();
//parsers
app.use(express.json());
app.use(cors({origin:
  ['http://localhost:5173']
}));
app.use(cookieParser());
// application routes

app.use("/api/v1", router);

const test = (req: Request, res: Response) => {
  // Promise.reject();
  const a = "server is running LALALALALALALALA";
  res.send(a);
};
// console.log(process.cwd());

app.get("/", test);

app.use(globalErrorHandler);
app.use(NotFound);

export default app;
