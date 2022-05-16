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
  const emptyPath = req.query;
  try {
    if (Object.entries(emptyPath).length === 0) {
      const allProjects = await Project.find({});
      return res.status(200).json({
        message: 'List of all projects',
        data: allProjects,
        error: false,
      });
    }
    const filteredProjects = await Project.find(req.query);
    if (filteredProjects.length === 0) {
      return res.status(404).json({
        message: 'Error 404. Project not found with those parameters',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: filteredProjects,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Error 404. Not found',
      data: undefined,
      error: true,
    });
  }
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
