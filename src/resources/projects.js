const express = require('express');

const router = express.Router();
const fs = require('fs');
const projects = require('../data/projects.json');

router.get('/getAll', (req, res) => {
  res.send(projects);
});

router.post('/create', (req, res) => {
  const projectData = req.body;
  projects.push(projectData);

  fs.writeFile('C:/Users/Sofia/Desktop/franco-trackgenix-server/src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project create');
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => projectId !== project.id);

  if (projects.length === filteredProjects.length) {
    res.send('Could not delete project because it was not found');
  } else {
    fs.writeFile('C:/Users/Sofia/Desktop/franco-trackgenix-server/src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project delete');
      }
    });
  }
});

module.exports = router;
