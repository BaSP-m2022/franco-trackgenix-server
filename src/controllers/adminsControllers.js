import Admin from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find(req.query);
    if (allAdmins.length > 0) {
      res.status(200).json({
        message: 'Showing the complete list of admins.',
        data: allAdmins,
        error: false,
      });
    } res.status(404).json({
      message: 'Cannot show the list of admins.',
      data: undefined,
      error: true,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error occurred.',
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const result = await Admin.findById(req.params.id);
      res.status(200).json({
        message: `Showing the specified admin by the id of ${req.params.id}.`,
        data: result,
        error: false,
      });
    } else {
      res.status(404).json({
        message: 'No input available.',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Could not found an admin by the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.status(201).json({
      message: 'Admin created successfully.',
      data: newAdmin,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.findByIdAndUpdate(
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
    res.status(400).json({
      message: 'There was an error, please try again.',
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `Admin by the id of ${req.params.id} deleted successfully.`,
      data: result,
      error: false,
    });
  } catch (err) {
    res.status(404).json({
      message: `No admin with the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};