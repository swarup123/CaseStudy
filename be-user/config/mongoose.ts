import mongoose from 'mongoose';
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

import { MONGO_URL, serverSelectionTimeoutMS } from '../constant.types';

// Exit application on error
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});


/**
 * Connect to mongo db
 *
 * @return {object} Mongoose connection
 * @public
 */

const MongooseConnect = (): object => {
  mongoose.connect(MONGO_URL, {
    serverSelectionTimeoutMS
  });
  return mongoose.connection;
};

export default MongooseConnect;
