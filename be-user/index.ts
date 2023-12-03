import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './route/user.route';
import MongooseConnect from './config/mongoose';
import dotenv from 'dotenv';

const app:Express = express();
dotenv.config();

// open mongoose connection

MongooseConnect();

app.use(express.json({ limit: "100mb" }));
app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 100000,
  })
);

app.use(helmet());
app.use(cors());
app.use("/", router);

/**
 * It starts the server on port
 */

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});


/**
 * Exports express
 * @public
 */
export default app;
