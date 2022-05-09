import express from 'express';

const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/', (req, res) => {
  res.send(tasks);
});

export default router;
