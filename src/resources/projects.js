import express from 'express';
import fs from 'fs';

const projects = require('../data/projects.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((s) => s.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
});

router.put('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((s) => s.id === projectId);
  if (project) {
    const projectUpdated = req.body;
    const editedProject = {};
    editedProject.id = projectId;
    editedProject.name = projectUpdated.name ? projectUpdated.name : project.name;
    editedProject.status = projectUpdated.status ? projectUpdated.status : project.status;
    editedProject.description = projectUpdated.description
      ? projectUpdated.description : project.description;
    editedProject.startDate = projectUpdated.startDate
      ? projectUpdated.startDate : project.startDate;
    editedProject.endDate = projectUpdated.endDate ? projectUpdated.endDate : project.endDate;
    const projectUpdate = projects.filter((s) => s.id !== projectId);
    projectUpdate.push(editedProject);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectUpdate), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  } else {
    res.send('Project not found');
  }
});

router.put('/:id/addEmployee', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((s) => s.id === projectId);
  if (project) {
    const {
      id, name, role, rate,
    } = req.body;
    const newEmployee = {
      id, name, rate, role,
    };
    if (newEmployee.id !== undefined
        && newEmployee.name !== undefined
        && newEmployee.rate !== undefined
        && newEmployee.role !== undefined) {
      project.employees.push(newEmployee);
      const filteredProjects = projects.filter((s) => s.id !== projectId);
      filteredProjects.push(project);
      fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Employee added successfully');
        }
      });
    }
  } else {
    res.send('Employee cannot be added');
  }
});

export default router;
