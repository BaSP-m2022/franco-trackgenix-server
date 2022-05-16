// import Project from '../models/Project';
// import fs from 'fs';

const projects = [];

const create = (req, res) => {
  const projectData = req.body;
  if (projectData.id && projectData.name && projectData.status && projectData.description
    && projectData.employees && projectData.startDate && projectData.endDate) {
    projects.push(projectData);
    // fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send('Project create');
    //   }
    // });
  } else {
    res.send('project not created');
  }
};

const deleteById = (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => projectId !== project.id);

  if (projects.length === filteredProjects.length) {
    res.send('Could not delete project because it was not found');
  } else {
    // fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send('Project delete');
    //   }
    // });
  }
};

const filter = (req, res) => {
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
      return p.name.toLowerCase().includes(pName.toLowerCase())
            && p.status.toLowerCase().includes(pStatus.toLowerCase())
            && p.description.toLowerCase().includes(pDescription.toLowerCase())
            && p.employees.toLowerCase().includes(pEmployees.toLowerCase())
            && p.startDate.toLowerCase().includes(pStartDate.toLowerCase())
            && p.endDate.toLowerCase().includes(pEndDate.toLowerCase());
    }
    if (pName && pStatus && pDescription && pEmployees && pStartDate) {
      return p.name.toLowerCase().includes(pName.toLowerCase())
      && p.status.toLowerCase().includes(pStatus.toLowerCase())
      && p.description.toLowerCase().includes(pDescription.toLowerCase())
      && p.employees.toLowerCase().includes(pEmployees.toLowerCase())
      && p.startDate.toLowerCase().includes(pStartDate.toLowerCase());
    }
    if (pName && pStatus && pDescription && pEmployees) {
      return p.name.toLowerCase().includes(pName.toLowerCase())
      && p.status.toLowerCase().includes(pStatus.toLowerCase())
      && p.description.toLowerCase().includes(pDescription.toLowerCase())
      && p.employees.toLowerCase().includes(pEmployees.toLowerCase());
    }
    if (pName && pStatus && pDescription) {
      return p.name.toLowerCase().includes(pName.toLowerCase())
      && p.status.toLowerCase().includes(pStatus.toLowerCase())
      && p.description.toLowerCase().includes(pDescription.toLowerCase());
    }
    if (pName && pStatus) {
      return p.name.toLowerCase().includes(pName.toLowerCase())
      && p.status.toLowerCase().includes(pStatus.toLowerCase());
    }
    if (pName) {
      return p.name.toLowerCase().includes(pName.toLowerCase());
    }
    if (pStatus) {
      return p.status.toLowerCase().includes(pStatus.toLowerCase());
    }
    if (pDescription) {
      return p.description.toLowerCase().includes(pDescription.toLowerCase());
    }
    if (pEmployees) {
      return p.employees.toLowerCase().includes(pEmployees.toLowerCase());
    }
    if (pStartDate) {
      return p.startDate.toLowerCase().includes(pStartDate.toLowerCase());
    }
    if (pEndDate) {
      return p.endDate.toLowerCase().includes(pEndDate);
    }
    return false;
  });
  if (filteredProjects.length > 0) {
    res.send(filteredProjects);
  } else {
    res.send('Project not found');
  }
};

const getById = (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((s) => s.id === projectId);
  if (project) {
    res.send(project);
  } else {
    res.send('Project not found');
  }
};

const update = (req, res) => {
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
    // fs.writeFile('src/data/projects.json', JSON.stringify(projectUpdate), (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.send('Project updated');
    //   }
    // });
  } else {
    res.send('Project not found');
  }
};

// router.put('/:id/addEmployee', (req, res) => {
//   const projectId = req.params.id;
//   const project = projects.find((s) => s.id === projectId);
//   if (project) {
//     const {
//       id, name, role, rate,
//     } = req.body;
//     const newEmployee = {
//       id, name, rate, role,
//     };
//     if (newEmployee.id !== undefined
//           && newEmployee.name !== undefined
//           && newEmployee.rate !== undefined
//           && newEmployee.role !== undefined) {
//       project.employees.push(newEmployee);
//       const filteredProjects = projects.filter((s) => s.id !== projectId);
//       filteredProjects.push(project);
//       // fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
//       //   if (err) {
//       //     res.send(err);
//       //   } else {
//       //     res.send('Employee added successfully');
//       //   }
//       // });
//     }
//   } else {
//     res.send('Employee cannot be added');
//   }
// });

export default {
  create,
  deleteById,
  filter,
  getById,
  update,
};
