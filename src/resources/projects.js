import express from 'express';
// const fs = require('fs');
import fs from 'fs';

const router = express.Router();

const projects = require('../data/projects.json');

router.get('/getAll', (req, res) => {
  res.send(projects);
});

// -----------POST METHOD
router.post('/create', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Entre');
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

// ----------- DELETE METHOD
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

// ----------- FILTER METHOD
router.get('/filter', (req, res) => {
  const pName = req.query.name;
  const pStatus = req.query.status;
  const pDescription = req.query.description;
  const pEmployees = req.query.employees;
  const pStartDate = req.query.startDate;
  const pEndDate = req.query.startDate;
  if (!pName && !pStatus && !pDescription && !pEmployees && !pStartDate && !pEndDate) {
    res.send('No filters were found');
  } else if (pName) {
    const filterName = projects.filter((project) => project.name.includes(pName));
    if (filterName.length > 0) {
      res.send(filterName);
    } else {
      res.send('Project it was not found');
    }
  } else if (pStatus) {
    const filterStatus = projects.filter((project) => project.status.includes(pStatus));
    if (filterStatus.length > 0) {
      res.send(filterStatus);
    } else {
      res.send('Project it was not found');
    }
  } else if (pDescription) {
    const filterDescription = projects.filter(
      (project) => project.description.includes(pDescription),
    );
    if (filterDescription.length > 0) {
      res.send(filterDescription);
    } else {
      res.send('Project it was not found');
    }
  } else if (pEmployees) {
    const filterEmployees = projects.filter((project) => project.employees.includes(pEmployees));
    if (filterEmployees.length > 0) {
      res.send(filterEmployees);
    } else {
      res.send('Project it was not found');
    }
  } else if (pStartDate) {
    const filterStartDate = projects.filter((project) => project.startDate.includes(pStartDate));
    if (filterStartDate.length > 0) {
      res.send(filterStartDate);
    } else {
      res.send('Project it was not found');
    }
  } else if (pEndDate) {
    const filterEndDate = projects.filter((project) => project.endDate.includes(pEndDate));
    if (filterEndDate.length > 0) {
      res.send(filterEndDate);
    } else {
      res.send('Project it was not found');
    }
  }
});

export default router;
