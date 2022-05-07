// use "import" to import libraries
const express = require('express');

// use "require" to import JSON files
const admins = require('./data/admins.json');
const sAdminRouter = require('./resources/super-admins');

const app = express();
const port = process.env.PORT || 3000;

app.use('/sAdmin', sAdminRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
// console.log(Example app listening on port ${port});
});
