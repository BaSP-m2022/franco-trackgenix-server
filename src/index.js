import express from 'express';

const projects = require('./data/projects.json');
const projectRouter = require('./resources/projects');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use('/projects', projectRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/projects', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
