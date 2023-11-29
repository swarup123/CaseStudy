import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './route/user.route';
import MongooseConnect from './config/mongoose';

const app:Express = express();


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
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/v1", router);

/**
 * It starts the server on port
 */

app.listen(3004, () => {
    console.log(`server started on port 3004`);
});


/**
 * Exports express
 * @public
 */
export default app;
