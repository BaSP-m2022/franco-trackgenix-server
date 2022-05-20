import Project from '../models/Projects';

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

const filter = async (req, res) => {
  try {
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
    return res.status(500).json({
      message: error.message,
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
  deleteById,
  update,
};
