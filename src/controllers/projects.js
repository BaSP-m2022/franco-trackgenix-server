import Project from '../models/Project';

const projects = [];

const create = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
      employees: req.body.employees,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    await project.save();
    return res.status(201).json({
      message: 'Project was created.',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);
  try {
    if (!projectId) {
      console.log('1');
      return res.status(400).send({
        message: 'Missing ID parameter',
        data: undefined,
        error: true,
      });
    }
    console.log('2');
    const searchProject = await Project.findByIdAndDelete(projectId);
    return res.status(204).send({
      message: 'Project was deleted',
      data: searchProject,
      error: false,
    });
  } catch (error) {
    console.log('3');
    return res.send({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
  // const projectId = req.params.id;
  // const filteredProjects = projects.filter((project) => projectId !== project.id);

  // if (projects.length === filteredProjects.length) {
  //   res.send('Could not delete project because it was not found');
  // } else {
  //   // fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
  //   //   if (err) {
  //   //     res.send(err);
  //   //   } else {
  //   //     res.send('Project delete');
  //   //   }
  //   // });
  // }
};

const filter = async (req, res) => {
  const pName = req.query.name;
  const pStatus = req.query.status;
  const pDescription = req.query.description;
  const pEmployees = req.query.employees;
  const pStartDate = req.query.startDate;
  const pEndDate = req.query.startDate;
  const projectX = await Project.find({ name: pName });
  console.log('aca');
  console.log(projectX);
  try {
    if (!pName && !pStatus && !pDescription && !pEmployees && !pStartDate && !pEndDate) {
      const allProjects = await Project.find({});
      console.log('0');
      return res.status(201).json({
        message: '',
        data: allProjects,
        error: false,
      });
    }

    // if (pName && pStatus && pDescription && pEmployees && pStartDate && pEndDate) {
    //   return p.name.toLowerCase().includes(pName.toLowerCase())
    //           && p.status.toLowerCase().includes(pStatus.toLowerCase())
    //           && p.description.toLowerCase().includes(pDescription.toLowerCase())
    //           && p.employees.toLowerCase().includes(pEmployees.toLowerCase())
    //           && p.startDate.toLowerCase().includes(pStartDate.toLowerCase())
    //           && p.endDate.toLowerCase().includes(pEndDate.toLowerCase());
    // }
    // if (pName && pStatus && pDescription && pEmployees && pStartDate) {
    //   return p.name.toLowerCase().includes(pName.toLowerCase())
    //     && p.status.toLowerCase().includes(pStatus.toLowerCase())
    //     && p.description.toLowerCase().includes(pDescription.toLowerCase())
    //     && p.employees.toLowerCase().includes(pEmployees.toLowerCase())
    //     && p.startDate.toLowerCase().includes(pStartDate.toLowerCase());
    // }
    // if (pName && pStatus && pDescription && pEmployees) {
    //   return p.name.toLowerCase().includes(pName.toLowerCase())
    //     && p.status.toLowerCase().includes(pStatus.toLowerCase())
    //     && p.description.toLowerCase().includes(pDescription.toLowerCase())
    //     && p.employees.toLowerCase().includes(pEmployees.toLowerCase());
    // }
    // if (pName && pStatus && pDescription) {
    //   return p.name.toLowerCase().includes(pName.toLowerCase())
    //     && p.status.toLowerCase().includes(pStatus.toLowerCase())
    //     && p.description.toLowerCase().includes(pDescription.toLowerCase());
    // }
    if (pName && pStatus) {
      console.log('1');
      const project = await Project.find({ name: pName, status: pStatus });
      return res.send({
        message: 'Found projects',
        data: project,
        error: false,
      });
    }
    if (pName) {
      console.log('2');
      const project = await Project.find({ name: pName });
      console.log(project);
      return res.send({
        message: 'Found projects',
        data: project,
        error: false,
      });
    }
    // if (pStatus) {
    //   return p.status.toLowerCase().includes(pStatus.toLowerCase());
    // }
    // if (pDescription) {
    //   return p.description.toLowerCase().includes(pDescription.toLowerCase());
    // }
    // if (pEmployees) {
    //   return p.employees.toLowerCase().includes(pEmployees.toLowerCase());
    // }
    // if (pStartDate) {
    //   return p.startDate.toLowerCase().includes(pStartDate.toLowerCase());
    // }
    // if (pEndDate) {
    //   return p.endDate.toLowerCase().includes(pEndDate);
    // }
    // return false;

    // if (filteredProjects.length > 0) {
    //   res.send(filteredProjects);
    // } else {
    //   res.send('Project not found');
    // }
    // if (project.length === 0) {
    //   return res.send({
    //     message: 'Project not found',
    //     data: undefined,
    //     error: true,
    //   });
    // }
  } catch (error) {
    console.log('3');
    return res.send({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
  return false;
};

const getById = async (req, res) => {
  const projectId = req.params.id;
  try {
    if (projectId) {
      const project = await Project.findById(projectId);
      return res.status(200).json({
        message: `Project with ID ${projectId} found`,
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing ID parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Project not found in database',
      data: undefined,
      error: true,
    });
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
