// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import employeesRouter from './controllers/employees';
import taskRouter from './controllers/tasks';
import adminRouter from './controllers/admins';
import timesheetRouter from './controllers/time-sheets';
import projectRouter from './controllers/projects';
import superAdminRouter from './controllers/super-admins';

const app = express();
const port = process.env.PORT || 3000;

// eslint-disable-next-line quotes
const mongoDBURL = "mongodb+srv://trackgenix-franco:BaSP2022-franco-tg@trackgenix-cluster.3g4em.mongodb.net/BaSP_database?retryWrites=true&w=majority";

mongoose.connect(mongoDBURL, () => {
  // eslint-disable-next-line no-console
  console.log('connect to data base');
}, (error) => {
  // eslint-disable-next-line no-console
  console.log('filed to connect to data base', error);
});

app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/admins', adminRouter);
app.use('/projects', projectRouter);
app.use('/super-admins', superAdminRouter);
app.use('/timesheets', timesheetRouter);
app.use('/employees', employeesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
