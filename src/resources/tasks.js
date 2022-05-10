import express from 'express';
import fs from 'fs';

const taskRouter = express.Router();
let tasks = require('../data/tasks.json');

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

taskRouter.post('/addTask', (req, res) => {
  const newTask = req.body;
  // eslint-disable-next-line no-console
  if (newTask.name && newTask.id && newTask.description && newTask.project && newTask.workedHours) {
    tasks.push(newTask);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Task created.');
      }
    });
  } else {
    res.send('Insufficient information');
  }
});

taskRouter.delete('/deleteTask/:id', (req, res) => {
  const taskId = req.params.id;
  const deleteById = tasks.find((task) => task.id === Number(taskId));
  if (!deleteById) {
    res.send(`Task with ID ${taskId} was not found.`);
  } else {
    const newTasks = [];
    tasks.forEach((task) => {
      if (task.id !== Number(taskId)) {
        newTasks.push(task);
      }
    });
    tasks = newTasks;
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Task with ID ${taskId} deleted.`);
      }
    });
  }
});

export default taskRouter;
