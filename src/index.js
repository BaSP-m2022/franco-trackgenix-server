import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = process.env.PORT || 3001;

const mongoDBURL = 'mongodb+srv://trackgenix-franco:BaSP2022-franco-tg@trackgenix-cluster.3g4em.mongodb.net/BaSP_database?retryWrites=true&w=majority';

app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(
  mongoDBURL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Fail to connect', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
