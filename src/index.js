// use "import" to import libraries
import express from 'express';
import adminRouter from './resources/admins';
import timesheetRouter from './resources/time-sheets';
import projectRouter from './resources/projects';
import superAdminRouter from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminRouter);
app.use('/projects', projectRouter);
app.use('/super-admins', superAdminRouter);

app.use('/timesheets', timesheetRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
