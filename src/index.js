// use "import" to import libraries
import express from 'express';
import adminController from './resources/admins';
import taskRouter from './resources/tasks';
import projectRouter from './resources/projects';
import superAdminRouter from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/projects', projectRouter);
app.use('/super-admins', superAdminRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins/:id', adminController.getAdminById);
app.get('/admins', adminController.getAdminsByQuery);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
