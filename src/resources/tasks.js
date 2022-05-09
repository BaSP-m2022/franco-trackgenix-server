import express from 'express';

const taskRouter = express.Router();
const tasks = require('../data/tasks.json');

taskRouter.get('/', (req, res) => {
  res.send(tasks);
});

taskRouter.get('/getById/:id', (req, res) => {
  const taskId = req.params.id;
  const taskFind = tasks.find((task) => task.id === Number(taskId));
  if (taskFind) {
    res.send(taskFind);
  } else {
    res.send('Task not found.');
  }
});

taskRouter.get('/getByProject', (req, res) => {
  const taskName = req.query.name;
  const taskId = req.query.id;
  const taskDescription = req.query.description;
  const projectName = req.query.project;
  const workedHoursTask = req.query.workedHours;

  const filteredTasks = tasks.filter((task) => {
    if (taskName && taskId && taskDescription && projectName && workedHoursTask) {
      return task.name.includes(taskName) && task.id === Number(taskId)
      && task.description.includes(taskDescription)
      && task.project.includes(projectName) && task.workedHours === Number(workedHoursTask);
    }
    if (taskName && taskId && taskDescription && projectName) {
      return task.name.includes(taskName) && task.id === Number(taskId)
      && task.description.includes(taskDescription)
      && task.project.includes(projectName);
    }
    if (taskName && taskId && taskDescription) {
      return task.name.includes(taskName) && task.id === Number(taskId)
      && task.description.includes(taskDescription);
    }
    if (taskName && taskId) {
      return task.name.includes(taskName) && task.id === Number(taskId);
    }
    if (taskName) {
      return task.name.includes(taskName);
    }
    if (taskId) {
      return task.id === Number(taskId);
    }
    if (taskDescription) {
      return task.description.includes(taskDescription);
    }
    if (projectName) {
      return task.project.includes(projectName);
    }
    if (workedHoursTask) {
      return task.workedHours === Number(workedHoursTask);
    }
    return false;
  });
  if (filteredTasks.length > 0) {
    res.send(filteredTasks);
  } else {
    res.send('Task not found.');
  }
});

export default taskRouter;
