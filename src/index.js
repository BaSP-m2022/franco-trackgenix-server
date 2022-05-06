// use "import" to import libraries
import express from 'express';
import * as adminController from './resources/admins';

// use "require" to import JSON files
// const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins/:id', adminController.getAdminById);
app.get('/admins', adminController.getAdminsByQuery);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
