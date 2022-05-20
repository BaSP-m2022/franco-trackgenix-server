import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;

const mongoDBURL = 'mongodb+srv://trackgenix-franco:BaSP2022-franco-tg@trackgenix-cluster.3g4em.mongodb.net/BaSP_database?retryWrites=true&w=majority';

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
