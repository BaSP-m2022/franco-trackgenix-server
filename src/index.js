// use "import" to import libraries
import express from 'express';
import adminRouter from './resources/admins';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/admins/:id', adminRouter.getAdminById);
// app.get('/admins', adminRouter.getAdminsByQuery);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
