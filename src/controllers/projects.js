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

const update = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Id not found',
        data: undefined,
        error: true,
      });
    }
    const updateProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateProject) {
      return res.status(404).json({
        msg: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Project updated',
      data: updateProject,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Project id not found',
        data: undefined,
        error: true,
      });
    }
    const findProject = await Project.findByIdAndDelete(req.params.id);
    if (!findProject) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project deleted',
      data: findProject,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getById = (req, res) => {
  res.status(200).json({
    message: 'Project created',
  });
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

export default {
  create,
  deleteById,
  filter,
  getById,
  update,
};
