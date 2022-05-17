import express from 'express';
import Admin from '../models/Admins';

const router = express.Router();

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.find({});
    if (allAdmins) {
      return res.status(200).json({
        msg: 'Showing the complete list of admins.',
        data: allAdmins,
        error: false,
      });
    } return res.status(404).json({
      msg: 'Cannot show the list of admins.',
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'An error occurred.',
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        msg: 'No input available.',
        data: undefined,
        error: true,
      });
    }
    const { id } = req.params;
    const result = await Admin.findById(id);
    return res.status(200).json({
      msg: `Showing the specified admin by the id of ${req.params.id}.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Could not found an admin by the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const adminSaved = await newAdmin.save();
    return res.status(201).json({
      msg: 'Admin created successfully.',
      data: adminSaved,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      data: undefined,
      error: true,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (result) {
      return res.status(200).json({
        msg: `Admin by the id of ${req.params.id} successfully updated.`,
        data: result,
        error: false,
      });
    } return res.status(404).json({
      msg: `There is no admin with the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error, please try again.',
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      msg: `Admin by the id of ${req.params.id} deleted successfully.`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(404).json({
      msg: `No admin with the id of ${req.params.id}.`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  router,
  getAllAdmins,
  getAdminById,
  createAdmin,
  editAdmin,
  deleteAdmin,
};
