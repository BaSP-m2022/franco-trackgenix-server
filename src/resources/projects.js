import express from 'express';
// const fs = require('fs');
import fs from 'fs';

const router = express.Router();

const projects = require('../data/projects.json');

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.post('/create', (req, res) => {
  // eslint-disable-next-line no-console
  const projectData = req.body;
  if (projectData.id && projectData.name && projectData.status && projectData.description
    && projectData.employees && projectData.startDate && projectData.endDate) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project create');
      }
    });
  } else {
    res.send('project not created');
  }
});

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => projectId !== project.id);

  if (projects.length === filteredProjects.length) {
    res.send('Could not delete project because it was not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project delete');
      }
    });
  }
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
});

router.get('/', (req, res) => {
  const pName = req.query.name;
  const pStatus = req.query.status;
  const pDescription = req.query.description;
  const pEmployees = req.query.employees;
  const pStartDate = req.query.startDate;
  const pEndDate = req.query.startDate;
  if (!pName && !pStatus && !pDescription && !pEmployees && !pStartDate && !pEndDate) {
    res.send(projects);
  }

  const filteredProjects = projects.filter((p) => {
    if (pName && pStatus && pDescription && pEmployees && pStartDate && pEndDate) {
      return p.name.includes(pName.toLowerCase())
            && p.status.includes(pStatus.toLowerCase())
            && p.description.includes(pDescription.toLowerCase())
            && p.employees.includes(pEmployees.toLowerCase())
            && p.startDate.includes(pStartDate.toLowerCase())
            && p.endDate.includes(pEndDate.toLowerCase());
    }
    if (pName && pStatus && pDescription && pEmployees && pStartDate) {
      return p.name.includes(pName.toLowerCase())
            && p.status.includes(pStatus.toLowerCase())
            && p.description.includes(pDescription.toLowerCase())
            && p.employees.includes(pEmployees.toLowerCase())
            && p.startDate.includes(pStartDate.toLowerCase());
    }
    if (pName && pStatus && pDescription && pEmployees) {
      return p.name.includes(pName.toLowerCase())
            && p.status.includes(pStatus.toLowerCase())
            && p.description.includes(pDescription.toLowerCase())
            && p.employees.includes(pEmployees.toLowerCase());
    }
    if (pName && pStatus && pDescription) {
      return p.name.includes(pName.toLowerCase())
            && p.status.includes(pStatus.toLowerCase())
            && p.description.includes(pDescription.toLowerCase());
    }
    if (pName && pStatus) {
      return p.name.includes(pName.toLowerCase()) && p.status.includes(pStatus.toLowerCase());
    }
    if (pName) {
      return p.name.includes(pName.toLowerCase());
    }
    if (pStatus) {
      return p.status.includes(pStatus.toLowerCase());
    }
    if (pDescription) {
      return p.description.includes(pDescription.toLowerCase());
    }
    if (pEmployees) {
      return p.employees.includes(pEmployees.toLowerCase());
    }
    if (pStartDate) {
      return p.startDate.includes(pStartDate.toLowerCase());
    }
    if (pEndDate) {
      return p.endDate.includes(pEndDate);
    }
    return false;
  });
  if (filteredProjects.length > 0) {
    res.send(filteredProjects);
  } else {
    res.send('Project not found');
  }
});

export default router;
