import express from 'express';
import fs from 'fs';

const tasks = require('../data/tasks.json');

const taskRouter = express.Router();

taskRouter.get('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskFind = tasks.find((task) => task.id === Number(taskId));
  if (taskFind) {
    res.send(taskFind);
  } else {
    res.send('Task not found. asd');
  }
});

taskRouter.get('/', (req, res) => {
  const taskName = req.query.name;
  const taskId = req.query.id;
  const taskDescription = req.query.description;
  const projectName = req.query.project;
  const workedHoursTask = req.query.workedHours;
  if (!taskName && !taskId && !taskDescription && !projectName && !workedHoursTask) {
    res.send(tasks);
  }
  const filteredTasks = tasks.filter((task) => {
    if (taskName && taskId && taskDescription && projectName && workedHoursTask) {
      return task.name.toLowerCase().includes(taskName.toLowerCase())
      && task.id === Number(taskId)
      && task.description.toLowerCase().includes(taskDescription.toLowerCase())
      && task.project.toLowerCase().includes(projectName.toLowerCase())
      && task.workedHours === Number(workedHoursTask);
    }
    if (taskName && taskId && taskDescription && projectName) {
      return task.name.toLowerCase().includes(taskName.toLowerCase())
      && task.id === Number(taskId)
      && task.description.toLowerCase().includes(taskDescription.toLowerCase())
      && task.project.toLowerCase().includes(projectName.toLowerCase());
    }
    if (taskName && taskId && taskDescription) {
      return task.name.toLowerCase().includes(taskName.toLowerCase())
      && task.id === Number(taskId)
      && task.description.toLowerCase().includes(taskDescription.toLowerCase());
    }
    if (taskName && taskId) {
      return task.name.toLowerCase().includes(taskName.toLowerCase())
      && task.id === Number(taskId);
    }
    if (taskName) {
      return task.name.toLowerCase().includes(taskName.toLowerCase());
    }
    if (taskId) {
      return task.id === Number(taskId);
    }
    if (taskDescription) {
      return task.description.toLowerCase().includes(taskDescription.toLowerCase());
    }
    if (projectName) {
      return task.project.toLowerCase().includes(projectName.toLowerCase());
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

taskRouter.post('/', (req, res) => {
  const newTask = req.body;
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

taskRouter.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const deleteById = tasks.find((task) => task.id === Number(taskId));
  if (!deleteById) {
    res.send(`Task with ID ${taskId} was not found.`);
  } else {
    const filteredTasks = tasks.filter((task) => task.id !== Number(taskId));
    fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Task with ID ${taskId} deleted.`);
      }
    });
  }
});

taskRouter.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskToModify = tasks.find((task) => Number(taskId) === task.id);
  if (taskToModify) {
    const taskUpdated = req.body;
    taskToModify.name = taskUpdated.name ? taskUpdated.name : taskToModify.name;
    taskToModify.description = taskUpdated.description
      ? taskUpdated.description : taskToModify.description;
    taskToModify.project = taskUpdated.project ? taskUpdated.project : taskToModify.project;
    taskToModify.workedHours = taskUpdated.workedHours
      ? taskUpdated.workedHours : taskToModify.workedHours;
    const filteredTasks = tasks.filter((task) => task.id !== Number(taskId));
    filteredTasks.push(taskToModify);
    filteredTasks.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Changes made successfully.');
      }
    });
  } else {
    res.send('Task not found.');
  }
});

export default taskRouter;
