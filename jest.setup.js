import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri;

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
});

afterAll(async () => {
  await mongoose.connection.dropDataBase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
