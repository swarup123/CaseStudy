import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { createUser, listUser } from './controller/user.controller';
import dotenv from 'dotenv';

const app:Express = express();
dotenv.config();

mongoose.connect(`${process.env.MONGO_URL}`);

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

app.get('/list-users', listUser);
app.post('/create-user', createUser)

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
