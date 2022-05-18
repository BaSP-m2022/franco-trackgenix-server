import Task from '../models/tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find(req.query);
    if (allTasks.length > 0) {
      res.status(200).json({
        message: 'Tasks',
        data: allTasks,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'Please, put an information about the task',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    if (req.params.id) {
      const taskById = await Task.findById(req.params.id);
      if (!taskById) {
        res.status(404).json({
          message: 'Task not found',
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: 'Tasks',
        data: taskById,
        error: false,
      });
    }
    res.status(400).json({
      message: 'Please, put an ID for a task',
      data: undefined,
      error: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      description: req.body.description,
      workedHours: req.body.workedHours,
    });
    const result = await task.save();
    res.status(201).json({
      message: 'Task created',
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Task deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Task updated',
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  createTask,
  getTasksById,
  deleteTask,
  updateTask,
};
