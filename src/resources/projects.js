import express from 'express';

const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

router.put('/put/:id', (req, res) => {
  const found = projects.some((project) => project.id === parseInt(req.params.id, 10));
  if (found) {
    const projectsData = req.body;
    projects.forEach((project) => {
      const pr = project;
      if (pr.id === parseInt(req.params.id, 10)) {
        pr.name = projectsData.name ? projectsData.name : pr.name;
        pr.status = projectsData.status ? projectsData.status : pr.status;
        pr.description = projectsData.description ? projectsData.description : pr.description;
        pr.employees = projectsData.employees ? projectsData.employees : pr.employees;
        pr.startDate = projectsData.startDate ? projectsData.startDate : pr.startDate;
        pr.endDate = projectsData.endDate ? projectsData.endDate : pr.endDate;
        fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Project successfully edited');
          }
        });
      }
    });
  } else {
    res.send(`No project with ID ${req.params.id} exist`);
  }
});

router.get('/', (req, res) => {
  const projectsId = parseInt(req.query.id, 10);
  const foundPrId = projects.some((project) => project.id === projectsId);
  const projectName = req.query.name;
  const foundPrName = projects.some((project) => project.name === projectName);
  // const projectStatus = req.query.status;
  // const foundPrStatus = projects.some((project) => project.status === projectStatus);
  const projectDescription = req.query.description;
  const foundPrDescription = projects.some((project) => project.description === projectDescription);
  const projectEmployees = req.query.employees;
  const foundPrEmployees = projects.some((project) => project.employees === projectEmployees);
  const projectStartDate = req.query.startDate;
  const foundPrStartDate = projects.some((project) => project.startDate === projectStartDate);
  const projectEndDate = req.query.endDate;
  const foundPrEndDate = projects.some((project) => project.endDate === projectEndDate);
  const projectStatus = req.query.status;
  const fa = projects.some((pr) => JSON.stringify(pr.active) === projectStatus);
  if (projectsId && foundPrId) {
    res.json(projects.filter((project) => project.id === projectsId));
  } else if (projectName && foundPrName) {
    res.json(projects.filter((project) => project.name === projectName));
  } else if (projectDescription && foundPrDescription) {
    res.json(projects.filter((project) => project.name === projectDescription));
  } else if (projectEmployees && foundPrEmployees) {
    res.json(projects.filter((project) => project.name === projectEmployees));
  } else if (projectStartDate && foundPrStartDate) {
    res.json(projects.filter((project) => project.name === projectStartDate));
  } else if (projectEndDate && foundPrEndDate) {
    res.json(projects.filter((project) => project.name === projectEndDate));
  } else if (projectStatus && fa) {
    res.json(projects.filter((pr) => JSON.stringify(pr.active) === projectStatus));
  } else {
    res.json({ msg: 'Project not found', projects });
  }
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  // eslint-disable-next-line no-shadow
  const project = projects.find((project) => project.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
});

// module.exports = router;

// export default {
//     router
// }

export default router;
