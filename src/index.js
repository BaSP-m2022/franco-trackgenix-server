// // use "import" to import libraries
// import express from 'express';
// import adminController from './resources/admins';

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/admins/:id', adminController.getAdminById);
// app.get('/admins', adminController.getAdminsByQuery);

// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Example app listening on port ${port}`);
// });

const express = require('express');

const app = express();
const port = 3000;

const projectRouter = require('./resources/projects');

app.use(express.json());

app.use('/projects', projectRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
//   console.log('comillasalt+96'Example app listening on port ${port}'comillasalt+96');
});
