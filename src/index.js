import express from 'express';
import mongoose from 'mongoose';
import employeesRouter from './controllers/employees';
import taskRouter from './controllers/tasks';
import adminRouter from './controllers/admins';
import timesheetRouter from './controllers/time-sheets';
import projectRouter from './routes/index';
import superAdminRouter from './controllers/super-admins';

const app = express();
const port = process.env.PORT || 3000;

const mongoDBURL = 'mongodb+srv://trackgenix-franco:BaSP2022-franco-tg@trackgenix-cluster.3g4em.mongodb.net/BaSP_database?retryWrites=true&w=majority';

app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/admins', adminRouter);
app.use('/', projectRouter);
app.use('/super-admins', superAdminRouter);
app.use('/timesheets', timesheetRouter);
app.use('/employees', employeesRouter);

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
