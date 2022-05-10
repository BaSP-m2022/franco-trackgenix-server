// use "import" to import libraries
import express from 'express';
import adminController from './resources/admins';
import employeesRouter from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins/:id', adminController.getAdminById);
app.get('/admins', adminController.getAdminsByQuery);

app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
