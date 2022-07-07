import Admin from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find(req.query).find({ isDeleted: false });
    if (allAdmins.length > 0) {
      return res.status(200).json({
        message: 'Showing admins.',
        data: allAdmins,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Cannot show the list of admins.',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await Admin.findById(req.params.id).find({ isDeleted: false });
      if (!admin) {
        return res.status(404).json({
          message: `Could not found an admin by the id of ${req.params.id}.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Showing the specified admin by the id of ${req.params.id}.`,
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'No input available.',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Could not found an admin by the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    return res.status(201).json({
      message: 'Admin created successfully.',
      data: newAdmin,
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

const editAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
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
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin updated',
      data: result,
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

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndUpdate(req.params.id, { isDeleted: true });
    if (result) {
      return res.status(200).json({
        message: `Admin by the id of ${req.params.id} deleted successfully.`,
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `No admin with the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
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
