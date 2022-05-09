// use "import" to import libraries
import express from 'express';
import adminController from './resources/admins';
import superAdminRouter from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/sAdmin', superAdminRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins/:id', adminController.getAdminById);
app.get('/admins', adminController.getAdminsByQuery);

app.listen(port, () => {
// console.log(Example app listening on port ${port});
});
