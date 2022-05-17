import Project from '../models/Project';

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
    res.status(201).json({
      message: 'Project was created.',
      data: project,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const filter = async (req, res) => {
  const emptyPath = req.query;
  try {
    if (Object.entries(emptyPath).length === 0) {
      const allProjects = await Project.find({});
      res.status(200).json({
        message: 'List of all projects',
        data: allProjects,
        error: false,
      });
    }
    const filteredProjects = await Project.find(req.query);
    if (filteredProjects.length === 0) {
      res.status(404).json({
        message: 'Error 404. Project not found with those parameters',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Project found',
      data: filteredProjects,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await Project.findById(req.params.id);
      if (!project) {
        res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Project found',
        data: project,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  create,
  filter,
  getById,
};
